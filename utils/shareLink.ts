'use client'

async function shareLink(productId?: any) {

    var shareData: any
    if (typeof window !== "undefined") {
        if (productId) {
            shareData = {
                title: "Siniofarm",
                text: "Farm products for you to buy",
                url: `${window.origin}/products/${productId}`
            };
        } else {
            shareData = {
                title: "Siniofarm",
                text: "Farm products for you to buy",
                url: `${window.origin}`
            }
        }

        try {
            await navigator.share(shareData);
            console.log("Share successfully");
        } catch (error) {
            console.warn(error)
        }
    }
}
export {
    shareLink
}