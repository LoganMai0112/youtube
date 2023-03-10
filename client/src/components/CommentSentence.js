import React from 'react';
import moment from 'moment';

function CommentSentence({ comment, commenter }) {
  return (
    <div className="flex items-start">
      <div className="min-w-[48px] mr-3">
        <img
          className="w-10 h-10 rounded-full"
          src={commenter.attributes.avatarUrl}
          alt="user avatar"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <p className="text-white font-bold">{commenter.attributes.name}</p>
          <span className="text-text-color">
            {moment(comment.attributes.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-white font-light">{comment.attributes.content}</p>
      </div>
    </div>
  );
}

export default CommentSentence;
