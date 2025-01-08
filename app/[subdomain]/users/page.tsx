
import UsersPage from "../../users/page";

export default async function SubUsersPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const { subdomain } = await params
    return <UsersPage subdomain ={subdomain}/>
}