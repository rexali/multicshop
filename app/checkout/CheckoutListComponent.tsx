'use client'

import dynamic from "next/dynamic";

export const CheckoutListComponent = dynamic(
    ()=>import("./CheckoutList").then((mod)=>mod.default),
    {
        ssr:false
    }
) 