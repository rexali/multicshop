'use client'

export function getProductCategories(data: any = []) {
    return Array.from(new Set(data.map((product: any) => product.product_category)))
}