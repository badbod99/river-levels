import { Form, 
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateContact } from "../services/ContactService";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const contact = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <TextField
          label="First name"
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
          variant="filled"
        />
        <TextField
          label="Last name"
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
          variant="filled"
        />
      </p>
      <label>
        <TextField
          label="Twitter"
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
          variant="filled"
        />
      </label>
      <label>
        <TextField
          placeholder="https://example.com/avatar.jpg"
          label="Avatar URL"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
          variant="filled"
        />
      </label>
      <label>
        <TextField
          label="Notes"
          name="notes"
          defaultValue={contact.notes}
          rows={4}
          multiline
          variant="filled"
        />
      </label>
      <p>
        <Button type="submit" variant="contained">Save</Button>
        <Button 
          type="button"
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
        >Cancel</Button>
      </p>
    </Form>
  );
}