import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactPagination from '../../components/react-pagination';
import Box from '@mui/material/Box';
import { getUsersProfilesAPI } from './api/getUsersProfilesAPI';
import Container from '@mui/material/Container';
import Link from 'next/link';


export default function UsersProfiles() {
  const [data, setData] = React.useState<any>([]);
  const [activePage, setActivePage] = React.useState(1);

  React.useEffect(() => {
    async function getData() {
      try {
        setData(await getUsersProfilesAPI(activePage));
      } catch (error) {
        console.error(error)  
      }
     
    }
    getData();

  }, [activePage])

  if (!data.length) {

    return (
      <Container sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="md">
        <Box textAlign={'center'}>No profile(s) found</Box>
      </Container>
    )
  }

  return (
      <Box sx={{ mt: 8 }}>
        Total Profiles: {data[0]?.totalProfiles} <br /><br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell align="right"> Email Address</TableCell>
                <TableCell align="right"> State&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((profile: any) => (
                <TableRow
                  key={profile?._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="profile">
                    {profile.firstName ?? 'Aliyu'}  {profile.lastName ?? ' Bello'}
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`mailto:${profile?.user?.email}`}>{profile?.user?.email}</Link>
                  </TableCell>
                  <TableCell align="right">{profile?.state ?? 'Kano'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box marginTop={4} display={"flex"} justifyContent={'center'} >
          <ReactPagination
            activePage={activePage}
            itemsCountPerPage={4}
            totalItemsCount={data[0]?.totalProfiles}
            pageRangeDisplayed={5}
            onchangeCallback={(v: any) => setActivePage(v)} />
        </Box>
      </Box>
  );
}