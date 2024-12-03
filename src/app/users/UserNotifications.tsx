'use client'

import { Box, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import * as React from "react";
import ReactPagination from "@/components/react-pagination";
import NotificationList from "../notifications/notification-list";
import Fallback from "@/components/common/fallback";
import { getUsersNotificationsAPI } from "../admins/api/getUsersNotifications";

export default function UsersNotifications() {
    const [data, setData] = React.useState<any>([]);
    const [activePage, setActivePage] = React.useState(1);
    const handlePageChange = (pageNumber: any) => {
        setActivePage(pageNumber)
    }

    React.useEffect(() => {
        async function getData() {
            setData(await getUsersNotificationsAPI(activePage));
        }
        getData();

    }, [activePage])

    if (!data.length) {

        return (
            <Container sx={{ mt: 8 }} component={"main"} maxWidth="md">
                <Box textAlign={'center'}>No notification(s) found</Box>
            </Container>
        )
    }


    return (
    <React.Suspense fallback={<Fallback />} >
        <Container maxWidth="lg" component={'main'} sx={{ mt: 10 }}>
            <Box>Total Notifications: {data[0]?.totalNotifications}</Box>
            <Grid container columnSpacing={1}>
                <NotificationList notifications={data} role={'admin'} />
            </Grid>
            <Box marginTop={4} display={"flex"} justifyContent={'center'}>
                <ReactPagination
                    activePage={activePage}
                    itemsCountPerPage={4}
                    totalItemsCount={data[0]?.totalNotifications}
                    pageRangeDisplayed={5}
                    onchangeCallback={(v:any)=>handlePageChange(v)} />
            </Box>
        </Container>
    </React.Suspense>
    
    )
}
