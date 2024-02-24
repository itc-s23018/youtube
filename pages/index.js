import React, { useState, useEffect } from 'react'
import { fetchChannelData } from 'lib/api'
import styles from 'styles/styles.module.css'

const Index = () => {
  const [channels, setChannels] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsData = await fetchChannelData()
        setChannels(channelsData)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1 className={styles.title}>チャンネル登録者数ランキング</h1>
      <h2 className={styles.subtitle}>
        Z世代が選んだ人気Youtubeチャンネルのランキングです！
      </h2>
      <h2 className={styles.subtitle}>
        チャンネル名をクリックしたら、チャンネルの詳細が見れます！
      </h2>
      <ol className={styles['numbered-list']}>
        {channels.map((channel, index) => (
          <li key={channel.id} className={styles.listItem}>
            <div className={styles.channelInfo}>
              <div className={styles.channelRank}>{index + 1}位</div>
              <div>
                <img
                  src={channel.snippet.thumbnails.default.url}
                  alt='Channel Thumbnail'
                  className={styles.channelIcon}
                />
              </div>
              <div className={styles.channelDetails}>
                <h2 className={styles.channelName}>
                  <a href={`/${channel.id}`} className={styles.channelLink}>
                    {channel.snippet.title}
                  </a>
                </h2>
                <h2 className={styles.subscriberCount}>
                  登録者数: {channel.statistics.subscriberCount} 人
                </h2>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
export default Index
