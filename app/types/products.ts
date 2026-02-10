export interface ProductListDto {
    id: number;
    title: string;
    price: number;
    description: string;
    short_description?: string;
    category: string;
    image: string;
}