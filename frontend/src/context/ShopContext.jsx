import { createContext, useEffect, useState } from "react";
import { products as initialProducts } from "../assets/assets"; // Ensure this matches your assets file
import { toast } from "react-toastify";

// 1. This is the Named Export that ProductItem.jsx is looking for
export const ShopContext = createContext(); 

const ShopContextProvider = (props) => {
    const currency = 'KSh';
    const delivery_fee = 50;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select Weight/Quantity");
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart");
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    };

    const value = {
        products: initialProducts, 
        currency, 
        delivery_fee,
        search, 
        setSearch, 
        showSearch, 
        setShowSearch,
        cartItems, 
        addToCart, 
        getCartCount
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

// 2. This is the Default Export for your main.jsx
export default ShopContextProvider;