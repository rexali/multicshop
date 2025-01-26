import AppPage from "../page";
import Fallback from "../../components/common/fallback";

export default async function SubdomainPage({ params }: { params: Promise<{ subdomain: string }> }) {

    try {
        const { subdomain } = await params;
        console.log('SubdomainPage: Rendering page for subdomain:', subdomain)

        return <AppPage subdomain={subdomain} />
    } catch (error: any) {
        console.error('SubdomainPage: Error fetching tenant:', error);

        return <Fallback item={"Error! " + error.message} />
    }
}


