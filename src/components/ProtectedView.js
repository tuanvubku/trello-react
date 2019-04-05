import React from 'react';

import { getRole } from '@/utils/auth';
import Forbidden from '@/components/forbidden';

const ProtectedView = ({ allowedRole, children }) => {
  let userRole = getRole();

  // sanitize input
  if (typeof allowedRole === 'undefined') allowedRole = [];
  if (typeof allowedRole === 'string') allowedRole = [allowedRole];
  if (typeof userRole === 'undefined') userRole = [];
  if (typeof userRole === 'string') userRole = [userRole];

  // look for overlap role
  const intersection = userRole.filter(x => allowedRole.includes(x));
  if (intersection.length === 0) {
    return <Forbidden />;
  }

  return children;
};

export default ProtectedView;
