import * as React from 'react';
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
} from 'react-router-dom';
import MaterialLink from '@mui/material/Link';
import MaterialButton from '@mui/material/Button';

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} role={undefined} />
));

const NavLinkBehavior = React.forwardRef((props, ref) => (
  <RouterNavLink ref={ref} {...props} role={undefined} />
));

const Link = (props) => (
  <MaterialLink component={RouterLink} {...props} />
);

const NavLink = (props) => (
  <MaterialLink component={RouterNavLink} {...props} />
);

const Button = (props) => (
  <MaterialButton component={LinkBehavior} {...props} />
);

export { Link, NavLink, Button, LinkBehavior, NavLinkBehavior };
