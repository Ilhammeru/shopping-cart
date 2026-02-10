import type { ProductListDto } from "~/types/products";

export const useProduct = () => {
    // Global state for products
    const products = useState<ProductListDto[]>('products', () => []);
    const selectedProduct = useState<ProductListDto | null>('selectedProduct', () => null);

    const getProducts = async (): Promise<ProductListDto[]> => {
        try {
            const fetchedProducts = await $fetch<ProductListDto[]>('/api/product');

            // If description is too long, truncate it for list view
            fetchedProducts.forEach(product => {
                product.short_description = '';
                if (product.description.length > 100) {
                    product.short_description = product.description.substring(0, 100) + '...';
                }
            });

            // Store in state
            products.value = fetchedProducts;

            return fetchedProducts;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
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
        getProducts,
        getProductById,
        setSelectedProduct
    }
};