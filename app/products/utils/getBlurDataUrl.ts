'use client'

import {getPlaiceholder}from 'plaiceholder';

export async function getBlurDataURL(src:string) {
try {
    const buffer=await fetch(src).then(async res=> Buffer.from(await res.arrayBuffer()));
    const data = await getPlaiceholder(buffer);
    return data;
} catch (error) {
    console.warn(error); 
    return {base64:'',img:''};
}

}