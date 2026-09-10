import React from 'react';
import { Navigate } from 'react-router-dom';

export function Orders() {
  return <Navigate to="/account?tab=orders" replace />;
}
