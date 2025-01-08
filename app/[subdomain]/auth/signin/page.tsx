import SignIn from "../../../auth/signin/page";

export default async function SubSignInPage({params}:{params:Promise<{subdomain:string}>}) {
    const subdomain = await params;
    return <SignIn subdomain={subdomain.subdomain} />
}