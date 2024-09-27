import React from 'react';
import { Link } from 'react-router-dom';

const PermissionDenied = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ color: '#FF0000' }}>Permission Denied</h1>
      <p>Sorry, you do not have permission to access this page.</p>
      <p>
        <Link to="/">Go back Home </Link>
      </p>
    </div>
  );
};

export default PermissionDenied;
