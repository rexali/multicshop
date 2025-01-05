export function goToSavedLinkpath(pageNumber?: any) {
try {
    if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        const search = window.location.search;
        const params = new URLSearchParams(search);
        params.set('page', pageNumber);
        return `${pathname}?${params.toString()}`;
    }
} catch (error) {
    console.warn(error)
}
   
}