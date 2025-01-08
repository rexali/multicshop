'use client'

import { getToken } from "../../utils/getToken";
import { Avatar, Box, Button, FormLabel, TextField, FormControl } from "@mui/material";
import Container from "@mui/material/Container";
import Update from "@material-ui/icons/Update";
import * as React from "react";
import { getUserProfileAPI } from "../users/api/getUserProfileAPI";
import { handleProfileUpdate } from "../users/utils/handleProfileUpdate";
import Fallback from "../../components/common/fallback";
import { useAuth } from "../../hooks/use-auth";
import { SERVER_URL } from "../../constants/url";
import CardImage from "../products/components/CardImage";

export default function AdminProfile(props:any) {
  const [adminProfile, setUserProfile] = React.useState<any>({});
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [loading, setLoading] = React.useState('');


  const auth = useAuth();
  const userId = getToken('_id') as string || auth.user?._id as unknown as string;

  const handleSubmit = async (event: any) => {
    setLoading('Sending data..');
    try {
      await handleProfileUpdate(
        event,
        setSuccess,
        setError,
        setLoading,
        userId
      )
    } catch (error) {
      console.warn(error);

    }

  };

  React.useEffect(() => {
    async function getUserProfileData() {
      try {
        const adminProfile = await getUserProfileAPI(userId);
        setUserProfile(adminProfile);
      } catch (error) {
        console.warn(error);
      }

    }

    getUserProfileData();
  }, [userId]);

  if (!Object.keys(adminProfile).length) {

    return (
      <Container sx={{ mt: 8 }} component={"main"} maxWidth="md">
        <Box textAlign={'center'}>No profile found</Box>
      </Container>
    )
  }

  return (
    <React.Suspense fallback={<Fallback />} >

      <Container maxWidth="lg" component={'main'} sx={{ mt: 5 }}>
        <Box>
          {adminProfile?.photo ?
            <CardImage
              src={`${SERVER_URL}/uploads/${adminProfile.photo}`}
              alt={adminProfile?.firstName}
              width={150}
              height={150}
              style={{ borderRadius: 30 }}
            />
            : <Avatar />
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
            defaultValue={adminProfile?.firstName}
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
            defaultValue={adminProfile?.lastName}
            autoFocus
          />

          <TextField
            autoComplete="given-name"
            name="email_address"
            required
            fullWidth
            margin={"normal"}
            id="email_address"
            label="Email Address"
            defaultValue={adminProfile?.user.email}
            autoFocus
          />

          <TextField
            autoComplete="given-name"
            name="street_address"
            required
            fullWidth
            margin={"normal"}
            id="street_address"
            label="Address"
            defaultValue={adminProfile?.streetAddress}
            autoFocus
          />

          <TextField
            autoComplete="given-name"
            name="local_govt"
            required
            fullWidth
            margin={"normal"}
            id="local_govt"
            label="Local Govt"
            defaultValue={adminProfile?.localGovt}
            autoFocus
          />

          <TextField
            autoComplete="given-name"
            name="state"
            required
            fullWidth
            margin={"normal"}
            id="state"
            label="State"
            defaultValue={adminProfile?.state}
            autoFocus
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
    </React.Suspense>

  )
}
