/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserSignedInContext } from '../contexts/UserContext';
import CommentSentence from './CommentSentence';

function Comment({ videoId, commentsCount, setCommentsCount }) {
  const currentUser = useContext(UserContext);
  const [commentInput, setCommentInput] = useState('');
  const [commenting, setCommenting] = useState(false);
  const [comments, setComments] = useState();
  const [commenters, setCommenters] = useState();
  const signedIn = useContext(UserSignedInContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getComments = () => {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/videos/${videoId}/comments`)
        .then((res) => {
          setComments(res.data.data);
          setCommenters(res.data.included);
        })
        .catch((err) => toast(err.message));
    };

    getComments();
  }, [commentsCount]);

  const submitComment = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/videos/${videoId}/comments`, {
        comment: { content: commentInput },
      })
      .then((res) => {
        if (res) {
          setCommentsCount(commentsCount + 1);
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

  const findCommenter = (comment) => {
    const commenter = commenters.find(
      (c) => c.id === comment.relationships.user.data.id && c.type === 'user'
    );
    return commenter;
  };

  return (
    <div>
      <div className="my-6 flex flex-col">
        <p className="text-white mb-4">{commentsCount} Comments</p>
        <div className="flex items-start">
          <div className="min-w-[48px] mr-3">
            <img
              className="w-10 h-10 rounded-full"
              src={signedIn ? currentUser.avatarUrl : '/logo.png'}
              alt="user avatar"
            />
          </div>
          <form className="flex flex-col w-full items-end">
            <textarea
              className="bg-main w-full outline-none border-b border-main-color text-white"
              placeholder="Add a comment..."
              value={commentInput}
              id="comment_input"
              onChange={(e) => setCommentInput(e.target.value)}
              onFocus={() => {
                if (signedIn) {
                  setCommenting(true);
                } else {
                  navigate('/login');
                }
              }}
              required
            />
            {commenting && (
              <div className="mt-4 flex gap-3">
                <button
                  id="submit_comment"
                  type="button"
                  disabled={!commentInput}
                  className={`py-2 px-3 rounded-3xl ${
                    commentInput
                      ? 'bg-main-color text-black hover:bg-yellow-600'
                      : 'bg-sec-color text-text-color'
                  }`}
                  onClick={() => {
                    submitComment();
                    setCommentInput('');
                    setCommenting(false);
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="text-white py-2 px-3 rounded-3xl hover:bg-hover"
                  onClick={() => {
                    setCommenting(false);
                    setCommentInput('');
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-5 mb-48">
        {comments &&
          comments.map((comment) => (
            <CommentSentence
              key={comment.id}
              comment={comment}
              commenter={findCommenter(comment)}
              commentsCount={commentsCount}
              setCommentsCount={setCommentsCount}
            />
          ))}
      </div>
    </div>
  );
}

export default Comment;
