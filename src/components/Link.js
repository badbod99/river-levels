import * as React from 'react';
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
} from 'react-router-dom';
import MaterialLink from '@mui/material/Link';

const Link = ({ ...props }) => (
  <MaterialLink component={RouterLink} {...props} />
);

const NavLink = ({ ...props }) => (
  <MaterialLink component={RouterNavLink} {...props} />
);

export { Link, NavLink };
