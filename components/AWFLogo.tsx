'use client'

import Image from "next/image";
import Link from "next/link";

function AWFLogo() {
    return (
        <Link href={'/'}>
            <Image
                src={require("../assets/images/awf-logo.png")}
                width={40}
                height={40}
                alt="AWF"
                style={{
                    borderRadius: 40,
                    marginRight: 10
                }} />
        </Link>
    );
}

export default AWFLogo;