import type { ProductListDto } from "~/types/products";

export const useProduct = () => {
    // Global state for products
    const products = useState<ProductListDto[]>('products', () => []);
    const selectedProduct = useState<ProductListDto | null>('selectedProduct', () => null);

    const setProducts = (newProducts: ProductListDto[]) => {
        products.value = newProducts;
    }

    const getProductById = (id: number): ProductListDto | undefined => {
        return products.value.find(p => p.id === id);
    }

    const setSelectedProduct = (product: ProductListDto) => {
        selectedProduct.value = product;
    }

    return {
        products,
        selectedProduct,
        getProductById,
        setSelectedProduct,
        setProducts
    }
};