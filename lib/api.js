import axios from 'axios'
require('dotenv').config()

const CHANNEL_KEY = process.env.NEXT_PUBLIC_CHANNEL_KEY
const VIDEO_KEY = process.env.NEXT_PUBLIC_VIDEO_KEY

const channelIds = [
  'UCpbu18sbRQlFSo1PtixzktQ', // 中町兄弟
  'UCJFWdjpYDIPe8Pdhmusnlgg', // 中町綾
  'UC8_wmm5DX9mb4jrLiw8ZYzw', // スカイピース
  'UCcoPAuYU81k_5AxDedPnLvw', // むくえなちっく
  'UCtFb9IIr1gX_J--jR-I6ZRg', // ちょんまげ小僧
  'UCIOk-Q5kyDtSRaTIW7hIsng', // 平成フランミンゴ
  'UCkxRZyl_RrvK2kV_pdBI7vQ', // みなみチャンネル
  'UC9Wl5AzCQzp2esQ7uVoQz0g', // とうあ
  'UCBKqbSl9bK_ln9zZ-C5rP0Q', // ばんばんざい
  'UCRxPrFmRHsXGWfAyE6oqrPQ' // コムドット
] // ランキングに入れたいチャンネルIDを指定

const channelIdString = channelIds.join(',')

const GetChannelData = async () => {
  try {
    const searchChannel = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIdString}&key=${CHANNEL_KEY}`
    )

    const channelsData = searchChannel.data.items

    // 登録者数でチャンネルをソート
    channelsData.sort(
      (a, b) => b.statistics.subscriberCount - a.statistics.subscriberCount
    )
    return channelsData
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const GetNewVideo = async channelId => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=1&key=${VIDEO_KEY}`
  )
  const data = await response.json()
  if (data.items && data.items.length > 0) {
    return data.items[0].id.videoId
  } else {
    return null
  }
}
export { GetChannelData, GetNewVideo }
