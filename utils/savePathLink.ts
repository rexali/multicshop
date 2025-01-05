'use client';

export function savePathLink() {
    if (typeof window !== "undefined") {
        const path = window.location.href;
        window.localStorage.setItem("path", path);
        window.location.assign('/auth/signin');
    }
}