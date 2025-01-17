import SignIn from "../../../auth/signin/page";

export default async function SubSignInPage({params}:{params:Promise<{subdomain:string}>}) {
    const props = await params;
    return <SignIn subdomain={props.subdomain} />
}