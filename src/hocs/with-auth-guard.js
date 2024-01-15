// withAuthGuard.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/auth-context';

export const withAuthGuard = (Component) => (props) => {
  const auth = useAuthContext();

  if (!auth.isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return <Component {...props} />;
};
