import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiFillLike } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { UserSignedInContext } from '../contexts/UserContext';

function LikeVideoButton({
  liked,
  likeCount,
  videoId,
  setLiked,
  setLikeCount,
}) {
  const navigate = useNavigate();
  const signedIn = useContext(UserSignedInContext);
  const like = async () => {
    try {
      const res = await axios.post(`/videos/${videoId}/like`);
      if (res) {
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (err) {
      if (err.response.status === 401) {
        toast(err.response.data);
        localStorage.clear();
        navigate('/login');
      } else {
        toast(err.message);
      }
    }
  };

  const unLike = async () => {
    try {
      const res = await axios.delete(`/videos/${videoId}/like`);
      if (res) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    } catch (err) {
      if (err.response.status === 401) {
        toast(err.response.data);
        localStorage.clear();
        navigate('/login');
      } else {
        toast(err.message);
      }
    }
  };
  return (
    <div>
      {!liked && (
        <button
          type="button"
          onClick={() => {
            if (signedIn) {
              like();
            } else {
              navigate('/login');
            }
          }}
          className="text-white bg-main-color/50 px-4 py-2 rounded-3xl hover:bg-main-color hover:text-black flex gap-2 items-center"
        >
          <AiFillLike className="w-6 h-6" />
          {likeCount}
        </button>
      )}
      {liked && (
        <button
          type="button"
          onClick={() => {
            if (signedIn) {
              unLike();
            } else {
              navigate('/login');
            }
          }}
          className="text-white bg-main-color/50 px-4 py-2 rounded-3xl hover:bg-main-color hover:text-black flex gap-2 items-center"
        >
          <AiFillLike className="w-6 h-6 fill-purple-800" />
          {likeCount}
        </button>
      )}
    </div>
  );
}

export default LikeVideoButton;
