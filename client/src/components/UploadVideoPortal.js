/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useDropzone } from 'react-dropzone';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

function UploadVideoPortal({ setCreating }) {
  const currentUser = useContext(UserContext);
  const [preview, setPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef();
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const submitToAPI = (data) => {
    fetch('/videos', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((res) => navigate(`/videos/${res.id}`))
      .catch((err) => {
        console.log(err);
      });
  };

  const onDrop = useCallback((acceptedFiles) =>
    setPreview(URL.createObjectURL(acceptedFiles[0]))
  );

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'video/*': [],
    },
  });

  const {
    acceptedFiles: acceptedThumbnailFiles,
    getRootProps: getRootThumbnailProps,
    getInputProps: getInputThumbnailProps,
  } = useDropzone({
    onDrop: useCallback((acceptedThumbnailFiles) =>
      setThumbnailPreview(URL.createObjectURL(acceptedThumbnailFiles[0]))
    ),
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('video[title]', e.target.title.value);
    data.append(
      'video[description]',
      convertToHTML(editorState.getCurrentContent())
    );
    data.append('video[source]', acceptedFiles[0]);
    data.append('video[user_id]', currentUser.id);
    data.append('video[thumbnail', acceptedThumbnailFiles[0]);
    setIsLoading(true);
    await submitToAPI(data);
    setIsLoading(false);
    setCreating(false);
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

  const focus = () => {
    editorRef.current.focus();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-[rgba(0,0,0,.7)] z-10 flex justify-center items-center">
      <div className="bg-gray-900 w-fit mx-10 h-5/6 rounded-2xl flex flex-col px-6 py-4 overflow-y-scroll">
        <div className="w-full flex justify-between px-6 py-4 border-b border-main-color">
          <p className="text-xl text-white">Upload videos</p>
          <button
            type="button"
            onClick={() => setCreating(false)}
            className="w-9 h-9 p-2 rounded-full hover:bg-hover"
          >
            <AiOutlineClose className="fill-main-color w-full h-full" />
          </button>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col px-6 py-4 gap-3"
        >
          <div className="flex gap-3 w-fit">
            <div className="flex flex-col gap-3 flex-1">
              <input
                type="text"
                name="title"
                placeholder="Title..."
                className="bg-gray-900 text-white :outline-none border border-icon-color rounded-md h-10 px-3"
                required
              />
              <div className="">
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} required />
                  <p>Drag 1 drop some files here, or click to upload video</p>
                  <em>(Only *.webm and *.mp4 images will be accepted)</em>
                </div>
              </div>
              <div className="">
                <div {...getRootThumbnailProps({ style })}>
                  <input {...getInputThumbnailProps()} required />
                  <p>
                    Drag 1 drop some files here, or click to upload thumbnail
                  </p>
                  <em>(Only *.jpg and *.png images will be accepted)</em>
                </div>
              </div>
              <Editor
                ref={editorRef}
                onClick={focus}
                defaultEditorState={editorState}
                onEditorStateChange={setEditorState}
                editorClassName="editor-class"
                wrapperClassName="wrapper-class"
                toolbarClassName="toolbar-class"
                placeholder="description"
              />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <textarea
                className="bg-gray-900 text-white outline-none border border-icon-color rounded-md h-10 px-3"
                type="text"
                disabled
                value={convertToHTML(editorState.getCurrentContent())}
                placeholder="Description..."
              />
              {preview && (
                <video width="100%" height="100%" controls className="h-fit">
                  <source src={preview} type="video/webm" />
                  <source src={preview} type="video/mp4" />
                </video>
              )}
              {thumbnailPreview && (
                <img src={thumbnailPreview} alt="thumbnail" />
              )}
            </div>
          </div>
          <div className="w-full flex justify-center">
            {isLoading && (
              <div className="w-fit bg-main-color px-4 py-2 rounded-xl hover:bg-yellow-200 cursor-pointer">
                Uploading...
              </div>
            )}
            {!isLoading && (
              <input
                type="submit"
                className="w-fit bg-main-color px-4 py-2 rounded-xl hover:bg-yellow-200 cursor-pointer"
                value="Upload video"
              />
            )}
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('create-video-portal')
  );
}

export default UploadVideoPortal;
