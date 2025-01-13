'use client';

import { useMediaQuery } from "react-responsive";
import DesktopProductCategories from "./DesktopProductCategories";

export function SidebarProductCategories({ categoryData }: { categoryData: any }) {
    const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });
    return !isMobile && <DesktopProductCategories categoryData={categoryData} />
}