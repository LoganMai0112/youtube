/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { useDropzone } from 'react-dropzone';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/UserContext';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#111827',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function EditVideo() {
  const params = useParams();
  const [title, setTitle] = useState();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef();
  const [videoUrl, setVideoUrl] = useState();
  const navigate = useNavigate();
  const [checkValue, setCheckValue] = useState();
  const currentUser = useContext(UserContext);
  const [userOfVideo, setUserOfVideo] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const getVideo = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/videos/${params.videoId}`
      );
      setUserOfVideo(
        currentUser.id == res.data.data.relationships.user.data.id
      );
      setThumbnailPreview(res.data.data.attributes.thumbnailUrl);
      setVideoUrl(res.data.data.attributes.videoUrl);
      setTitle(res.data.data.attributes.title);
      setCheckValue(res.data.data.attributes.status);
      const blockFromHTMl = convertFromHTML(
        res.data.data.attributes.description
      );
      const state = ContentState.createFromBlockArray(
        blockFromHTMl.contentBlocks,
        blockFromHTMl.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    };
    getVideo();
  }, []);

  const {
    acceptedFiles: acceptedThumbnailFiles,
    getRootProps: getRootThumbnailProps,
    getInputProps: getInputThumbnailProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: useCallback((acceptedThumbnailFiles) =>
      setThumbnailPreview(URL.createObjectURL(acceptedThumbnailFiles[0]))
    ),
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
  });

  const submitToAPI = (data) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/videos/${params.videoId}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      method: 'PUT',
      body: data,
    })
      .then((res) => res.json())
      .then(() => navigate(`/videos/${params.videoId}`))
      .catch((err) => {
        toast(err.message);
      });
  };

  const handleDelete = async () => {
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/videos/${params.videoId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(() => navigate('/'))
      .catch((err) => err);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('video[title]', title);
    data.append(
      'video[description]',
      convertToHTML(editorState.getCurrentContent())
    );
    if (acceptedThumbnailFiles[0]) {
      data.append('video[thumbnail]', acceptedThumbnailFiles[0]);
    }
    data.append('video[status]', checkValue);
    setIsLoading(true);
    await submitToAPI(data);
    setIsLoading(false);
  };

  const focus = () => {
    editorRef.current.focus();
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <>
      {userOfVideo && (
        <div>
          <div className="w-full flex justify-between px-6 py-4">
            <p className="text-xl text-white">Video details</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleSubmit()}
                className="p-2 rounded-full bg-main-color text-black hover:bg-yellow-500"
              >
                {!isLoading && <span>Save changes</span>}
                {isLoading && <span>Loading</span>}
              </button>
              <button
                type="button"
                onClick={() => handleDelete()}
                className="p-2 rounded-full hover:bg-red-900 text-white bg-hover"
              >
                Delete
              </button>
            </div>
          </div>
          <form className="flex flex-col px-6 py-4 gap-3">
            <div className="flex gap-3 w-fit">
              <div className="flex flex-col gap-3 flex-1">
                <input
                  type="text"
                  name="title"
                  placeholder="Title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-900 text-white :outline-none border border-icon-color rounded-md h-10 px-3"
                  required
                />
                <div className="">
                  <div {...getRootThumbnailProps({ style })}>
                    <input {...getInputThumbnailProps()} />
                    <p>
                      Drag 1 drop some files here, or click to upload thumbnail
                    </p>
                    <em>(Only *.jpg and *.png images will be accepted)</em>
                  </div>
                </div>
                <Editor
                  ref={editorRef}
                  onClick={focus}
                  EditorState={editorState}
                  onEditorStateChange={setEditorState}
                  editorClassName="editor-class"
                  wrapperClassName="wrapper-class"
                  toolbarClassName="toolbar-class"
                  placeholder="description"
                  value={editorState}
                />
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {videoUrl && (
                  <video width="100%" height="100%" controls className="h-fit">
                    <source src={videoUrl} type="video/webm" />
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                )}
                <textarea
                  className="bg-gray-900 text-white outline-none border border-icon-color rounded-md h-10 px-3"
                  type="text"
                  disabled
                  value={convertToHTML(editorState.getCurrentContent())}
                  placeholder="Description..."
                />
                {thumbnailPreview && (
                  <img src={thumbnailPreview} alt="thumbnail" />
                )}
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-white">Save or publish?</h2>
              <label>
                <input
                  type="checkbox"
                  checked={checkValue === 'privated'}
                  onClick={() => setCheckValue('privated')}
                />
                <span className="text-white ml-3">Private</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={checkValue === 'published'}
                  onClick={() => setCheckValue('published')}
                />
                <span className="text-white ml-3">Public</span>
              </label>
            </div>
          </form>
        </div>
      )}
      {!userOfVideo && <p>Some thing went wrong</p>}
    </>
  );
}

export default EditVideo;
