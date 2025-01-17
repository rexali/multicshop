import SignUp from "../../../auth/signup/page";

export default async function SubSignUpPage({params}:{params:Promise<{subdomain:string}>}) {
    const props = await params;
    return <SignUp subdomain={props.subdomain} />
}
