'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AWFLogo from '../../components/AWFLogo';
import { useMediaQuery } from 'react-responsive';
import Cart from '@mui/icons-material/ShoppingCart';
import { handleSignOut } from '../../app/auth/utils/handleSignOut';
import Link from 'next/link';
import { SERVER_URL } from '../../constants/url';
import { Avatar, Button, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AppContext } from '../../context/AppContext';
import Notifications from '@mui/icons-material/Notifications';
import Message from '@mui/icons-material/Message';
import { useAuth } from '../../hooks/use-auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CardImage from '../../app/products/components/CardImage';
import ErrorBoundary from '../ErrorBoundary';
import SearchInput from '../../app/search/SearchInput';

const pages = [
  'About',
  "Services",
  'Contact',
  'Products',
];

const menus = [
  'Messages',
  'Notifications'
];


const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fof8ff'
    },
    secondary: {
      main: '#00acc1'
    }
  }
});

function NavBar(props: any) {

  const { state, dispatch } = React.useContext<{ state: any, dispatch: any }>(AppContext);

  const { user } = useAuth();

  const router = useRouter()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const [anchorElCat, setAnchorElCat] = React.useState<null | HTMLElement>(null);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenCategoryMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCat(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu: any = () => {
    setAnchorElUser(null);
  };

  const handleCloseCategoryMenu = () => {
    setAnchorElCat(null);
  };

  const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });
  let categoryData = props?.categoryData ?? [];
  let categories = categoryData.map((categoryData: { product_category: any; }) => categoryData.product_category)
  const categoriex = Array.from(new Set(categories));


  const searchParams = useSearchParams() as any;
  const pathname = usePathname();

  function goToNextPage() {
    if (user?._id) {
      router.push('/carts');
    } else {
      const params = new URLSearchParams(searchParams);
      let next = `${pathname}?${params.toString()}`;
      router.push(`/auth/signin?next=${next}`)
    }
  }

  return (
    <ErrorBoundary>
      <CssBaseline />
      <ThemeProvider theme={lightTheme}>
        <AppBar position={isMobile ? "fixed" : "static"} >
          <Container maxWidth={"xl"}>
            <Toolbar disableGutters>
              {!isMobile && <AWFLogo />}
              <Link
                href={'/'}
                style={{
                  display: isMobile ? "none" : '',
                  fontSize: 18,
                  textDecoration: 'none',
                  color: 'green',
                  marginRight: 5,
                  letterSpacing: '.1rem',
                  fontWeight: 700,
                }}
              >
                cshop
              </Link>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user?"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page, index) => (
                    <MenuItem key={index + "me"} onClick={handleCloseNavMenu}>
                      {<Link key={index + "li"} style={{ marginLeft: "5px", textDecoration: "none" }} href={`/${page.toLowerCase()}`}>{page}</Link>}
                    </MenuItem>
                  ))}
                  <MenuItem key={"categories"}>
                    CATEGORIES
                  </MenuItem>
                  {categoriex.map((category: any, index: any) => (
                    <MenuItem key={index + "me"} onClick={handleCloseNavMenu}>
                      {<Link key={index + "li"} style={{ marginLeft: "5px", textDecoration: "none" }} href={`/category/?term=${category.toLowerCase()}`}>{category}</Link>}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Link
                href={'/'}
                style={{
                  textDecoration: "none",
                  marginRight: 2,
                  display: isMobile ? 'flex' : 'none',    ///{ xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                }}>
                cshop
              </Link>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page, index) => (<Link
                  key={index + "p"}
                  onClick={() => { handleCloseNavMenu }}
                  href={`/${page === "Waqf" ? "waqfs" : page.toLowerCase()}`}
                  style={{ margin: 4, color: 'green', display: 'block', textDecoration: "none", fontSize: 18 }}
                >
                  {page}
                </Link>
                ))}
              </Box>
              {/* search bar */}
              {!isMobile && <SearchInput />}
              {/* Carts components */}
              {
                !isMobile && (
                  <span style={{ marginRight: 16 }}><Button onClick={() => goToNextPage()} size='small' sx={{ color: "green" }} startIcon={<Cart />}>Cart</Button><sup style={{ color: "yellow" }}>{state?.carts[0]?.totalCarts !== 0 && state?.carts[0]?.totalCarts !== undefined ? state.carts[0].totalCarts : ''}</sup></span>
                )
              }

              {isMobile && (
                <span style={{ marginRight: 10 }} onClick={() => goToNextPage()}><Cart sx={{ fontSize: 18 }} /><sup style={{ color: "yellow" }}>{state?.carts[0]?.totalCarts !== 0 && state?.carts[0]?.totalCarts !== undefined ? state?.carts[0]?.totalCarts : ''}</sup></span>
              )
              }
              <Link href={'/auth/join'} style={{ textDecoration: 'none', color: 'green', marginRight: 4 }} >Join</Link>
              {/* end */}
              {/* Messages component */}
              {!isMobile && <Link href={'/messages/user'} style={{ marginRight: 16, display: user?._id ? '' : 'none' }} ><Button sx={{ color: "green" }} startIcon={<Message />}>Messages</Button></Link>}
              {/* Notification component */}
              {!isMobile && <Link href='/notifications' style={{ marginRight: 16, display: user?._id ? '' : 'none' }} ><Button sx={{ color: "green" }} startIcon={<Notifications />}>Notifications</Button></Link>}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {
                      user?.photo ?
                        <CardImage
                          src={`${SERVER_URL}/uploads/${user.photo}`}
                          alt="Account"
                          width={30}
                          height={30}
                          style={{
                            borderRadius: 20,
                            marginLeft: 2
                          }}
                        />
                        : <Avatar sx={{ width: 30, height: 30 }} />
                    }
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key={"join"} onClick={handleCloseUserMenu}>
                    <Link style={{ textDecoration: "none" }} href={`/auth/join`}>Join</Link>
                  </MenuItem>

                  {/* <MenuItem key={"signin"} onClick={handleCloseUserMenu}>
                  <Link style={{ textDecoration: "none", display: user?.token ? 'none' : '' }} href={`/auth/signin`}>Sign In</Link>
                </MenuItem>


                <MenuItem key={"signup"} onClick={handleCloseUserMenu}>
                  <Link style={{ textDecoration: "none" }} href={`/auth/signup`}>Sign Up</Link>
                </MenuItem> */}


                  {
                    user?._id && <MenuItem key={"account"} onClick={handleCloseUserMenu}>
                      <Link style={{ textDecoration: "none" }} href={`/users`}>Account</Link>
                    </MenuItem>
                  }

                  {
                    user?._id && <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                      <Link onClick={() => handleSignOut(router)} style={{ textDecoration: "none" }} href={'#'}>Logout</Link>
                    </MenuItem>
                  }
                  {/* Other Menu components */}
                  {menus.map((menu, index) => (
                    <MenuItem key={menu} onClick={handleCloseUserMenu}>
                      {
                        user?._id && <Link style={{ textDecoration: "none", display: !isMobile ? 'none' : '' }} key={index + "s"} href={`/${menu === 'Messages' ? menu.toLowerCase() + '/user' : menu.toLowerCase()}`}>{menu}</Link>
                      }
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
export default NavBar;