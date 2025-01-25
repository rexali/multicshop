import OrderPage from "../../../orders/[orderId]/page";

export default async function SubProductDetailsPage({ params }: { params: Promise<{ orderId: string, subdomain: string }> }) {

    const { orderId, subdomain } = await params;
    console.log("Product Details subdomain: " + subdomain, orderId)

    return <OrderPage params={Promise.resolve({ orderId })} />
}