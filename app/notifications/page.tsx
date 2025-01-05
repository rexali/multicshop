'use client'

import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NotificationList from './notification-list';
import Box from '@mui/material/Box';
import ProtectedRoute from '../../components/protected-route';
import { useNotifications } from './hooks/use-notifications';
import ReactPagination from '../../components/react-pagination';
import { AppContext } from '../../context/AppContext';
import { getNotifications } from '../../store/actions/app-actions';
import { getNotificationsAPI } from './api/getNotificationsAPI';

export default function NotificationsPage(props: any) {
    const [activePage, setActivePage] = React.useState(1);
    const { dispatch, state } = React.useContext(AppContext);
    // const notifications = useNotifications(dispatch, activePage);

    const [notificationData, setNotificationData] = React.useState<any>([]);

    const getNotificationData = React.useCallback(async () => {
        let notifications = await getNotificationsAPI(activePage);
        dispatch(getNotifications(notifications));
        setNotificationData(notifications)
    }, [activePage, dispatch])


    const handlePageChange = (pageNumber: any) => {
        setActivePage(pageNumber)
    }

    React.useEffect(() => {
        getNotificationData();
    });

    if (!notificationData.length) {

        return (
            <Container sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="md">
                <Box textAlign={'center'}>No notification(s) found</Box>
            </Container>
        )
    }

    return (
        <ProtectedRoute>
            <Container sx={{ mt: 8 }} component={"main"} maxWidth="md">
                <Box>Notifications</Box>
                {props.role === 'admin' && <Box>Total Notifications: {notificationData[0]?.totalNotifications}</Box>}
                <Grid container columnSpacing={1} marginTop={5} display={"flex"} justifyContent={'center'}>
                    <NotificationList
                        notifications={notificationData}
                        role={props.role}
                        refreshNotifications={getNotificationData}
                    />
                </Grid>
            </Container>
            <Box marginTop={4} display={"flex"} justifyContent={'center'}>
                <ReactPagination
                    activePage={activePage}
                    itemsCountPerPage={4}
                    totalItemsCount={notificationData[0].totalNotifications}
                    pageRangeDisplayed={5}
                    onchangeCallback={(v: any) => handlePageChange(v)} />
            </Box>
        </ProtectedRoute>
    );
}