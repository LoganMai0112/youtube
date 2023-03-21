/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import { useDropzone } from 'react-dropzone';
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

function CreateStreamPortal({ setCreateStream }) {
  const currentUser = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef();
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const {
    acceptedFiles: acceptedThumbnailFiles,
    getRootProps: getRootThumbnailProps,
    getInputProps: getInputThumbnailProps,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({
    onDrop: useCallback((acceptedThumbnailFiles) =>
      setThumbnailPreview(URL.createObjectURL(acceptedThumbnailFiles[0]))
    ),
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
  });

  const submitToAPI = async (data) => {
    await fetch('/streams', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      method: 'POST',
      body: data,
    })
      .then(async (res) => res.json())
      .then((res) => {
        navigate(`/streams/${res.id}`);
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('stream[title]', e.target.title.value);
    data.append(
      'stream[description]',
      convertToHTML(editorState.getCurrentContent())
    );
    if (acceptedThumbnailFiles[0]) {
      data.append('stream[thumbnail]', acceptedThumbnailFiles[0]);
    }
    data.append('stream[user_id]', currentUser.id);
    data.append('stream[streaming]', false);
    setIsLoading(true);
    await submitToAPI(data);
    setIsLoading(false);
    setCreateStream(false);
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

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-[rgba(0,0,0,.7)] z-10 flex justify-center items-center">
      <div className="bg-gray-900 w-fit mx-10 h-5/6 rounded-2xl flex flex-col px-6 py-4 overflow-y-scroll">
        <div className="w-full flex justify-between px-6 py-4 border-b border-main-color">
          <p className="text-xl text-white flex items-center">Create stream</p>
          <button
            type="button"
            onClick={() => setCreateStream(false)}
            className="w-9 h-9 p-2 rounded-full hover:bg-hover"
          >
            <AiOutlineClose className="fill-main-color w-full h-full" />
          </button>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col px-6 py-4 gap-3"
        >
          <input
            type="text"
            name="title"
            placeholder="Title..."
            className="bg-gray-900 text-white :outline-none border border-icon-color rounded-md h-10 px-3 flex-1"
            required
          />
          <div className="flex gap-3 mb-3 pb-3 border-b-2 border-main-color">
            <div className="flex-1">
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
            <textarea
              className="flex-1 bg-gray-900 text-white outline-none border border-icon-color rounded-md h-10 px-3"
              type="text"
              disabled
              value={convertToHTML(editorState.getCurrentContent())}
              placeholder="Description..."
            />
          </div>
          <div className="flex gap-3 mb-3 pb-3 border-b-2 border-main-color">
            <div className="flex-1">
              <div {...getRootThumbnailProps({ style })}>
                <input {...getInputThumbnailProps()} />
                <p>Drag 1 drop some files here, or click to upload thumbnail</p>
                <em>(Only *.jpg and *.png images will be accepted)</em>
              </div>
            </div>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="thumbnail"
                className="flex-1 w-1/2"
              />
            )}
          </div>
          <div className="w-full flex justify-center">
            {isLoading && (
              <div className="w-fit bg-main-color px-4 py-2 rounded-xl hover:bg-yellow-200 cursor-pointer">
                Creating...
              </div>
            )}
            {!isLoading && (
              <input
                type="submit"
                className="w-fit bg-main-color px-4 py-2 rounded-xl hover:bg-yellow-200 cursor-pointer"
                value="Create"
              />
            )}
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('create-video-portal')
  );
}

export default CreateStreamPortal;
