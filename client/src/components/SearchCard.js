import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';

function SearchCard({ id, title, channel, createdAt, thumbnail, description }) {
  return (
    <Link to={`/videos/${id}`} replace>
      <div className="w-full h-fit flex flex-row cursor-pointer">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="aspect-video rounded-lg w-1/4 min-w-[200px] object-cover"
        />
        <div className="flex flex-row items-start pl-3">
          <div>
            <p className="text-ellipsis overflow-hidden text-white text-xl font-bold max-h-14">
              {title}
            </p>
            <div className="flex items-center text-text-color text-sm">
              <p>view</p>
              <div className="rounded-full w-1 h-1 mx-2 bg-icon-color" />
              <p>{moment(createdAt).fromNow()}</p>
            </div>
            <Link to={`/users/${channel.id}`}>
              <div className="flex gap-2 my-3 items-center">
                <img
                  src={channel.attributes.avatarUrl}
                  alt="avatar"
                  className="rounded-full w-5 h-5 object-cover"
                />
                <p className="text-text-color hover:text-white text-sm">
                  {channel.attributes.name}
                </p>
              </div>
            </Link>
            {description && (
              <p className="text-text-color text-sm">{parse(description)}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchCard;
