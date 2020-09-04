import React, { useState } from 'react';
import { useAuth, useToast } from 'store';
import { Button, PageLoader, Input } from 'components/shared';
import { capitalizeFirstLetter } from 'utils/helpers';
import { AuthService } from 'services';
import { parseCookies } from 'nookies';
import { MAX_FILE_SIZE } from 'utils/constants';

interface InitialState {
  name: string;
  email: string;
  image: string | ArrayBuffer | null;
}

export const ProfileEditForm: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const { setToast } = useToast();

  const initialState: InitialState = {
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    image: '',
  };

  const [userInfo, setUserInfo] = useState(initialState);
  const [updating, setUpdating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleUpdateProfile();
  };

  const handleUpdateProfile = async () => {
    if (!currentUser) {
      return;
    }

    try {
      setUpdating(true);
      const { token } = parseCookies({});
      const { user } = await AuthService.updateProfile(token, currentUser?._id, userInfo);
      updateUser(user);
      setToast('success', 'Successfully profile updated');
    } catch (error) {
      setToast('error', error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      if (!selectedFile) return;

      if (selectedFile.size > MAX_FILE_SIZE) {
        setToast('error', 'Photo must be less than 1mb');
        return;
      }

      if (selectedFile.type !== 'image/png' && selectedFile.type !== 'image/jpeg') {
        setToast('error', 'Invalid file type');
        return;
      }

      imageChange(selectedFile);
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const imageChange = (file: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserInfo({ ...userInfo, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const pageLoaderElement = updating && <PageLoader />;

  return (
    <div>
      {pageLoaderElement}
      <form onSubmit={handleSubmit} className="form">
        <div className="user-picture-container">
          <div className="user-avatar">
            {userInfo.image ? (
              <div style={{ backgroundImage: `url(${userInfo.image})` }} className="image" />
            ) : (
              <>
                {currentUser?.imageURL ? (
                  <div
                    style={{ backgroundImage: `url(${currentUser.imageURL})` }}
                    className="image"
                  />
                ) : (
                  <div className="user-text-container">
                    <div className="user-text">
                      {capitalizeFirstLetter(currentUser?.name || '')}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="upload-container">
            <input type="file" onChange={handleChange} accept="image/x-png,image/jpeg" />
            <Button type="button" title="Change Photo" text />
          </div>
        </div>
        <div className="user-details">
          <Input
            name="name"
            onChange={handleChange}
            id="name"
            label="Name"
            value={userInfo.name}
            type="text"
          />
          <Input
            name="email"
            onChange={handleChange}
            id="email"
            label="Email"
            value={userInfo.email}
            type="email"
          />
          <div className="bottom">
            <Button type="submit" title="Save Profile" disabled={updating} />
          </div>
        </div>
      </form>
      <style jsx>{`
        .bottom {
          margin-top: 3rem;
        }

        .user-picture-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .user-avatar {
          width: 10rem;
          height: 10rem;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .user-avatar .image {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center top;
        }

        .user-text-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background-color: var(--color-dark);
        }

        .user-text {
          color: #fff;
          font-size: 2.5rem;
          font-weight: 600;
        }

        .upload-container {
          position: relative;
        }

        .upload-container input {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};
