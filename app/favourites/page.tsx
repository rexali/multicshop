'use client'
import { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import FavouriteList from "./FavouriteList";
import { AppContext } from "../../context/AppContext";
import { getFavourites } from "../../store/actions/app-actions";
import Fallback from "../../components/common/fallback";
import ReactPagination from "../../components/react-pagination";
import Link from "next/link";
import { getUserFavouritesAPI } from "./api/getUserFavouritesAPI";
import { getToken } from "../../utils/getToken";
import { useAuth } from "../../hooks/use-auth";


export default function FavouritePage() {

  const [data, setData] = useState<any>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const { dispatch } = useContext(AppContext);
  const auth = useAuth();
  const userId = auth.user?._id ||  getToken('_id') as string;

  useEffect(() => {
    async function getData() {
      try {
        const result = await getUserFavouritesAPI(userId, activePage)
        setData(result);
        dispatch(getFavourites(data))
      } catch (error) {
        console.warn(error);   
      }
     
    }
    getData();

  }, [userId, activePage, data, dispatch]);

  if (!data.length) {
    return <Fallback item={'No item in your wish list'} />
  }

  return (
    <Container maxWidth="md" component={'main'} sx={{ mt: 5 }}>
      <h2 style={{ display: 'flex', justifyContent: "space-between" }}>Favourites <Link style={{ textDecoration: "none", color: 'blue' }} href={"/products"}><Button>See all</Button></Link></h2>
      <FavouriteList products={data} />
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={4}
          totalItemsCount={data[0]?.totaFavourites}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
    </Container>
  )
}
