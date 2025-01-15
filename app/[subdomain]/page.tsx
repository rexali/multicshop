import AppPage from "../page";
import { notFound } from 'next/navigation';
import { Fragment } from "react";
import Box from "@mui/material/Box";
import { SERVER_URL } from "../../constants/url";

export default async function SubdomainPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const { subdomain } = await params;
    console.log('SubdomainPage: Rendering page for subdomain:', subdomain)

    try {
        // Use fetch to verify if the subdomain exists
        const data: any = await fetch(`${SERVER_URL}/tenant?subdomain=${subdomain}`);

        console.log('SubdomainPage: Tenant retrieved:', data.data.tenant)

        if (!data.data.tenant) {
            console.log('SubdomainPage: Tenant not found, redirecting to 404')
            notFound()
        }

        return (
            <Fragment>
                <AppPage params={Promise.resolve({ subdomain })} />
                <Box marginTop={2} padding={2} display={"flex"} alignItems={'center'} justifyContent={'center'}>
                    <h1 className="text-4xl font-bold">Welcome to {data.data.tenant.name}</h1>
                    <p>This is a multitenant site for {subdomain}</p>
                    <pre>{JSON.stringify(data.data.tenant, null, 2)}</pre>
                </Box>
            </Fragment>
        )
    } catch (error) {
        console.error('SubdomainPage: Error fetching tenant:', error)
        return (
            <Box marginTop={2} padding={2} display={"flex"} alignItems={'center'} justifyContent={'center'}>
                <h1 className="text-4xl font-bold text-red-500">Error</h1>
                <p>There was an error loading the tenant information.</p>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </Box>
        )
    }
}


