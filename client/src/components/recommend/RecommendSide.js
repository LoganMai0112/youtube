import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideCard from './SideCard';

function RecommendSide() {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const res = await axios.get('/videos');
      setVideos(res.data.data);
      setChannels(res.data.included);
    };

    getVideos();
  }, []);

  const findChannel = (channelId) => {
    const channel = channels.find((c) => c.id === channelId);
    return channel.attributes;
  };

  return (
    <div className="w-[420px] flex flex-col gap-2 pr-4">
      {videos &&
        videos.map((video) => (
          <SideCard
            key={video.id}
            id={video.id}
            thumbnail={video.attributes.thumbnailUrl}
            title={video.attributes.title}
            channel={findChannel(video.relationships.user.data.id)}
            createdAt={video.attributes.createdAt}
            view={video.attributes.viewsCount}
          />
        ))}
    </div>
  );
}

export default RecommendSide;
