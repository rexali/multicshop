import ProductDetailPage from "../../../products/[productId]/page";

export default async function SubNotificationsPage({ params }: { params: Promise<{ productId: string }> }) {

    const { productId } = await params;

    return <ProductDetailPage params={{ productId: productId }} />
}