import Link from "next/link";

export default function NotFound (){
    return <div>
        <h1>404 Not  Found</h1>
        <p>Could not find requested resource</p>
        <Link href={'/'}>Return home</Link>
    </div>
}