import p_img1 from './p_img1.png'
// ... keep all your p_img imports exactly as they are ...
import logo from './logo.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import dropdown_icon from './dropdown_icon.png'
import search_icon from './search_icon.png'
import star_icon from './star_icon.png'
import star_dull_icon from './star_dull_icon.png'
import bin_icon from './bin_icon.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'

export const shopName = "Soko Mkononi";

export const contactInfo = {
    phone: "0794290546",
    email: "hassan00byekwaso@gmail.com",
    location: "Gatwekera, Kibra, Nairobi"
};

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    search_icon,
    star_icon,
    star_dull_icon,
    bin_icon,
    menu_icon,
    about_img,
    contact_img
};

export const products = [
    {
        _id: "aaaaa",
        name: "Unga wa Dola 2kg",
        description: "Premium maize flour for your daily meals. Sourced fresh for Gatwekera residents.",
        price: 195,
        image: [p_img1],
        category: "Food",
        subCategory: "Grains",
        sizes: ["2kg", "5kg", "Bale"],
        date: 1716634345448,
        bestseller: true
    },
    // Add your other products here using Category: Food, Beverages, or Household
];