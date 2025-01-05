'use client'

import "./styles/styles.css";
import React from "react";
import { useMediaQuery } from "react-responsive";

export default function ProductCategories(props: any) {
  const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });

  let categoryData = props.categoryData ?? [];
  let categories = Array.from(new Set(categoryData.map((product: any) => product.product_category)));

  if (!isMobile) {

    return <div></div>;
  }

  return (
    <div className="scrollmenu" >
      {
        categories.map((category: any, i: number) => <a key={category + i} href={`/category/?term=${category.toLowerCase()}`}>{category}</a>)
      }
    </div>
  )
}
