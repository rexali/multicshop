"use client"

import React, { useCallback, useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import ProtectedRoute from "../../components/protected-route";
import { Box, Typography, Button } from "@mui/material";
import UserFavourites from "./UserFavourites";
import UserMessages from "./UserMessages";
import UserProducts from "./UserProducts";
import UserProfile from "./UserProfile";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserCart from "./UserCart";
import "../products/styles/styles.css"
import Add from "@material-ui/icons/Add";
import UserSettings from "./UserSettings";
import UsersNotifications from "./UserNotifications";
import { useProfile } from "./hooks/useProfile";
import { useAuth } from "../../hooks/use-auth";
import { getCarts } from "../../store/actions/app-actions";
import { getUserCartsAPI } from "./api/getUserCarts";
import { AppContext } from "../../context/AppContext";
import { getToken } from "../../utils/getToken";
import UserOrders from "../orders/UserOrders";
import UserTransactions from "../transactions/UserTransactions";
import { useSearchParams } from "next/navigation";
import ErrorBoundary from "../../components/ErrorBoundary";
import ProtectedUserRoute from "../../components/ProtectedUserRoute";

export default function UsersPage(props:any) {
    console.log('UsersPage: Rendering page for user: '+props.subdomain);
    const searchParams = useSearchParams();

    const getTabId = () => {
        if (typeof window !== 'undefined') {
            return window.sessionStorage.getItem('tabId');
        }else{
            console.log('Window is undefined');
        }
    }
    const tabId = searchParams.get('tabId') || getTabId();
    let [tabName, setTabName] = useState(tabId ?? 'profile');
    const [cart, setCart] = useState<any>([]);

    const { state, dispatch } = useContext(AppContext);
    const auth = useAuth();
    const userId = auth.user?._id || getToken('_id') as string;

    const openTab = (tabname: any) => {
        window.sessionStorage.setItem('tabId', tabname);
        setTabName(tabname);
    }

    const { user, error, isLoading } = useProfile(userId);

    const getData = useCallback(async () => {
        let initialCarts = state.carts;
        try {
            let userCarts = await getUserCartsAPI(userId);
            dispatch(getCarts([...initialCarts, ...userCarts]));
            setCart(userCarts)
        } catch (error) {
            console.warn(error);
        }

    }, [dispatch, state.carts, userId])


    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <ErrorBoundary>
            <ProtectedUserRoute>
                <div className="containerx" style={styles.minheight}>
                    <div className="scrollmenu" style={styles.marginTop}>
                        <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('profile')} href={""} ><small>My profile</small></Link>
                        {/* <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('products')} href={""} ><small>My products</small></Link> */}
                        <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('messages')} href={""} ><small>Messages</small></Link>
                        <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('notifications')} href={""} ><small>Notifications </small></Link>
                        <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('favourites')} href={""} ><small>My wish</small></Link>
                        <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('cart')} href={""} ><small>My cart</small></Link>
                        <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('orders')} href={""} ><small>My orders</small></Link>
                        <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('transactions')} href={""} ><small>My transactions</small></Link>
                        {/* <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('settings')} href={""} ><small>Settings</small></Link> */}
                    </div>

                    <div className="tab-content">
                        <div className="tab-pane container active" id="profile">
                            {tabName === 'profile' ? <ProfileTab user={user} /> : ''}
                            {tabName === 'products' ? <ProductsTab /> : ''}
                            {tabName === 'messages' ? <MessagesTab /> : ''}
                            {tabName === 'notifications' ? <NotificationsTab /> : ''}
                            {tabName === 'favourites' ? <FavouritesTab /> : ''}
                            {tabName === 'cart' ? <CartTab cart={cart} /> : ''}
                            {tabName === 'orders' ? <OrderTab /> : ''}
                            {tabName === 'transactions' ? <TransactionTab /> : ''}
                            {tabName === 'settings' ? <SettingsTab /> : ''}
                        </div>
                    </div>
                </div>
            </ProtectedUserRoute>
        </ErrorBoundary>
    );
}

const styles = {
    navTabs: { fontSize: 'small' },
    minheight: { minHeight: 420 },
    marginTop: { marginTop: 60, maginBottom: 30 }
}

function ProductsTab() {

    return (

        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                Your products <Link href={"/products/add"}><Button startIcon={<Add />}>Add product</Button></Link>
            </Box>
            <UserProducts />
        </Box>
    )
}

function SettingsTab() {

    return (

        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                Settings
            </Box>
            <UserSettings />
        </Box>
    )
}

function ProfileTab(props: any) {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    My profile
                </Typography>
            </Box>
            <UserProfile user={props?.user} />
        </Box>
    )
}

function MessagesTab() {
    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Message(s)
                </Typography>
            </Box>
            <UserMessages />
        </Box>

    )
}

function NotificationsTab() {
    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    Notification(s)
                </Typography>
            </Box>
            <UsersNotifications />
        </Box>

    )
}

function FavouritesTab() {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    My favourite(s)
                </Typography>
            </Box>
            <UserFavourites />
        </Box>
    )
}


function CartTab(props: any) {

    return (
        <Box>
            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    My cart
                </Typography>
            </Box>

            <UserCart cart={props.cart} />
        </Box>
    )
}

function OrderTab() {

    return (
        <Box>

            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    My order(s)
                </Typography>
            </Box>
            {/* <UserOrders /> */}
            <UserOrders />
        </Box>
    )
}


function TransactionTab() {

    return (
        <Box>

            <Box component={'div'} textAlign={'left'} >
                <Typography
                    color='success'
                >
                    My transaction(s)
                </Typography>
            </Box>
            {/* <UserHistory /> */}
            <UserTransactions />
        </Box>
    )
}
