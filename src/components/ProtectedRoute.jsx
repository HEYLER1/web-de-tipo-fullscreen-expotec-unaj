// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, session, ...rest }) => {
  return (
    <Route
      {...rest}
      element={session ? <Component /> : <Navigate to="/" replace />}
    />
  );
};

export default ProtectedRoute;
