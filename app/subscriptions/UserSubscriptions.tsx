'use client'

import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getSubscriptionsAPI } from "./api/getSubscriptionsAPI";
import ReactPagination from "../../components/react-pagination";
import Link from "next/link";

export default function UsersSubscriptionsTable(props:any) {
    const [data, setData] = useState<any>([]);
    const [activePage, setActivePage] = React.useState(1);

    useEffect(() => {
        async function getData() {
            setData(await getSubscriptionsAPI(activePage));
        }
        getData();

    }, [activePage]);


    if (!data.length) {
        <Container component={"main"} maxWidth="md" sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <Box textAlign={'center'}>No subscription(s) found</Box>
        </Container>
    }


    return (
        <Container component={'main'} sx={{ mt: 10 }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">S/N &nbsp;</TableCell>
                            <TableCell align="right">Subscriber&apos;s email &nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((subscription: any, i: number) => (
                            <TableRow
                                key={subscription._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{i + 1}</TableCell>
                                <TableCell align="right"><Link style={{ textDecoration: 'none' }} href={'mailto:' + subscription?.email}>{subscription?.email}</Link></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box marginTop={4} display={"flex"} justifyContent={'center'} >
                <ReactPagination
                    activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={data[0]?.totalSubscriptions}
                    pageRangeDisplayed={5}
                    onchangeCallback={(v: any) => setActivePage(v)} />
            </Box>
        </Container>
    )
}
