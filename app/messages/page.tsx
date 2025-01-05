'use client'

import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MessageList from './message-list';
import Box from '@mui/material/Box';
import ProtectedRoute from '../../components/protected-route';
import ReactPagination from '../../components/react-pagination';
import { AppContext } from '../../context/AppContext';
import { getMessages } from '../../store/actions/app-actions';
import { getMessagesAPI } from './api/getMessagesAPI';

export default function MessagesPage(props: any) {
    const [activePage, setActivePage] = React.useState(1);
    const { state, dispatch } = React.useContext(AppContext);
    
    const [messageData, setMessageData] = React.useState<any>([]);

    const getMessagesData = React.useCallback(async () => {
        let messages = await getMessagesAPI(activePage);
        dispatch(getMessages(messages));
        setMessageData(messages)
    }, [activePage, dispatch])

    const handlePageChange = (pageNumber: any) => {
        setActivePage(pageNumber)
    }

    React.useEffect(()=>{
        getMessagesData();
    })

    if (!messageData?.length) {

        return (
            <Container sx={{ mt: 8, minHeight: 520, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="md">
                <Box textAlign={'center'}>No message(s) found</Box>
            </Container>
        )
    }


    return (
        <ProtectedRoute>
            <Container sx={{ mt: 8 }} component={"main"} maxWidth="md">
                <Box>Messages</Box>
                {props.role === 'admin' && <Box>Total Messages: {messageData[0]?.totalMessages}</Box>}
                <Grid container columnSpacing={1} marginTop={5} display={"flex"} justifyContent={'center'}>
                    <MessageList
                        messages={messageData}
                        role={props.role}
                        refreshMessages={getMessagesData}
                    />
                </Grid>
            </Container>
            <Box marginTop={4} display={"flex"} justifyContent={'center'}>
                <ReactPagination
                    activePage={activePage}
                    itemsCountPerPage={4}
                    totalItemsCount={messageData[0]?.totalMessages}
                    pageRangeDisplayed={5}
                    onchangeCallback={(v: any) => handlePageChange(v)} />
            </Box>
        </ProtectedRoute>
    );
}