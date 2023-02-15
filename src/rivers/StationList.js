import { NavLinkBehavior } from '../components/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import {
  useLoaderData,
  Form,
  useNavigation,
} from "react-router-dom";
import { getStations } from "../services/EAService";
import { useEffect, useState } from "react";
import Layout from '../Layout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const stations = await getStations(q);
  return { stations, q };
}

export default function StationList() {
  const { stations, q } = useLoaderData();
  const navigation = useNavigation();
  const [search, setSearch] = useState(q);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );
  const loading = navigation.state === "loading";
  const existingSearch = search ?? '';

  return (
    <Layout>
      <div id="sidebar">
        <Typography variant="h3" component="h1" gutterBottom>
          Station List
        </Typography>
        <div>
          <Form id="search-form" role="search">
            <TextField
              id="q"
              label="Search stations"
              placeholder="Search"
              type="search"
              variant="filled"
              name="q"
              margin="normal"
              fullWidth
              defaultValue={q}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
            {(searching || loading)
              ? (<LinearProgress sx={{ marginBottom: 2 }} />)
              : null }
          </Form>
        </div>
        <nav>
          {stations?.length ? (
            <List>
              {stations.map((station) => (
                <ListItem key={station.RLOIid}>
                  <ListItemButton component={NavLinkBehavior} to={`station/${station.stationReference}?q=${existingSearch}`}>
                    {station.riverName}
                    {' - '}
                    {station.label}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <p>
              <i>No stations</i>
            </p>
          )}
        </nav>
      </div>
    </Layout>
  );
}