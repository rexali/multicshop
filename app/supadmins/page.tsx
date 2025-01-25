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
import { useSearchParams } from "next/navigation";
import UsersCarts from "./UsersCarts";
import ProtectedAdminRoute from "../../components/ProtectedAdminRoute";
import CartPage from "../carts/page";
import SellProducts from "./SellProducts";
import { AppContext } from "../../context/AppContext";
import ReportPage from "./Report";
import UsersSubscriptionsTable from "../subscriptions/UserSubscriptions";
import AnalyticsPage from "./Analytics";

export default function AdminPage(props: any) {
    
    const subdomain = props.subdomain ?? ""

    const searchParams = useSearchParams();

    const getTabId = () => {
        if (typeof window !== 'undefined') {
            return window.sessionStorage.getItem('tabId');
        } else {
            console.log('Window is undefined');
        }
    }
    const tabId = searchParams.get('tabId') || getTabId();
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
                        {tabName === 'admin' ? <AdminProfileTab subdomain={subdomain}/> : ''}
                        {tabName === 'profiles' ? <ProfileTab subdomain={subdomain} /> : ''}
                        {tabName === 'qoutes' ? <QoutesTab subdomain={subdomain}/> : ''}
                        {tabName === 'products' ? <ProductsTab subdomain={subdomain} /> : ''}
                        {tabName === 'messages' ? <MessagesTab subdomain={subdomain}/> : ''}
                        {tabName === 'notifications' ? <NotificationTab subdomain={subdomain}/> : ''}
                        {tabName === 'transactions' ? <TransactionTab subdomain={subdomain}/> : ''}
                        {tabName === 'carts' ? <CartTab subdomain={subdomain}/> : ''}
                        {tabName === 'orders' ? <OrderTab subdomain={subdomain}/> : ''}
                        {tabName === 'subscriptions' ? <SubscriptionsTab subdomain={subdomain} /> : ''}
                        {tabName === 'sell' ? <SellTab subdomain={subdomain}/> : ''}
                        {tabName === 'yourcart' ? <YourCartTab subdomain={subdomain} /> : ''}
                        {tabName === 'report' ? <ReportTab subdomain={subdomain} /> : ''}
                        {tabName === 'analytics' ? <AnalyticsTab subdomain={subdomain}/> : ''}

                    </div>
                </div>
            </div>
        </ProtectedAdminRoute>
    );
}



function ReportTab(props:any) {
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

            <ReportPage subdomain={props.subdomain} />
        </Box>
    )
}

function AnalyticsTab(props:any) {

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

            <AnalyticsPage subdomain={props.subdomain} />
        </Box>
    )
}

function SellTab(props:any) {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Sell product(s)
                </Typography>
            </Box>

            <SellProducts subdomain={props.subdomain} />
        </Box>
    )
}


function YourCartTab(props:any) {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    My cart
                </Typography>
            </Box>
            <CartPage subdomain={props.subdomain} />
        </Box>
    )
}


function ProductsTab(props:any) {

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

            <UsersProducts subdomain={props.subdomain} />
        </Box>
    )
}

function ProfileTab(props:any) {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Profiles
                </Typography>
            </Box>
            <UsersProfiles subdomain={props.subdomain}/>
        </Box>
    )
}

function QoutesTab(props:any) {

    return (
        <Container>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Quotes
                </Typography>
            </Box>
            <UsersQoutes subdomain={props.subdomain} />
        </Container>
    )
}


function SubscriptionsTab(props:any) {

    return (
        <Container>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Subscribers
                </Typography>
            </Box>
            <UsersSubscriptionsTable  subdomain={props.subdomain}/>
        </Container>
    )
}

function AdminProfileTab(props:any) {

    return (
        <Container >
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    My profile
                </Typography>
            </Box>
            <AdminProfile subdomain={props.subdomain} />
        </Container>
    )
}

function MessagesTab(props:any) {
    return (
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                Messages<Link href={"/messages/add"}><Button startIcon={<Add />}>Send message</Button></Link>
            </Box>
            <UsersMessages subdomain={props.subdomain} />
        </Container>

    )
}


function NotificationTab(props:any) {
    return (
        <Container >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                Notifications <Link href={"/notifications/add"}><Button startIcon={<Add />}>Send notice</Button></Link>
            </Box>
            <UsersNotifications subdomain={props.subdomain} />
        </Container>

    )
}

function TransactionTab(props:any) {

    return (
        <Container >
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Sales
                </Typography>
            </Box>

            <UsersTransactions subdomain={props.subdomain} />
        </Container>
    )
}


function CartTab(props:any) {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Carts
                </Typography>
            </Box>
            <UsersCarts subdomain={props.subdomain}/>
        </Box>
    )
}

function OrderTab(props:any) {

    return (
        <Container >
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Orders
                </Typography>
            </Box>
            <UsersOrders subdomain={props.subdomain}/>
        </Container>
    )
}
