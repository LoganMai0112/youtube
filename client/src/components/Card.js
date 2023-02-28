import React from 'react';

function Card() {
  return (
    <div className="w-full h-fit flex flex-col">
      <img
        src="logo.png"
        alt="thumbnail"
        className="aspect-video rounded-3xl"
      />
      <div className="flex flex-row items-start pt-3">
        <div className="p-1 rounded-full border-dashed border-2 border-main-color mr-3">
          <img src="logo.png" alt="avatar" className="w-9 h-9 rounded-full" />
        </div>
        <div>
          <p className="text-white text-xl font-bold">title</p>
          <p className="text-text-color text-sm">channel name</p>
          <div className="flex items-center text-text-color text-sm">
            <p>view</p>
            <div className="rounded-full w-1 h-1 mx-2 bg-icon-color" />
            <p>time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
