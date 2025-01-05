'use client'
import { Box, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import MessageList from "../messages/message-list";
import { useUserMessages } from "./hooks/useUserMessages";
import { AuthContext } from "../../context/AuthContext";
import * as React from "react";
import ReactPagination from "../../components/react-pagination";
import { getToken } from "../../utils/getToken";
import { useAuth } from "../../hooks/use-auth";

export default function UserMessages() {
  const [activePage, setActivePage] = React.useState(1);
  const { state, dispatch } = React.useContext(AuthContext);
  
  const auth = useAuth();
  const userId = auth.user?._id as unknown as string || getToken('_id') as string;

  const handlePageChange = (pageNumber: any) => {
    setActivePage(pageNumber)
  }

  const messages = useUserMessages(userId, dispatch, activePage) as any;

  if (!messages.length) {

    return (
      <Container  sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="lg">
        <Box textAlign={'center'}>No message(s) found</Box>
      </Container>
    )
  } 


  return (
    <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }}>
      <Grid container columnSpacing={1}>
        <MessageList messages={messages} role={state.user?.role} refreshMessages={()=>{}}/>
      </Grid>
      <Box marginTop={4} display={"flex"} justifyContent={'center'}>
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={4}
          totalItemsCount={messages[0]?.totalMessages}
          pageRangeDisplayed={5}
          onchangeCallback={handlePageChange} />
      </Box>
    </Container>
  )
}
