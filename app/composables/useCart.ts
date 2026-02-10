import type { cartItemDto } from "~/types/cart-item";
import type { ProductListDto } from "~/types/products"

export const useCart = () => {
    const cartItems = useState<cartItemDto[]>('cartItems', () => []);

    const cartItemsLength = useState<number>('cartItemsLength', () => 0);

    const addToCart = (product: ProductListDto | undefined, quantity: number = 1) => {
        if (!product) return;

        cartItems.value.push({
            ...product,
            quantity
        });

        // Adding the quantity if items have the same product id
        cartItems.value = cartItems.value.reduce<cartItemDto[]>((acc, item) => {
            const existingItem = acc.find(i => i.id === item.id);
            if (existingItem) {
                if (existingItem.quantity > item.quantity) { // Update quantity if given quantity less than existing quantity
                    existingItem.quantity = item.quantity;
                } else {
                    existingItem.quantity += item.quantity;
                }
            } else {
                acc.push({ ...item });
            }
            return acc;
        }, []);

        // update cart quantity
        cartItemsLength.value = cartItems.value.reduce((total, item) => total + item.quantity, 0);

        const toast = useToast();
        toast.success('Item added to cart successfully!', `${product.title} successfully added to cart.`);
    };

    const removeFromCart = (productId: number) => {
        cartItems.value = cartItems.value.filter(item => item.id !== productId);
        cartItemsLength.value = cartItems.value.reduce((total, item) => total + item.quantity, 0);
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const item = cartItems.value.find(i => i.id === productId);
        if (item) {
            item.quantity = quantity;
            cartItemsLength.value = cartItems.value.reduce((total, item) => total + item.quantity, 0);
        }
    };

    const clearCart = () => {
        cartItems.value = [];
        cartItemsLength.value = 0;
    };

    const cartTotal = computed(() => {
        return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    });

    return {
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemsLength,
        cartItems,
        cartTotal
    };
};