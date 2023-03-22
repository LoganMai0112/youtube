/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
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

function Setting() {
  const currentUser = useContext(UserContext);
  const [user, setUser] = useState({});
  const [avatarPreview, setAvatarPreview] = useState();
  const [coverPreview, setCoverPreview] = useState();

  useEffect(() => {
    const getUser = () => {
      axios
        .get(`/users/${currentUser.id}/edit`)
        .then((res) => {
          setUser(res.data.data.attributes);
          setAvatarPreview(res.data.data.attributes.avatarUrl);
          setCoverPreview(res.data.data.attributes.coverUrl);
        })
        .catch((err) => toast(err.message));
    };

    getUser();
  }, []);

  const {
    acceptedFiles: acceptedAvatarFiles,
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({
    onDrop: useCallback((acceptedAvatarFiles) =>
      setAvatarPreview(URL.createObjectURL(acceptedAvatarFiles[0]))
    ),
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
  });

  const {
    acceptedFiles: acceptedCoverFiles,
    getRootProps: getRootCoverProps,
    getInputProps: getInputCoverProps,
  } = useDropzone({
    onDrop: useCallback((acceptedCoverFiles) =>
      setCoverPreview(URL.createObjectURL(acceptedCoverFiles[0]))
    ),
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const submitToAPI = async (data) => {
    await fetch(`/users/${currentUser.id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      method: 'PUT',
      body: data,
    })
      .then(async (res) => res.json())
      .then(() => {
        toast('Successfully Updated');
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('user[name]', event.target.name.value);
    if (acceptedAvatarFiles[0]) {
      data.append('user[avatar]', acceptedAvatarFiles[0]);
    }
    if (acceptedCoverFiles[0]) {
      data.append('user[cover]', acceptedCoverFiles[0]);
    }
    await submitToAPI(data);
  };

  return (
    <div className="p-5">
      <form className="flex flex-col gap-10" onSubmit={(e) => handelSubmit(e)}>
        <input
          type="text"
          name="name"
          value={user.name}
          className="bg-gray-900 text-white :outline-none border border-icon-color rounded-md h-10 px-3 flex-1"
          onChange={(e) => setUser({ user: { ...user, name: e.target.value } })}
        />
        <div className="flex gap-3 mb-3 pb-3 border-b-2 border-main-color">
          <div className="flex-1">
            <div {...getRootAvatarProps({ style })}>
              <input {...getInputAvatarProps()} />
              <p>Drag 1 drop some files here, or click to upload avatar</p>
              <em>(Only *.jpg and *.png images will be accepted)</em>
            </div>
          </div>
          {avatarPreview && (
            <img src={avatarPreview} alt="thumbnail" className="flex-1 w-1/2" />
          )}
        </div>
        <div className="flex gap-3 mb-3 pb-3 border-b-2 border-main-color">
          <div className="flex-1">
            <div {...getRootCoverProps({ style })}>
              <input {...getInputCoverProps()} />
              <p>Drag 1 drop some files here, or click to upload cover</p>
              <em>(Only *.jpg and *.png images will be accepted)</em>
            </div>
          </div>
          {coverPreview && (
            <img src={coverPreview} alt="cover" className="flex-1 w-1/2" />
          )}
        </div>
        <input
          type="submit"
          value="Save"
          className="px-4 py-2 bg-main-color rounded-xl cursor-pointer hover:bg-yellow-600"
        />
      </form>
    </div>
  );
}

export default Setting;
