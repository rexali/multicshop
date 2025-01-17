'use client'
import Link from "next/link";
import { useState } from "react";
import SignIn from "../signin/page";
import SignUp from "../signup/page";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../products/styles/styles.css"
import SignUpBusiness from "./SignUpBusiness";

export default function JoinPage(props: any) {
    const subdomain = props?.subdomain ?? ""
    let [tabName, setTabName] = useState('signin');
    const openTab = (tabname: any) => {
        setTabName(tabname);
    }

    const styles = {
        navTabs: { fontSize: 'small' },
        minheight: { minHeight: 420 },
        marginTop: { marginTop: 60 }
    }

    return (
        <div className="container" style={styles.minheight}>
            
            <div className="scrollmenu" style={styles.marginTop}>
                <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('signin')} href={""} ><small>Sign in</small></Link>
                <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('signup')} href={""} ><small>Register</small></Link>
                <Link style={styles.navTabs} data-toggle="tab" onClick={() => openTab('signup-business')} href={""} ><small>Register as a Business</small></Link>    
            </div>

            <div className="tab-content">
                <div className="tab-pane active" id={tabName}>
                    {tabName === 'signin' ? <SignIn subdomain={subdomain} /> : ''}
                    {tabName === 'signup' ? <SignUp subdomain={subdomain} /> : ''}
                    {tabName === 'signup-business' ? <SignUpBusiness /> : ''}

                </div>
            </div>
        </div>
    );
}