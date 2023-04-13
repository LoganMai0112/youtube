/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { badWords } from 'vn-badwords';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserSignedInContext } from '../contexts/UserContext';

function CommentSentence({
  comment,
  commenter,
  commentsCount,
  setCommentsCount,
}) {
  const [openBox, setOpenBox] = useState(false);
  const currentUser = useContext(UserContext);
  const [editing, setEditing] = useState();
  const [commentInput, setCommentInput] = useState();
  const signedIn = useContext(UserSignedInContext);
  const boxRef = useRef();
  const [commentContent, setCommentContent] = useState(
    comment.attributes.content
  );
  const navigate = useNavigate();
  const deleteComment = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/videos/${comment.attributes.videoId}/comments/${comment.id}`
      )
      .then((res) => {
        if (res) {
          toast(res.data.message);
          setCommentsCount(commentsCount - 1);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast(err.response.data);
          localStorage.clear();
          navigate('/login');
        } else {
          toast(err.message);
        }
      });
  };

  const updateComment = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/videos/${comment.attributes.videoId}/comments/${comment.id}`,
        {
          comment: { content: commentInput },
        }
      )
      .then((res) => {
        if (res) {
          setCommentContent(commentInput);
          toast('Comment updated');
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast(err.response.data);
          localStorage.clear();
          navigate('/login');
        } else {
          toast(err.message);
        }
      });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpenBox(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [boxRef]);

  return (
    <div className="comment flex items-start">
      <div className="min-w-[48px] mr-3">
        <img
          className="w-10 h-10 rounded-full"
          src={commenter.attributes.avatarUrl}
          alt="user avatar"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between">
          <div className="flex gap-2">
            <p className="text-white font-bold">{commenter.attributes.name}</p>
            <span className="text-text-color">
              {moment(comment.attributes.createdAt).fromNow()}
            </span>
          </div>
          {commenter.id == currentUser.id && signedIn && (
            <div
              ref={boxRef}
              className="relative cursor-pointer p-2 active:bg-hover rounded-full"
              onClick={() => setOpenBox(!openBox)}
            >
              <BsThreeDotsVertical className="w-5 h-5 fill-text-color hover:fill-white" />
              {openBox && (
                <div className="absolute top-full right-0 bg-sec py-3 rounded-xl z-10">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(true);
                      setCommentInput(commentContent);
                    }}
                    className="w-full px-3 py-1 hover:bg-hover text-text-color hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteComment()}
                    className="w-full px-3 py-1 hover:bg-hover text-text-color hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {!editing && (
          <p className="text-white font-light">
            {badWords(commentContent, '*')}
          </p>
        )}
        {editing && (
          <form className="flex flex-col w-full items-end">
            <textarea
              className="bg-main w-full outline-none border-b border-main-color text-white"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onFocus={() => setEditing(true)}
              required
            />
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                disabled={!commentInput}
                className={`py-2 px-3 rounded-3xl ${
                  commentInput
                    ? 'bg-main-color text-black hover:bg-yellow-600'
                    : 'bg-sec-color text-text-color'
                }`}
                onClick={() => {
                  updateComment();
                  setCommentInput('');
                  setEditing(false);
                }}
              >
                Save
              </button>
              <button
                type="button"
                className="text-white py-2 px-3 rounded-3xl hover:bg-hover"
                onClick={() => {
                  setEditing(false);
                  setCommentInput('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CommentSentence;
