import ProductsPage from "../../products/page";

export default async function SubProductsPage({ params }: { params: Promise<{ subdomain:string }> }) {
    
    const { subdomain } = await params;
    console.log("Product subdomain: "+subdomain)
    return <ProductsPage subdomain={subdomain} />
}