import '../App.css';
import Button from '@mui/material/Button';
import { Link, NavLink } from '../components/Link';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );
  const loading = navigation.state === "loading";
  const isFirstSearch = q == null;

  return (
    <Container maxWidth="sm">
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <TextField
              id="q"
              label="Search contacts"
              placeholder="Search"
              type="search"
              required
              variant="filled"
              name="q"
              margin="normal"
              fullWidth
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            {(searching || loading)
              ? (<LinearProgress sx={{ marginBottom: 2 }} />)
              : null }
          </Form>
          <Form method="post">
            <Button type="submit" variant="contained">New</Button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
       <Outlet />
      </div>
    </Container>
  );
}