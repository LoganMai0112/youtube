import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from '../components/Card';

function Home() {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get('/videos');
      setVideos(response.data.data);
      setChannels(response.data.included);
    };

    try {
      getVideos();
    } catch (err) {
      toast('Something went wrong');
    }
  }, []);

  const findChannel = (channelId) => {
    const channel = channels.find((c) => c.id === channelId);
    return channel.attributes;
  };

  return (
    <div className="w-full h-full px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 overflow-y-scroll">
      {videos.map((video) => (
        <Card
          key={video.id}
          id={video.id}
          title={video.attributes.title}
          thumbnailUrl={video.attributes.thumbnailUrl}
          channel={findChannel(video.relationships.user.data.id)}
          createdAt={video.attributes.createdAt}
        />
      ))}
    </div>
  );
}

export default Home;
