'use client'

import React, { useContext, useState } from "react";
import Link from "next/link";
import { Box, Typography, Button, Container } from "@mui/material";
import UsersMessages from "./UsersMessages";
import UsersOrders from "./UsersOrders";
import UsersTransactions from "./UsersTransactions";
import UsersProducts from "./UsersProducts";
import UsersProfiles from "./UsersProfiles";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../products/styles/styles.css"
import Add from "@material-ui/icons/Add";
import UsersNotifications from "./UsersNotifications";
import AdminProfile from "./AdminProfile";
import UsersQoutes from "./UsersQoutes";
// import UsersSubscriptions from "./UsersSubscriptions";
import { useSearchParams } from "next/navigation";
import UsersCarts from "./UsersCarts";
import ProtectedAdminRoute from "../../components/ProtectedAdminRoute";
import CartPage from "../carts/page";
import SellProducts from "./SellProducts";
import { AppContext } from "../../context/AppContext";
import ReportPage from "./Report";
import UsersSubscriptionsTable from "../subscriptions/UserSubscriptions";
import AnalyticsPage from "./Analytics";

export default function UserTabs() {
    const searchParams = useSearchParams();
    const tabId = searchParams.get('tabId') || window.sessionStorage.getItem('tabId');
    const { state } = useContext(AppContext)

    let [tabName, setTabName] = useState(tabId ?? 'sell');

    const openTab = (tabname: any) => {
        window.sessionStorage.setItem('tabId', tabname);
        setTabName(tabname);
    }

    const styles = {
        navTabs: { fontSize: 'small' },
        minheight: { minHeight: 420 },
        marginTop: { marginTop: 60 }
    }

    return (
        <ProtectedAdminRoute>
            <div className="containerx" style={styles.minheight}>

                <div className="scrollmenu" style={styles.marginTop}>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('sell')} href={""} ><small>Sell</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('yourcart')} href={""} >
                        <small>My cart<sup style={{ color: "yellow" }}>{state?.carts?.length !== 0 && state?.carts?.length !== undefined ? state.carts.length : ''}</sup></small>
                    </Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('products')} href={""} ><small>Product(s)</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('transactions')} href={""} ><small>Sales</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('orders')} href={""} ><small>Orders</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('carts')} href={""} ><small>Carts</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('report')} href={""} ><small>Report</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('analytics')} href={""} ><small>Analytics</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('messages')} href={""} ><small>Messages</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('qoutes')} href={""} ><small>Quotes</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('admin')} href={""} ><small>My profile</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('profiles')} href={""} ><small>Profiles</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('notifications')} href={""} ><small>Notice</small></Link>
                    <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('subscriptions')} href={""} ><small>Subscribers</small></Link>
                </div>

                <div className="tab-content">
                    <div className="tab-pane active" id={tabName}>
                        {tabName === 'admin' ? <AdminProfileTab /> : ''}
                        {tabName === 'profiles' ? <ProfileTab /> : ''}
                        {tabName === 'qoutes' ? <QoutesTab /> : ''}
                        {tabName === 'products' ? <ProductsTab /> : ''}
                        {tabName === 'messages' ? <MessagesTab /> : ''}
                        {tabName === 'notifications' ? <NotificationTab /> : ''}
                        {tabName === 'transactions' ? <TransactionTab /> : ''}
                        {tabName === 'carts' ? <CartTab /> : ''}
                        {tabName === 'orders' ? <OrderTab /> : ''}
                        {tabName === 'subscriptions' ? <SubscriptionsTab /> : ''}
                        {tabName === 'sell' ? <SellTab /> : ''}
                        {tabName === 'yourcart' ? <YourCartTab /> : ''}
                        {tabName === 'report' ? <ReportTab /> : ''}
                        {tabName === 'analytics' ? <AnalyticsTab /> : ''}

                    </div>
                </div>
            </div>
        </ProtectedAdminRoute>
    );
}



function ReportTab() {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Report
                </Typography>
            </Box>

            <div>Coming soon</div>

            <ReportPage />
        </Box>
    )
}

function AnalyticsTab() {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Analytics
                </Typography>
            </Box>

            <div>Coming soon</div>

            <AnalyticsPage />
        </Box>
    )
}

function SellTab() {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Sell product(s)
                </Typography>
            </Box>

            <SellProducts />
        </Box>
    )
}


function YourCartTab() {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    My cart
                </Typography>
            </Box>
            <CartPage />
        </Box>
    )
}


function ProductsTab() {

    return (

        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box component={'div'} textAlign={'left'} >
                    <Typography
                        color='success'
                    >
                        Products
                    </Typography>
                </Box>
                <Link href={"/products/add"}><Button startIcon={<Add />}> Add product</Button></Link>
            </Box>

            <UsersProducts />
        </Box>
    )
}

function ProfileTab() {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Profiles
                </Typography>
            </Box>
            <UsersProfiles />
        </Box>
    )
}

function QoutesTab() {

    return (
        <Container>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Quotes
                </Typography>
            </Box>
            <UsersQoutes />
        </Container>
    )
}


function SubscriptionsTab() {

    return (
        <Container>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Subscribers
                </Typography>
            </Box>
            <UsersSubscriptionsTable />
        </Container>
    )
}

function AdminProfileTab() {

    return (
        <Container >
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    My profile
                </Typography>
            </Box>
            <AdminProfile />
        </Container>
    )
}

function MessagesTab() {
    return (
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                Messages<Link href={"/messages/add"}><Button startIcon={<Add />}>Send message</Button></Link>
            </Box>
            <UsersMessages />
        </Container>

    )
}


function NotificationTab() {
    return (
        <Container >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                Notifications <Link href={"/notifications/add"}><Button startIcon={<Add />}>Send notice</Button></Link>
            </Box>
            <UsersNotifications />
        </Container>

    )
}

function TransactionTab() {

    return (
        <Container >
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Sales
                </Typography>
            </Box>

            <UsersTransactions />
        </Container>
    )
}


function CartTab() {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Carts
                </Typography>
            </Box>
            <UsersCarts />
        </Box>
    )
}

function OrderTab() {

    return (
        <Container >
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Orders
                </Typography>
            </Box>
            <UsersOrders />
        </Container>
    )
}
