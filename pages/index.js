import React, { useState, useEffect } from 'react'
import { fetchChannelData, getNewVideo } from 'lib/api'
import Accordion from 'components/accordion'
import styles from 'styles/styles.module.css'

const Index = () => {
  const [channels, setChannels] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsData = await fetchChannelData()
        const channelsWithLatestVideo = await Promise.all(
          channelsData.map(async channel => {
            const latestVideoId = await getNewVideo(channel.id)
            return {
              ...channel,
              latestVideoId
            }
          })
        )
        setChannels(channelsWithLatestVideo)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [])

  const formatSubscriberCount = count => {
    if (count < 10000) {
      return count.toString()
    } else {
      const num = Math.floor(count / 10000)
      return num.toString() + '万人'
    }
  }

  const formatViewCount = count => {
    if (count < 10000) {
      return count.toString()
    } else if (count < 100000000) {
      const num = Math.floor(count / 10000)
      return num.toString() + '万'
    } else {
      const num = Math.floor(count / 100000000) // 億
      const remainder = Math.floor((count % 100000000) / 10000) // 万
      if (remainder === 0) {
        return num.toString() + '億回'
      } else {
        return num.toString() + '億' + remainder.toString() + '万回'
      }
    }
  }

  return (
    <div>
      <h1 className={styles.title}>チャンネル登録者数ランキング</h1>
      <h2 className={styles.subtitle}>
        Z世代が選んだ人気Youtubeチャンネルのランキングです！
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
                <h2 className={styles.channelName}>{channel.snippet.title}</h2>
                <Accordion heading='チャンネルの詳細情報を見る'>
                  <a
                    href={`https://www.youtube.com/${channel.snippet.customUrl}`}
                    className={styles.channelLink}
                  >
                    {channel.snippet.title}のYoutubeチャンネルページをみる
                  </a>
                  <h2 className={styles.subscriberCount}>
                    チャンネル登録者:{' '}
                    {formatSubscriberCount(channel.statistics.subscriberCount)}
                  </h2>
                  <h2 className={styles.subscriberCount}>
                    総再生回数: {formatViewCount(channel.statistics.viewCount)}
                  </h2>
                  <h2>最新動画</h2>
                  {channel.latestVideoId && (
                    <iframe
                      width='560'
                      height='315'
                      src={`https://www.youtube.com/embed/${channel.latestVideoId}`}
                      frameBorder='0'
                      allowFullScreen
                    />
                  )}
                </Accordion>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Index
