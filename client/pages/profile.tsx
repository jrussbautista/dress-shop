import React from 'react';
import { EditProfile, ChangePassword } from 'components/profile';
import { MobileBottomMenu, Heading, Container } from 'components/shared';

const Profile: React.FC = () => {
  return (
    <>
      <Container>
        <Heading> My Profile </Heading>
        <EditProfile />
        <ChangePassword />
        <MobileBottomMenu />
      </Container>
    </>
  );
};

export default Profile;
