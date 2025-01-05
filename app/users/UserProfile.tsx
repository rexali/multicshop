'use client'

import { getToken } from "../../utils/getToken";
import { Avatar, Box, Button, FormLabel, TextField, FormControl } from "@mui/material";
import Container from "@mui/material/Container";
import Update from "@material-ui/icons/Update";
import * as React from "react";
import { handleProfileUpdate } from "./utils/handleProfileUpdate";
import { SERVER_URL } from "../../constants/url";
import { useAuth } from "../../hooks/use-auth";
import CardImage from "../products/components/CardImage";


export default function UserProfile(props: any) {
  const [user, setUser] = React.useState<any>({});
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [loading, setLoading] = React.useState('');

  const auth = useAuth();
  const userId = auth.user?._id as unknown as string || getToken('_id') as string;

  const handleSubmit = async (event: any) => {
    setLoading('Sending data..');
    try {
      await handleProfileUpdate(
        event,
        setSuccess,
        setError,
        setLoading,
        userId
      );
    } catch (error) {
      console.warn(error);
    }


  };

  React.useEffect(() => {
    setUser((c: any) => ({...c, ...props.user }));
  }, [props.user]);

  if (!Object.keys(user).length) {

    return (
      <Container sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="md">
        <Box textAlign={'center'}>No user profile found</Box>
      </Container>
    )
  }


  return (
    <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }}>
      <Box>
        {user.photo ?
          <CardImage
            src={`${SERVER_URL}/uploads/${user.photo}`}
            alt={user?.firstName}
            width={150}
            height={150}
            style={{ borderRadius: 30 }}

          /> : <Avatar />
        }
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <FormControl>
          <FormLabel>
            Your photo
          </FormLabel>
          <TextField
            autoComplete="given-name"
            name="photo"
            required
            fullWidth
            margin={"normal"}
            type='file'
            id="photo"
          />
        </FormControl>

        <TextField
          autoComplete="given-name"
          name="first_name"
          required
          fullWidth
          margin={"normal"}
          id="first_name"
          label="First Name"
          defaultValue={user.firstName}
          autoFocus
        />

        <TextField
          autoComplete="given-name"
          name="last_name"
          required
          fullWidth
          margin={"normal"}
          id="last_name"
          label="Last Name"
          defaultValue={user.lastName}
        />

        <TextField
          autoComplete="given-name"
          name="email_address"
          required
          fullWidth
          margin={"normal"}
          id="email_address"
          label="Email Address"
          defaultValue={user.user?.email}
        />

        <TextField
          autoComplete="given-name"
          name="street_address"
          required
          fullWidth
          margin={"normal"}
          id="street_address"
          label="Address"
          defaultValue={user.streetAddress}
        />

        <TextField
          autoComplete="given-name"
          name="local_govt"
          required
          fullWidth
          margin={"normal"}
          id="local_govt"
          label="Local Govt"
          defaultValue={user.localGovt}
        />

        <TextField
          autoComplete="given-name"
          name="state"
          required
          fullWidth
          margin={"normal"}
          id="state"
          label="State"
          defaultValue={user.state}
        />

        {success && <Box textAlign={"center"} sx={{ color: "green" }}>{success.toUpperCase()}</Box>}
        {error && <Box textAlign={"center"} sx={{ color: "red" }}>{error.toUpperCase()}</Box>}
        {loading && <Box textAlign={"center"} sx={{ color: "green" }}>{loading.toUpperCase()}</Box>}

        <Button
          type="submit"
          size="large"
          fullWidth
          variant="contained"
          color='success'
          sx={{ mt: 3, mb: 2 }}
          startIcon={<Update />}
        >
          Update
        </Button>

      </Box>
    </Container>
  )
}
