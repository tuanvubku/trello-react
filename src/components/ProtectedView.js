import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { getRole } from '@/utils/auth';
import Forbidden from '@/components/forbidden';

const ProtectedView = ({ role, children }) => {
  const userRole = getRole();

  // sanitize input
  if (typeof role === 'undefined') role = [];
  if (typeof role === 'string') role = [role];
  if (typeof userRole === 'undefined') userRole = [];
  if (typeof userRole === 'string') userRole = [userRole];

  // look for overlap role
  const intersection = userRole.filter(x => role.includes(x));
  if (intersection.length === 0) {
    return <Forbidden />;
  }

  return children;
};

export default ProtectedView;
