import mongoose from 'mongoose';
import productModel from './models/productModel.js';
import 'dotenv/config';

await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);

const moreProducts = [
    // More Electronics
    { name: "Google Pixel 8 Pro", description: "AI-powered Android smartphone with advanced camera", price: 899.99, category: "Electronics", subCategory: "Smartphones", sizes: ["128GB", "256GB", "512GB"], bestseller: true, images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"], date: Date.now() },
    { name: "iPad Air M2", description: "Lightweight tablet perfect for creativity and productivity", price: 599.99, category: "Electronics", subCategory: "Tablets", sizes: ["64GB", "256GB"], bestseller: false, images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"], date: Date.now() },
    { name: "AirPods Pro 2", description: "Active noise cancellation wireless earbuds", price: 249.99, category: "Electronics", subCategory: "Audio", sizes: ["White"], bestseller: true, images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"], date: Date.now() },
    { name: "Samsung 55\" 4K TV", description: "Crystal UHD smart TV with HDR", price: 649.99, category: "Electronics", subCategory: "TV", sizes: ["55 inch", "65 inch"], bestseller: false, images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400"], date: Date.now() },
    { name: "Canon EOS R6", description: "Full-frame mirrorless camera", price: 2499.99, category: "Electronics", subCategory: "Cameras", sizes: ["Body Only", "With Lens"], bestseller: false, images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"], date: Date.now() },

    // More Home & Kitchen
    { name: "Breville Espresso Machine", description: "Professional barista-quality espresso maker", price: 699.99, category: "Home", subCategory: "Kitchen", sizes: ["Stainless Steel"], bestseller: true, images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"], date: Date.now() },
    { name: "Le Creuset Dutch Oven", description: "Cast iron cooking pot with enamel finish", price: 349.99, category: "Home", subCategory: "Kitchen", sizes: ["5.5 Qt", "7.25 Qt"], bestseller: false, images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"], date: Date.now() },
    { name: "Shark Robot Vacuum", description: "Self-emptying robot vacuum with mapping", price: 449.99, category: "Home", subCategory: "Cleaning", sizes: ["Standard"], bestseller: true, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"], date: Date.now() },
    { name: "Nest Thermostat", description: "Smart programmable thermostat", price: 249.99, category: "Home", subCategory: "Smart Home", sizes: ["White", "Black"], bestseller: false, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"], date: Date.now() },

    // More Fashion - Men
    { name: "Nike Air Jordan 1", description: "Classic high-top basketball sneakers", price: 170.99, category: "Men", subCategory: "Footwear", sizes: ["8", "9", "10", "11", "12"], bestseller: true, images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"], date: Date.now() },
    { name: "Carhartt Work Jacket", description: "Heavy-duty canvas work jacket", price: 129.99, category: "Men", subCategory: "Topwear", sizes: ["M", "L", "XL", "XXL"], bestseller: false, images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400"], date: Date.now() },
    { name: "Timberland Boots", description: "Waterproof leather work boots", price: 189.99, category: "Men", subCategory: "Footwear", sizes: ["8", "9", "10", "11", "12"], bestseller: true, images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400"], date: Date.now() },
    { name: "Champion Hoodie", description: "Classic pullover hoodie with logo", price: 54.99, category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false, images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"], date: Date.now() },

    // More Fashion - Women
    { name: "Allbirds Tree Runners", description: "Sustainable running shoes made from eucalyptus", price: 98.99, category: "Women", subCategory: "Footwear", sizes: ["6", "7", "8", "9", "10"], bestseller: true, images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400"], date: Date.now() },
    { name: "Patagonia Down Jacket", description: "Lightweight packable down jacket", price: 229.99, category: "Women", subCategory: "Topwear", sizes: ["XS", "S", "M", "L"], bestseller: false, images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"], date: Date.now() },
    { name: "Kate Spade Wallet", description: "Leather bifold wallet with card slots", price: 128.99, category: "Women", subCategory: "Accessories", sizes: ["Black", "Pink", "Beige"], bestseller: true, images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"], date: Date.now() },

    // More Books & Media
    { name: "The 7 Habits Book", description: "Stephen Covey's personal development classic", price: 15.99, category: "Books", subCategory: "Self Help", sizes: ["Paperback", "Hardcover"], bestseller: true, images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"], date: Date.now() },
    { name: "Rich Dad Poor Dad", description: "Robert Kiyosaki's financial education book", price: 13.99, category: "Books", subCategory: "Finance", sizes: ["Paperback", "Kindle"], bestseller: true, images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"], date: Date.now() },
    { name: "Marvel Movies Collection", description: "Complete MCU Phase 1-4 Blu-ray set", price: 199.99, category: "Books", subCategory: "Movies", sizes: ["Blu-ray", "4K"], bestseller: false, images: ["https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=400"], date: Date.now() },

    // More Sports & Outdoors
    { name: "Hydro Flask Water Bottle", description: "Insulated stainless steel water bottle", price: 44.99, category: "Sports", subCategory: "Outdoor", sizes: ["32oz", "40oz"], bestseller: true, images: ["https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=400"], date: Date.now() },
    { name: "Patagonia Backpack", description: "Durable hiking backpack with multiple compartments", price: 149.99, category: "Sports", subCategory: "Outdoor", sizes: ["25L", "35L"], bestseller: false, images: ["https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400"], date: Date.now() },
    { name: "Bowflex Dumbbells", description: "Adjustable weight dumbbells for home gym", price: 349.99, category: "Sports", subCategory: "Fitness", sizes: ["5-50 lbs", "5-90 lbs"], bestseller: true, images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"], date: Date.now() },

    // More Beauty & Personal Care
    { name: "Dyson Hair Dryer", description: "Professional ionic hair dryer with attachments", price: 429.99, category: "Beauty", subCategory: "Hair Care", sizes: ["Pink", "Purple", "Black"], bestseller: true, images: ["https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400"], date: Date.now() },
    { name: "The Ordinary Skincare Set", description: "Complete skincare routine starter kit", price: 89.99, category: "Beauty", subCategory: "Skincare", sizes: ["Starter Kit"], bestseller: false, images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400"], date: Date.now() },
    { name: "Urban Decay Eyeshadow", description: "Naked palette with 12 versatile shades", price: 54.99, category: "Beauty", subCategory: "Makeup", sizes: ["Naked 1", "Naked 2"], bestseller: true, images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"], date: Date.now() },

    // More Automotive
    { name: "Bosch Wiper Blades", description: "All-weather windshield wiper blades", price: 29.99, category: "Automotive", subCategory: "Parts", sizes: ["22 inch", "24 inch"], bestseller: false, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"], date: Date.now() },
    { name: "Chemical Guys Car Wash", description: "Premium car wash soap and wax kit", price: 39.99, category: "Automotive", subCategory: "Care", sizes: ["16oz", "64oz"], bestseller: true, images: ["https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400"], date: Date.now() },

    // More Pet Supplies
    { name: "Purina Pro Plan Dog Food", description: "High-protein dry dog food for active dogs", price: 67.99, category: "Pets", subCategory: "Dog Food", sizes: ["18lb", "35lb"], bestseller: true, images: ["https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400"], date: Date.now() },
    { name: "Cat Scratching Post", description: "Multi-level cat tree with scratching posts", price: 89.99, category: "Pets", subCategory: "Cat Toys", sizes: ["Medium", "Large"], bestseller: false, images: ["https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400"], date: Date.now() },

    // More Baby & Kids
    { name: "Graco Car Seat", description: "Convertible car seat for infants and toddlers", price: 199.99, category: "Baby", subCategory: "Safety", sizes: ["Standard"], bestseller: true, images: ["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400"], date: Date.now() },
    { name: "Baby Einstein Toys", description: "Educational activity table for babies", price: 79.99, category: "Baby", subCategory: "Toys", sizes: ["Standard"], bestseller: false, images: ["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400"], date: Date.now() },

    // More Toys & Games
    { name: "Nintendo Switch Games", description: "Super Mario Odyssey adventure game", price: 49.99, category: "Toys", subCategory: "Video Games", sizes: ["Standard"], bestseller: true, images: ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400"], date: Date.now() },
    { name: "Barbie Dreamhouse", description: "3-story dollhouse with furniture and accessories", price: 199.99, category: "Toys", subCategory: "Dolls", sizes: ["Standard"], bestseller: false, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"], date: Date.now() },

    // More Health & Wellness
    { name: "Peloton Bike+", description: "Interactive exercise bike with live classes", price: 2495.99, category: "Health", subCategory: "Fitness", sizes: ["Standard"], bestseller: false, images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"], date: Date.now() },
    { name: "Optimum Nutrition Protein", description: "Gold Standard whey protein powder", price: 64.99, category: "Health", subCategory: "Supplements", sizes: ["2lb", "5lb"], bestseller: true, images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"], date: Date.now() },

    // More Office Supplies
    { name: "Standing Desk Converter", description: "Adjustable sit-stand desk converter", price: 299.99, category: "Office", subCategory: "Furniture", sizes: ["32 inch", "36 inch"], bestseller: false, images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"], date: Date.now() },
    { name: "Logitech Wireless Mouse", description: "Ergonomic wireless mouse with precision tracking", price: 79.99, category: "Office", subCategory: "Electronics", sizes: ["Black", "White"], bestseller: true, images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"], date: Date.now() },

    // More Garden & Outdoor
    { name: "Keter Storage Shed", description: "Weather-resistant outdoor storage shed", price: 899.99, category: "Garden", subCategory: "Storage", sizes: ["6x8 ft", "8x10 ft"], bestseller: false, images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400"], date: Date.now() },
    { name: "Scotts Lawn Fertilizer", description: "4-step lawn care program fertilizer", price: 49.99, category: "Garden", subCategory: "Plant Care", sizes: ["5000 sq ft", "15000 sq ft"], bestseller: true, images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400"], date: Date.now() },

    // More Music
    { name: "Fender Electric Guitar", description: "Stratocaster electric guitar with amplifier", price: 799.99, category: "Music", subCategory: "Guitars", sizes: ["Sunburst", "Black", "White"], bestseller: false, images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"], date: Date.now() },
    { name: "Roland Digital Piano", description: "88-key weighted digital piano", price: 1299.99, category: "Music", subCategory: "Keyboards", sizes: ["Black", "White"], bestseller: false, images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"], date: Date.now() },

    // More Grocery & Gourmet
    { name: "Starbucks Coffee Beans", description: "Premium whole bean coffee variety pack", price: 34.99, category: "Grocery", subCategory: "Beverages", sizes: ["12oz x 3", "12oz x 6"], bestseller: true, images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"], date: Date.now() },
    { name: "Ghirardelli Chocolate", description: "Premium dark chocolate squares assortment", price: 19.99, category: "Grocery", subCategory: "Snacks", sizes: ["15.77oz"], bestseller: false, images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"], date: Date.now() },

    // More Industrial & Scientific
    { name: "DeWalt Power Drill", description: "20V cordless drill with battery and charger", price: 149.99, category: "Industrial", subCategory: "Tools", sizes: ["Standard"], bestseller: true, images: ["https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400"], date: Date.now() },
    { name: "3M N95 Masks", description: "NIOSH-approved respirator masks", price: 24.99, category: "Industrial", subCategory: "Safety", sizes: ["20 pack", "50 pack"], bestseller: false, images: ["https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400"], date: Date.now() },

    // New Categories
    { name: "Vitamix Blender Pro", description: "Professional-grade high-speed blender", price: 549.99, category: "Appliances", subCategory: "Kitchen", sizes: ["64oz", "48oz"], bestseller: true, images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"], date: Date.now() },
    { name: "Ring Video Doorbell", description: "Smart doorbell with HD video and motion detection", price: 199.99, category: "Security", subCategory: "Smart Home", sizes: ["Wired", "Battery"], bestseller: true, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"], date: Date.now() },
    { name: "Tile Bluetooth Tracker", description: "Item finder for keys, wallet, and more", price: 24.99, category: "Electronics", subCategory: "Accessories", sizes: ["1 Pack", "4 Pack"], bestseller: false, images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"], date: Date.now() },
    { name: "Anker Power Bank", description: "Portable charger with fast charging technology", price: 49.99, category: "Electronics", subCategory: "Accessories", sizes: ["10000mAh", "20000mAh"], bestseller: true, images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"], date: Date.now() }
];

try {
    await productModel.insertMany(moreProducts);
    console.log(`✅ Successfully added ${moreProducts.length} more products`);
    
    const totalProducts = await productModel.countDocuments();
    console.log(`📦 Total products in database: ${totalProducts}`);
    
    const categories = await productModel.distinct('category');
    console.log(`🏷️ Categories: ${categories.join(', ')}`);
    
} catch (error) {
    console.error('❌ Error:', error.message);
} finally {
    mongoose.connection.close();
}