import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // IMPORT THIS
import axios from "axios";

// Define the backendUrl using environment variable or fallback
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const ShopContext = createContext(); 

const ShopContextProvider = (props) => {
    const shopName = "Soko Mkononi: Freshness Delivered to Gatwekera.";
    const currency = 'KSh'; // Ensure currency is strictly 'KSh'
    const delivery_fee = 50;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(null);
    const [products, setProducts] = useState([]);

    // INITIALIZE NAVIGATE HERE
    const navigate = useNavigate();

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

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                totalAmount += cartItems[items][item] * 100; // Assuming 100 is the price per item
            }
        }
        return totalAmount / 100; // Convert back to proper currency format
    };

    const updateToken = (newToken) => {
        setToken(newToken);
    };

    const contactInfo = {
        location: "Unknown Location",
        phone: "Unknown Phone",
        email: "Unknown Email"
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    const value = {
        products, // Use fetched products instead of initialProducts
        shopName, // Add shop name to the context
        currency, 
        delivery_fee,
        search, 
        setSearch, 
        showSearch, 
        setShowSearch,
        cartItems, 
        addToCart, 
        getCartCount,
        getCartAmount, // Add getCartAmount to the context
        navigate, // ADD THIS TO THE VALUE OBJECT
        backendUrl, // Include backendUrl in the context
        token, // Add token to the context
        setToken: updateToken, // Add setToken function to the context
        contactInfo // Add contactInfo to the context
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;