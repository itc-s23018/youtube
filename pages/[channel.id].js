import React, { useState, useEffect } from 'react'                                                                                                                         
  import { fetchChannelData } from 'lib/api'
  import styles from 'styles/styles.module.css'
  
  const Channel= () => {
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
+ 
    return (
+    <h2 className={styles.channelName}>
+    {channel.snippet.title}
+    </h2>
    )
  }
  export default Channel            
