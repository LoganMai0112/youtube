import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Card from '../Card';

function Videos() {
  const outletContext = useOutletContext();

  return (
    <div className="w-full h-fit px-5 my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5 overflow-y-scroll">
      {outletContext.videos &&
        outletContext.videos.map((video) => (
          <Card
            key={video.id}
            id={video.id}
            title={video.attributes.title}
            thumbnailUrl={video.attributes.thumbnailUrl}
            createdAt={video.attributes.createdAt}
          />
        ))}
    </div>
  );
}

export default Videos;
