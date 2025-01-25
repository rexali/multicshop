import AdminPage from "../../admins/page";

export default async function SubAdminsPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const { subdomain } = await params;
    return <AdminPage  subdomain ={subdomain} />
}