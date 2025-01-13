'use client'

import { useMediaQuery } from "react-responsive";
import SearchInput from "../app/search/SearchInput"
import Box from "@mui/material/Box";
import { Fragment } from "react";

export default function SearchProduct(props: any) {
    const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });
    return (
        <Fragment>
            {isMobile && <Box display={"flex"} justifyContent={'center'}><SearchInput /></Box>}<br/>
        </Fragment>
    )

}