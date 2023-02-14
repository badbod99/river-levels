import '../App.css';
import { NavLink } from '../components/Link';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {
  Outlet,
  useLoaderData,
  Form,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getStations } from "../services/EAService";
import { useEffect } from "react";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const stations = await getStations(q);
  return { stations, q };
}

export default function StationList() {
  const { stations, q } = useLoaderData();
  const navigation = useNavigation();
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );
  const loading = navigation.state === "loading";

  return (
    <Container maxWidth="sm">
      <div id="detail">
       <Outlet />
      </div>
      <div id="sidebar">
        <h1>Station List</h1>
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
            />
            {(searching || loading)
              ? (<LinearProgress sx={{ marginBottom: 2 }} />)
              : null }
          </Form>
        </div>
        <nav>
          {stations?.length ? (
            <ul>
              {stations.map((station) => (
                <li key={station.RLOIid}>
                  <NavLink
                    to={`station/${station.stationReference}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {station.riverName}
                    {' - '}
                    {station.label}
                    {' - '}
                    {station.stationReference}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No stations</i>
            </p>
          )}
        </nav>
      </div>      
    </Container>
  );
}