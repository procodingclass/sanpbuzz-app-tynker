import React from 'react';
import CameraComponent from '../components/CameraComponent';

export default function UpdateProfileImageScreen({ route, navigation }) {
  return (
    <CameraComponent
      navigation={navigation}
      navigateToScreen={'Profile'}
      buttonName={'Set to Profile'}
      userDetails={route.params.user}
    />
  );
}
