import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

function Home() {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get('/videos');
      setVideos(response.data.data);
      setChannels(response.data.included);
      console.log(response.data);
    };

    try {
      getVideos();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const findChannel = (channelId) => {
    const channel = channels.find((c) => c.id === channelId);
    console.log(channel);
    return channel.attributes;
  };

  return (
    <div className="w-full h-full px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 overflow-y-scroll">
      {videos.map((video) => (
        <Card
          id={video.id}
          title={video.attributes.title}
          channel={findChannel(video.relationships.user.data.id)}
          createdAt={video.attributes.createdAt}
        />
      ))}
    </div>
  );
}

export default Home;
