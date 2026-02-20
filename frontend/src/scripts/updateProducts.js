const products = [
    {
        _id: "aaaaa",
        name: "Unga wa Dola 2kg",
        description: "Premium maize flour for your daily meals. Sourced and delivered within Gatwekera, Kibra.",
        price: 195,
        image: ["p_img1"],
        category: "Food",
        subCategory: "Grains",
        sizes: ["2kg"],
        date: Date.now(),
        bestseller: true
    },
    {
        _id: "aaaab",
        name: "Sugar 1kg",
        description: "Refined sugar for your beverages and desserts. Freshly sourced for Kibra residents.",
        price: 150,
        image: ["p_img2_1"],
        category: "Food",
        subCategory: "Sweeteners",
        sizes: ["1kg"],
        date: Date.now(),
        bestseller: true
    },
    {
        _id: "aaaac",
        name: "Tea Leaves 500g",
        description: "Aromatic tea leaves to start your day. Delivered fresh to your doorstep in Kibra.",
        price: 250,
        image: ["p_img3"],
        category: "Beverages",
        subCategory: "Tea",
        sizes: ["500g"],
        date: Date.now(),
        bestseller: false
    },
    // Add more products here...
];

console.log("Updated products:", products);