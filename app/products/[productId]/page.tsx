import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getProductAPI } from '../api/getProductAPI';
import Fallback from '../../../components/common/fallback';
import { SERVER_URL } from '../../../constants/url';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ReviewPage from '../../../app/reviews/page';
import RatingReviewForm from '../../../app/reviews/RatingReviewForm';
import ProductTopActions from '../components/ProductTopActions';
import ProductBottomActions from '../components/ProductBottomActions';
import Link from 'next/link';
import Rating from '@mui/material/Rating';
import RecommendedProducts from '../RecommendedProducts';
import CardImage from '../components/CardImage';
import { ProductDetailsVideo } from '../components/ProductDetailsVideo';
import { Toaster } from 'sonner';


export const revalidate = 3600;

export const dynamicParams = true;

export async function generateStaticParams() {
  const data = await fetch(SERVER_URL + "/products").then(res => res.json());
  return data.data.products.map((product: any) => ({
    productId: product._id
  }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ productId: string, subdomain?:string }> }) {
  let { productId } = await params;
  const product = await getProductAPI(productId) ?? {};
  const photos = [
    'https://placehold.co/600x400/orange/white',
    'https://placehold.co/600x400/green/white',
    'https://placehold.co/600x400/red/white'
  ];
  const links = [
    'https://placehold.co/600x400/brown/white',
    'https://placehold.co/600x400/green/white',
    'https://placehold.co/600x400/yellow/white'
  ]

  if (!Object?.keys(product).length) {
    return <Fallback item={'No product details found yet. Wait..'} />
  }

  return (
    <Box>
      <Container maxWidth="md" component={'main'}>
        <Card sx={{
          maxWidth: "100%",
          marginTop: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 10
        }}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={6}>
              {/* Add multiple and scrollable images here using carousel or scrollmenu */}
              <Box
                style={{
                  backgroundColor: 'white',
                  overflow: 'auto',
                  whiteSpace: 'nowrap',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'center',
                  maxWidth: 'fit-content',
                  borderRadius: 15
                }}
              >
                {product.product_pictures?.length ?

                  product.product_pictures.slice(0, 2).map((product_picture: any, i: any) =>
                    <div key={i} style={{ display: 'inline-block', margin: 4 }}>
                      <CardImage
                        src={`${SERVER_URL}/uploads/${product_picture}`}
                        alt={product.product_name}
                        style={{
                          display: 'block',
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          borderRadius: 20,
                        }}
                        width={345}
                        height={345}
                      />
                    </div>
                  ) : photos.map((photo, i) =>
                    <div key={i} style={{ display: 'inline-block', margin: 4 }}>
                      <CardImage
                        src={photo}
                        alt={'photo'}
                      />
                    </div>)
                }
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent style={{ height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <ProductTopActions product={product} />
                <Typography gutterBottom variant="h5" component="div">
                  <span>Name: {product.product_name}</span>
                </Typography>
                <Rating name="read-only" value={product?.averageRating ?? 3} readOnly />
                <Typography gutterBottom variant="h5" component="div" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <span>Price: &#x20A6; {product.product_price}</span><Link href={'tel:07016807004'} style={{ fontSize: 12, textDecoration: 'none' }}>Tel: 07016807004</Link>
                </Typography>
                <ProductBottomActions product={product} />
              </CardContent>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography gutterBottom variant="h5" component="div">
                Description:
              </Typography>
              <Typography variant="body2" component={"div"} sx={{ color: 'text.secondary', ml: 1 }}>
                {product.product_description ?? "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography gutterBottom variant="h5" component="div">
                Shipping Info:
              </Typography>
              <Typography variant="body2" component={"div"} sx={{ color: 'text.secondary', ml: 1 }}>
                {"We will take care of the shipping of the item and its return in case  of any damages (to the item and you wish to return) during transit"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography gutterBottom variant="h5" component="div">
                Payment Method(s):
              </Typography>
              <Typography variant="body2" component={"div"} sx={{ color: 'text.secondary', }}>
                <ul>
                  <li>Paystack</li>
                  <li>Bank Transfer</li>
                  <li>Opay</li>
                  <li>USSD</li>
                  <li>Card</li>
                  <li>Pay on Delivery</li>
                </ul>
              </Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography gutterBottom variant="h5" component="div">
                Product Demo:
              </Typography>
              <Typography variant="body2" component={"div"} sx={{ color: 'text.secondary' }}>
                <React.Suspense fallback={<Fallback />}>
                  <ProductDetailsVideo src={`https://www.youtube.com/embed/${product?.product_demos_links ?? 'tgbNymZ7vqY'}`} />
                </React.Suspense>
              </Typography>
            </Grid>
            {/* Add multiple and scrollable images here using carousel or scrollmenu */}
            <Grid item xs={12} md={12}>
              <Typography gutterBottom variant="h5" component="div">
                Other Photo(s):
              </Typography>
              <div
                style={{
                  backgroundColor: 'white',
                  overflow: 'auto',
                  whiteSpace: 'nowrap',
                  // marginLeft: 'auto',
                  // marginRight: 'auto',
                  textAlign: 'center',
                  maxWidth: 'fit-content',
                  borderRadius: 15
                }}
              >

                {product.product_pictures?.length ?

                  product.product_pictures.reverse().slice(0, 3).map((product_picture: any, i: any) =>
                    <div key={i} style={{ display: 'inline-block', margin: 10 }}>
                      <CardImage
                        src={`${SERVER_URL}/uploads/${product_picture}`}
                        alt={product.product_name}
                        style={{
                          display: 'block',
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          borderRadius: 20,
                        }}
                        width={345}
                        height={345}
                      />
                    </div>) : links.map((link, i) =>
                      <div key={i} style={{ display: 'inline-block', margin: 10 }}>
                        <CardImage
                          src={link}
                          alt={'link'}
                          style={{
                            display: 'block',
                            marginRight: 'auto',
                            marginLeft: 'auto',
                            borderRadius: 20,
                          }}
                          width={345}
                          height={245}
                        />
                      </div>)
                }
              </div>
            </Grid>
          </Grid>
        </Card>
      </Container>
      {/* review container */}
      <ReviewPage ratings={product.ratings} /><br />
      {/* review form container */}
      <RatingReviewForm productId={product._id} />
      {/* cross-sell/upsells: Additional products: e.g People who viewed this item also bought */}
      <RecommendedProducts />
      <Box marginTop={2} padding={2} display={"flex"} justifyContent={'center'}>
        <Link
          style={{ textDecoration: "none", color: 'green' }}
          type="button"
          color="success"
          href={`/products`}
        >
          View all
        </Link>
      </Box>
      <Toaster />
    </Box>
  );
}
