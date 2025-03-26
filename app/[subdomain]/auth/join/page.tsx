'use client'
import Link from "next/link";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../products/styles/styles.css"
import SubSignInPage from "../signin/page";
import SubSignUpPage from "../signup/page";

export default async function JoinPage(props: any) {
    const subdomain: string = props?.subdomain ?? ""
    
    let [tabName, setTabName] = useState('signin');

    const openTab = (tabname: any) => {
        setTabName(tabname);
    }

    const styles = {
        navTabs: { fontSize: 'small' },
        minheight: { minHeight: 420 },
        marginTop: { marginTop: 80 }
    }

    return (
        <div className="container" style={styles.minheight}>
            <div className="scrollmenu" style={styles.marginTop}>
                <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('signin')} href={""} ><small>Sign in</small></Link>
                <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('signup')} href={""} ><small>Register</small></Link>
            </div>
            <div className="tab-content">
                <div className="tab-pane active" id={tabName}>
                    {tabName === 'signin' ? <SubSignInPage params={Promise.resolve({ subdomain })} /> : ''}
                    {tabName === 'signup' ? <SubSignUpPage params={Promise.resolve({ subdomain })} /> : ''}
                </div>
            </div>
        </div>
    );
}