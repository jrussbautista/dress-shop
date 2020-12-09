import React, { useState } from 'react';
import { useAuth, useToast } from 'contexts';
import { Button, PageLoader, Input } from 'components/ui';
import { capitalizeFirstLetter } from 'utils/helpers';
import { AuthService } from 'services';
import { MAX_FILE_SIZE } from 'utils/constants';
import styles from './EditProfile.module.css';

interface InitialState {
  name: string;
  email: string;
  image: string | ArrayBuffer | null;
}

const EditProfile: React.FC = () => {
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
      const { user } = await AuthService.updateProfile(currentUser?._id, userInfo);
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.userPictureContainer}>
          <div className={styles.userAvatar}>
            {userInfo.image ? (
              <div style={{ backgroundImage: `url(${userInfo.image})` }} className="image" />
            ) : (
              <>
                {currentUser?.imageURL ? (
                  <div
                    style={{ backgroundImage: `url(${currentUser.imageURL})` }}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.userTextContainer}>
                    <div className={styles.userText}>
                      {capitalizeFirstLetter(currentUser?.name || '')}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.uploadContainer}>
            <input type="file" onChange={handleChange} accept="image/x-png,image/jpeg" />
            <Button type="button" title="Change Photo" text />
          </div>
        </div>
        <div className={styles.userDetails}>
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
    </div>
  );
};

export default EditProfile;
