'use client'

import Container from "@mui/material/Container";
import * as React from "react";
import { getUsersProductsAPI } from "./api/getUsersProductsAPI";
import Box from "@mui/material/Box";
import ReactPagination from "../../components/react-pagination";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import Link from "next/link";
import { approveProductAPI } from "./api/approveProductAPI";
import { featureProductAPI } from "./api/featureProductAPI";


export default function UsersProducts() {
  const [data, setData] = React.useState<any>([]);
  const [activePage, setActivePage] = React.useState(1);

  const getProductData = React.useCallback(async () => {
    try {
      const products = await getUsersProductsAPI(activePage);
      setData(products);
    } catch (error) {
      console.log(error);
    }
  }, [activePage]);


  React.useEffect(() => {
    getProductData();
  }, [getProductData]);

  if (!data.length) {

    return (
      <Container sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }} component={"main"} maxWidth="md">
        <Box textAlign={'center'}>No product(s) found</Box>
      </Container>
    )
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Box>Total Products: {data[0]?.totalProducts}</Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S/N </TableCell>
              <TableCell align="right">Product</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Owner</TableCell>
              <TableCell align="center" colSpan={5}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product: any, i: number) => (
              <TableRow
                key={product._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{i + 1}</TableCell>
                <TableCell align="right">{product?.product_name}</TableCell>
                <TableCell align="right">{product?.createdAt?.split('T')[0]}</TableCell>
                <TableCell align="right">
                  <Link href={`mailto:${product?.user?.email}`}>{product?.user?.email}</Link>
                </TableCell>

                <TableCell align="right">

                  <TableCell align="right">
                    <Button
                      size="small"
                      disabled={product.approved === 'yes' ? true : false}
                      onClick={async () => {
                        await approveProductAPI({ productId: product._id, approved: 'yes' });
                        await getProductData();
                      }
                      }>
                      {product?.approved === 'yes' ? 'Approved' : 'Approve'}
                    </Button>
                  </TableCell>

                  <TableCell align="right">
                    <Link href={{ pathname: `/products/${product._id}/edit` }}>Edit</Link>
                  </TableCell>


                  <TableCell align="right">
                    <Link href={{ pathname: `/products/${product._id}/delete` }}>Delete</Link>
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      size="small"
                      disabled={product.featured === 'yes' ? true : false}
                      onClick={async () => {
                        await featureProductAPI({ productId: product._id, featured: 'yes' });
                        await getProductData();
                      }}>
                      {product?.featured === 'yes' ? 'Featured' : 'Feature'}
                    </Button>
                  </TableCell>

                  <TableCell align="right">
                    <Link href={'/products/' + product?._id}>View</Link>
                  </TableCell>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box marginTop={4} display={"flex"} justifyContent={'center'} >
        <ReactPagination
          activePage={activePage}
          itemsCountPerPage={4}
          totalItemsCount={data[0]?.totalProducts}
          pageRangeDisplayed={5}
          onchangeCallback={(v: any) => setActivePage(v)} />
      </Box>
    </Box>
  )
}
