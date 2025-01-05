'use client';

export function getPathLink() {
    if (typeof window !== "undefined") {
        let next = window.localStorage.getItem("path") as string;
        window.location.assign(next);
    }
}