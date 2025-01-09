import ProductDetailPage from "../../../products/[productId]/page";

export default async function SubProductDetailsPage({ params }: { params: Promise<{ productId: string, subdomain:string }> }) {

    const { productId, subdomain } = await params;
    console.log("Product Details subdomain: "+subdomain, productId)

    return <ProductDetailPage params={Promise.resolve({ productId })} />
}