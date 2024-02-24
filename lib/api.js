import axios from 'axios'
require('dotenv').config()

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

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

export const fetchChannelData = async () => {
  try {
    const channelIdString = channelIds.join(',')
    const searchResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIdString}&key=${API_KEY}`
    )

    const channelsData = searchResponse.data.items

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
