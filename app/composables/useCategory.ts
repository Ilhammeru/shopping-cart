import type { MainCategoryListDto } from "~/types/categories";

export const useCategory = () => {
    const getHeaderCategories: () => MainCategoryListDto[] = () => {
        const output: MainCategoryListDto[] = [
            { id: 1, name: 'Bahan Bangunan', icon: 'heroicons:cube', slug: 'building-materials', color: 'bg-orange-100 dark:bg-orange-900' },
            { id: 2, name: 'Elektronik', icon: 'heroicons:computer-desktop', slug: 'electronics', color: 'bg-blue-100 dark:bg-blue-900' },
            { id: 3, name: 'Furnitur', icon: 'heroicons:home-modern', slug: 'furniture', color: 'bg-green-100 dark:bg-green-900' },
            { id: 4, name: 'Peralatan Listrik', icon: 'heroicons:bolt', slug: 'electrical', color: 'bg-yellow-100 dark:bg-yellow-900' },
            { id: 5, name: 'Cat & Pelapis', icon: 'heroicons:paint-brush', slug: 'paint', color: 'bg-purple-100 dark:bg-purple-900' },
            { id: 6, name: 'Perlengkapan Dapur', icon: 'heroicons:fire', slug: 'kitchen', color: 'bg-red-100 dark:bg-red-900' },
            { id: 7, name: 'Kamar Mandi', icon: 'heroicons:beaker', slug: 'bathroom', color: 'bg-cyan-100 dark:bg-cyan-900' },
            { id: 8, name: 'Alat Kerja', icon: 'heroicons:wrench-screwdriver', slug: 'tools', color: 'bg-gray-100 dark:bg-gray-700' },
            { id: 9, name: 'Perlengkapan Taman', icon: 'heroicons:sparkles', slug: 'garden', color: 'bg-lime-100 dark:bg-lime-900' },
            { id: 10, name: 'Keselamatan Kerja', icon: 'heroicons:shield-check', slug: 'safety', color: 'bg-indigo-100 dark:bg-indigo-900' },
            { id: 11, name: 'Sistem Pemipaan', icon: 'heroicons:funnel', slug: 'plumbing', color: 'bg-teal-100 dark:bg-teal-900' },
            { id: 12, name: 'Pencahayaan', icon: 'heroicons:light-bulb', slug: 'lighting', color: 'bg-amber-100 dark:bg-amber-900' },
            { id: 13, name: 'Dekorasi', icon: 'heroicons:star', slug: 'decoration', color: 'bg-pink-100 dark:bg-pink-900' },
            { id: 14, name: 'Outdoor', icon: 'heroicons:sun', slug: 'outdoor', color: 'bg-orange-100 dark:bg-orange-900' },
            { id: 15, name: 'Peralatan Listrik', icon: 'heroicons:rocket-launch', slug: 'power-tools', color: 'bg-rose-100 dark:bg-rose-900' },
            { id: 16, name: 'Lainnya', icon: 'heroicons:ellipsis-horizontal-circle', slug: 'others', color: 'bg-slate-100 dark:bg-slate-700' },
        ];

        return output;
    }

    return {
        getHeaderCategories
    }
};