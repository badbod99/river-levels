
import Grid from '@mui/material/Grid';
import {
  Outlet,
} from "react-router-dom";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const Layout = ({ children }) => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item xs={5} md={4}>
        <Item>
          { children }
        </Item>
      </Grid>
      <Grid item xs={7} md={8}>
        <Item>
          <Outlet />
        </Item>
      </Grid>
    </Grid>
  </Box>
);

export default Layout;