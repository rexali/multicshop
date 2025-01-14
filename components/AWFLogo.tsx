'use client'

import Image from "next/image";
import Link from "next/link";

function AWFLogo() {
    return (
        <Link href={'/'}>
            <Image
                src={"/awf-logo.png"}
                width={40}
                height={40}
                alt="cs"
                style={{
                    borderRadius: 40,
                    marginRight: 5
                }} />
        </Link>
    );
}

export default AWFLogo;