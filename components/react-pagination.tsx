'use client'

import Pagination from "react-js-pagination";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ReactPagination({
    activePage,
    itemsCountPerPage,
    totalItemsCount,
    pageRangeDisplayed,
    onchangeCallback
}: { activePage: any, itemsCountPerPage: any, totalItemsCount: any, pageRangeDisplayed: any, onchangeCallback: any }) {

    return <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        itemClass="page-item"
        linkClass="page-link"
        onChange={onchangeCallback}
    />
}