import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Carousel from './Carousel';

function Playlists() {
  const outletContext = useOutletContext();
  return (
    <div>
      {outletContext.createdPlaylists &&
        outletContext.createdPlaylists.length > 0 && (
          <Carousel
            listName="Created playlists"
            datas={outletContext.createdPlaylists}
          />
        )}
      {outletContext.savedPlaylists &&
        outletContext.savedPlaylists.length > 0 && (
          <Carousel
            listName="Saved playlists"
            datas={outletContext.savedPlaylists}
          />
        )}
    </div>
  );
}

export default Playlists;
