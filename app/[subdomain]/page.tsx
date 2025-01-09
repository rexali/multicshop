import AppPage from "../page";

import { notFound } from 'next/navigation';
import TenantModel from '../lib/model.tenant';
import { Fragment } from "react";
import Box from "@mui/material/Box";

export default async function SubdomainPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const { subdomain } = await params;
    console.log('SubdomainPage: Rendering page for subdomain:', subdomain)

    try {
        const tenant = await TenantModel.findOne({ subdomain })
        console.log('SubdomainPage: Tenant retrieved:', tenant)

        if (!tenant) {
            console.log('SubdomainPage: Tenant not found, redirecting to 404')
            notFound()
        }

        return (
            <Fragment>
                <AppPage />
                <Box sx={{ mx: 'auto' }}>
                    <h1 className="text-4xl font-bold">Welcome to {tenant.name}</h1>
                    <p>This is a multitenant site for {subdomain}</p>
                    <pre>{JSON.stringify(tenant, null, 2)}</pre>
                </Box>
            </Fragment>
        )
    } catch (error) {
        console.error('SubdomainPage: Error fetching tenant:', error)
        return (
            <Box sx={{mr:'auto', ml:'auto'}}>
                <h1 className="text-4xl font-bold text-red-500">Error</h1>
                <p>There was an error loading the tenant information.</p>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </Box>
        )
    }
}


