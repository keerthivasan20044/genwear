// Comprehensive Mock Products Database - 50+ Products with Real Images
export const mockProducts = [
    // ==================== MEN'S COLLECTION (15 Products) ====================

    // Men's Shirts
    {
        _id: 'men-shirt-1',
        name: 'Premium Cotton Oxford Shirt',
        slug: 'premium-cotton-oxford-shirt',
        price: 2499,
        originalPrice: 3999,
        category: 'men',
        subcategory: 'shirts',
        description: 'Classic Oxford shirt in premium cotton with perfect fit',
        images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800'],
        colors: ['White', 'Blue', 'Black', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 50,
        rating: 4.5,
        reviews: 128,
        isFeatured: true,
        tags: ['formal', 'cotton', 'premium', 'bestseller']
    },
    {
        _id: 'men-shirt-2',
        name: 'Casual Linen Shirt',
        slug: 'casual-linen-shirt',
        price: 1999,
        originalPrice: 3499,
        category: 'men',
        subcategory: 'shirts',
        description: 'Breathable linen shirt perfect for summer',
        images: ['https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800'],
        colors: ['Beige', 'White', 'Light Blue'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 40,
        rating: 4.3,
        reviews: 85,
        isFeatured: false,
        tags: ['casual', 'linen', 'summer']
    },

    // Men's Jeans & Pants
    {
        _id: 'men-jeans-1',
        name: 'Slim Fit Denim Jeans',
        slug: 'slim-fit-denim-jeans',
        price: 3499,
        originalPrice: 5999,
        category: 'men',
        subcategory: 'jeans',
        description: 'Modern slim fit jeans with stretch comfort',
        images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800', 'https://images.unsplash.com/photo-1475178626620-a4d3e0c3f719?w=800'],
        colors: ['Dark Blue', 'Light Blue', 'Black'],
        sizes: ['28', '30', '32', '34', '36'],
        stock: 75,
        rating: 4.7,
        reviews: 245,
        isFeatured: true,
        tags: ['casual', 'denim', 'stretch', 'bestseller']
    },
    {
        _id: 'men-pants-1',
        name: 'Formal Trousers',
        slug: 'formal-trousers',
        price: 2999,
        originalPrice: 4999,
        category: 'men',
        subcategory: 'pants',
        description: 'Classic formal trousers for office wear',
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80'],
        colors: ['Black', 'Navy', 'Gray', 'Charcoal'],
        sizes: ['28', '30', '32', '34', '36'],
        stock: 60,
        rating: 4.4,
        reviews: 156,
        isFeatured: false,
        tags: ['formal', 'office', 'trousers']
    },
    {
        _id: 'men-jeans-2',
        name: 'Relaxed Fit Cargo Jeans',
        slug: 'relaxed-fit-cargo-jeans',
        price: 3999,
        originalPrice: 6499,
        category: 'men',
        subcategory: 'jeans',
        description: 'Comfortable cargo jeans with multiple pockets',
        images: ['https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800'],
        colors: ['Khaki', 'Olive', 'Black'],
        sizes: ['30', '32', '34', '36', '38'],
        stock: 45,
        rating: 4.6,
        reviews: 98,
        isFeatured: false,
        tags: ['casual', 'cargo', 'comfortable']
    },

    // Men's Jackets & Outerwear
    {
        _id: 'men-jacket-1',
        name: 'Premium Leather Jacket',
        slug: 'premium-leather-jacket',
        price: 12999,
        originalPrice: 18999,
        category: 'men',
        subcategory: 'jackets',
        description: 'Genuine leather jacket with premium finish',
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800'],
        colors: ['Black', 'Brown'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 25,
        rating: 4.9,
        reviews: 89,
        isFeatured: true,
        tags: ['leather', 'premium', 'winter', 'luxury']
    },
    {
        _id: 'men-jacket-2',
        name: 'Bomber Jacket',
        slug: 'bomber-jacket',
        price: 4999,
        originalPrice: 7999,
        category: 'men',
        subcategory: 'jackets',
        description: 'Classic bomber jacket for casual style',
        images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'],
        colors: ['Navy', 'Olive', 'Black'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 35,
        rating: 4.5,
        reviews: 67,
        isFeatured: false,
        tags: ['casual', 'bomber', 'streetwear']
    },
    {
        _id: 'men-blazer-1',
        name: 'Formal Blazer',
        slug: 'formal-blazer',
        price: 8999,
        originalPrice: 14999,
        category: 'men',
        subcategory: 'jackets',
        description: 'Tailored fit blazer for professional occasions',
        images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800'],
        colors: ['Navy', 'Charcoal', 'Black'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 30,
        rating: 4.6,
        reviews: 67,
        isFeatured: true,
        tags: ['formal', 'blazer', 'professional']
    },

    // Men's T-Shirts
    {
        _id: 'men-tshirt-1',
        name: 'Cotton Polo T-Shirt',
        slug: 'cotton-polo-tshirt',
        price: 1299,
        originalPrice: 1999,
        category: 'men',
        subcategory: 'tshirts',
        description: 'Comfortable cotton polo for everyday wear',
        images: ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800'],
        colors: ['Navy', 'White', 'Gray', 'Black', 'Red'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 100,
        rating: 4.3,
        reviews: 312,
        isFeatured: false,
        tags: ['casual', 'cotton', 'polo', 'everyday']
    },
    {
        _id: 'men-tshirt-2',
        name: 'Round Neck T-Shirt',
        slug: 'round-neck-tshirt',
        price: 799,
        originalPrice: 1299,
        category: 'men',
        subcategory: 'tshirts',
        description: 'Basic round neck t-shirt in premium cotton',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
        colors: ['White', 'Black', 'Gray', 'Navy', 'Maroon'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 120,
        rating: 4.4,
        reviews: 456,
        isFeatured: false,
        tags: ['basic', 'cotton', 'casual', 'bestseller']
    },
    {
        _id: 'men-tshirt-3',
        name: 'V-Neck T-Shirt',
        slug: 'vneck-tshirt',
        price: 899,
        originalPrice: 1499,
        category: 'men',
        subcategory: 'tshirts',
        description: 'Stylish V-neck t-shirt for casual wear',
        images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800'],
        colors: ['Black', 'White', 'Navy', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 80,
        rating: 4.2,
        reviews: 234,
        isFeatured: false,
        tags: ['casual', 'vneck', 'basic']
    },

    // Men's Activewear
    {
        _id: 'men-active-1',
        name: 'Sports Track Pants',
        slug: 'sports-track-pants',
        price: 1999,
        originalPrice: 3499,
        category: 'men',
        subcategory: 'activewear',
        description: 'Comfortable track pants for sports and casual wear',
        images: ['https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800'],
        colors: ['Black', 'Navy', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 70,
        rating: 4.5,
        reviews: 189,
        isFeatured: false,
        tags: ['sports', 'activewear', 'comfortable']
    },
    {
        _id: 'men-active-2',
        name: 'Performance Running Shorts',
        slug: 'performance-running-shorts',
        price: 1499,
        originalPrice: 2499,
        category: 'men',
        subcategory: 'activewear',
        description: 'Lightweight shorts for running and workouts',
        images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'],
        colors: ['Black', 'Navy', 'Red', 'Blue'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 55,
        rating: 4.6,
        reviews: 145,
        isFeatured: false,
        tags: ['running', 'gym', 'performance']
    },

    // Men's Sweaters
    {
        _id: 'men-sweater-1',
        name: 'Wool Pullover Sweater',
        slug: 'wool-pullover-sweater',
        price: 3999,
        originalPrice: 6999,
        category: 'men',
        subcategory: 'sweaters',
        description: 'Warm wool sweater for winter',
        images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800'],
        colors: ['Navy', 'Gray', 'Black', 'Burgundy'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 40,
        rating: 4.7,
        reviews: 112,
        isFeatured: true,
        tags: ['winter', 'wool', 'warm']
    },
    {
        _id: 'men-sweater-2',
        name: 'Cardigan Sweater',
        slug: 'cardigan-sweater',
        price: 3499,
        originalPrice: 5999,
        category: 'men',
        subcategory: 'sweaters',
        description: 'Classic cardigan for layering',
        images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800'],
        colors: ['Gray', 'Navy', 'Black'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 35,
        rating: 4.5,
        reviews: 98,
        isFeatured: false,
        tags: ['cardigan', 'layering', 'classic']
    },

    // ==================== WOMEN'S COLLECTION (15 Products) ====================

    // Women's Dresses
    {
        _id: 'women-dress-1',
        name: 'Floral Summer Dress',
        slug: 'floral-summer-dress',
        price: 3999,
        originalPrice: 6999,
        category: 'women',
        subcategory: 'dresses',
        description: 'Beautiful floral print dress perfect for summer',
        images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'],
        colors: ['Floral Blue', 'Floral Pink', 'Floral Yellow'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 60,
        rating: 4.8,
        reviews: 189,
        isFeatured: true,
        tags: ['summer', 'floral', 'casual', 'bestseller']
    },
    {
        _id: 'women-dress-2',
        name: 'Elegant Evening Gown',
        slug: 'elegant-evening-gown',
        price: 9999,
        originalPrice: 15999,
        category: 'women',
        subcategory: 'dresses',
        description: 'Stunning evening gown for special occasions',
        images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800'],
        colors: ['Black', 'Navy', 'Burgundy', 'Red'],
        sizes: ['XS', 'S', 'M', 'L'],
        stock: 20,
        rating: 4.9,
        reviews: 78,
        isFeatured: true,
        tags: ['evening', 'formal', 'elegant', 'luxury']
    },
    {
        _id: 'women-dress-3',
        name: 'Casual Midi Dress',
        slug: 'casual-midi-dress',
        price: 2999,
        originalPrice: 4999,
        category: 'women',
        subcategory: 'dresses',
        description: 'Comfortable midi dress for everyday wear',
        images: ['https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800'],
        colors: ['Black', 'Navy', 'Beige', 'Green'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 50,
        rating: 4.6,
        reviews: 167,
        isFeatured: false,
        tags: ['casual', 'midi', 'comfortable']
    },
    {
        _id: 'women-dress-4',
        name: 'Maxi Dress',
        slug: 'maxi-dress',
        price: 4499,
        originalPrice: 7999,
        category: 'women',
        subcategory: 'dresses',
        description: 'Flowing maxi dress for elegant look',
        images: ['https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=800'],
        colors: ['White', 'Black', 'Red', 'Blue'],
        sizes: ['XS', 'S', 'M', 'L'],
        stock: 40,
        rating: 4.7,
        reviews: 134,
        isFeatured: false,
        tags: ['maxi', 'elegant', 'flowing']
    },

    // Women's Tops & Blouses
    {
        _id: 'women-top-1',
        name: 'Premium Silk Blouse',
        slug: 'premium-silk-blouse',
        price: 3499,
        originalPrice: 5999,
        category: 'women',
        subcategory: 'tops',
        description: 'Luxurious silk blouse for sophisticated style',
        images: ['https://images.unsplash.com/photo-1564257631407-8dea18e77f27?w=800'],
        colors: ['White', 'Cream', 'Black', 'Pink'],
        sizes: ['XS', 'S', 'M', 'L'],
        stock: 35,
        rating: 4.7,
        reviews: 92,
        isFeatured: true,
        tags: ['silk', 'premium', 'formal', 'luxury']
    },
    {
        _id: 'women-top-2',
        name: 'Casual Cotton Top',
        slug: 'casual-cotton-top',
        price: 1499,
        originalPrice: 2499,
        category: 'women',
        subcategory: 'tops',
        description: 'Comfortable cotton top for everyday wear',
        images: ['https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800'],
        colors: ['White', 'Black', 'Blue', 'Pink', 'Gray'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 80,
        rating: 4.4,
        reviews: 234,
        isFeatured: false,
        tags: ['casual', 'cotton', 'comfortable', 'everyday']
    },
    {
        _id: 'women-top-3',
        name: 'Tank Top',
        slug: 'tank-top',
        price: 899,
        originalPrice: 1499,
        category: 'women',
        subcategory: 'tops',
        description: 'Basic tank top for summer',
        images: ['https://images.unsplash.com/photo-1627225793904-3a9b596784a2?w=800'],
        colors: ['White', 'Black', 'Gray', 'Pink', 'Blue'],
        sizes: ['XS', 'S', 'M', 'L'],
        stock: 100,
        rating: 4.3,
        reviews: 456,
        isFeatured: false,
        tags: ['basic', 'summer', 'tank']
    },

    // Women's Pants & Jeans
    {
        _id: 'women-pants-1',
        name: 'High-Waist Trousers',
        slug: 'high-waist-trousers',
        price: 2999,
        originalPrice: 4999,
        category: 'women',
        subcategory: 'pants',
        description: 'Stylish high-waist trousers for office wear',
        images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800'],
        colors: ['Black', 'Navy', 'Gray', 'Beige'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 55,
        rating: 4.5,
        reviews: 134,
        isFeatured: false,
        tags: ['formal', 'office', 'trousers', 'professional']
    },
    {
        _id: 'women-jeans-1',
        name: 'Skinny Fit Jeans',
        slug: 'skinny-fit-jeans',
        price: 3299,
        originalPrice: 5499,
        category: 'women',
        subcategory: 'jeans',
        description: 'Comfortable skinny fit jeans',
        images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800'],
        colors: ['Dark Blue', 'Light Blue', 'Black'],
        sizes: ['24', '26', '28', '30', '32'],
        stock: 70,
        rating: 4.6,
        reviews: 289,
        isFeatured: true,
        tags: ['denim', 'skinny', 'casual', 'bestseller']
    },
    {
        _id: 'women-jeans-2',
        name: 'Mom Fit Jeans',
        slug: 'mom-fit-jeans',
        price: 3499,
        originalPrice: 5999,
        category: 'women',
        subcategory: 'jeans',
        description: 'Trendy mom fit jeans',
        images: ['https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800'],
        colors: ['Light Blue', 'Dark Blue', 'Black'],
        sizes: ['24', '26', '28', '30', '32'],
        stock: 60,
        rating: 4.7,
        reviews: 178,
        isFeatured: false,
        tags: ['denim', 'mom-fit', 'trendy']
    },

    // Women's Jackets
    {
        _id: 'women-jacket-1',
        name: 'Denim Jacket',
        slug: 'denim-jacket',
        price: 4499,
        originalPrice: 7999,
        category: 'women',
        subcategory: 'jackets',
        description: 'Classic denim jacket with modern fit',
        images: ['https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800'],
        colors: ['Light Blue', 'Dark Blue', 'Black'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 45,
        rating: 4.6,
        reviews: 156,
        isFeatured: true,
        tags: ['denim', 'casual', 'jacket', 'classic']
    },
    {
        _id: 'women-jacket-2',
        name: 'Leather Jacket',
        slug: 'leather-jacket',
        price: 11999,
        originalPrice: 17999,
        category: 'women',
        subcategory: 'jackets',
        description: 'Premium leather jacket for bold style',
        images: ['https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800'],
        colors: ['Black', 'Brown'],
        sizes: ['XS', 'S', 'M', 'L'],
        stock: 25,
        rating: 4.8,
        reviews: 87,
        isFeatured: true,
        tags: ['leather', 'premium', 'bold', 'luxury']
    },

    // Women's Activewear
    {
        _id: 'women-active-1',
        name: 'Yoga Leggings',
        slug: 'yoga-leggings',
        price: 1999,
        originalPrice: 3499,
        category: 'women',
        subcategory: 'activewear',
        description: 'High-waist yoga leggings for comfort',
        images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800'],
        colors: ['Black', 'Navy', 'Gray', 'Purple'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 90,
        rating: 4.7,
        reviews: 345,
        isFeatured: false,
        tags: ['yoga', 'leggings', 'activewear', 'bestseller']
    },
    {
        _id: 'women-active-2',
        name: 'Sports Bra',
        slug: 'sports-bra',
        price: 1299,
        originalPrice: 2299,
        category: 'women',
        subcategory: 'activewear',
        description: 'Supportive sports bra for workouts',
        images: ['https://images.unsplash.com/photo-1579364046732-8298eb2f41c5?w=800'],
        colors: ['Black', 'White', 'Pink', 'Blue'],
        sizes: ['XS', 'S', 'M', 'L'],
        stock: 75,
        rating: 4.6,
        reviews: 267,
        isFeatured: false,
        tags: ['sports', 'bra', 'workout', 'fitness']
    },

    // ==================== KIDS' COLLECTION (10 Products) ====================

    {
        _id: 'kids-tshirt-1',
        name: 'Cartoon Print T-Shirt',
        slug: 'cartoon-print-tshirt',
        price: 799,
        originalPrice: 1299,
        category: 'kids',
        subcategory: 'tshirts',
        description: 'Fun cartoon print t-shirt for active kids',
        images: ['https://images.unsplash.com/photo-1519702281088-213224ebf283?w=800'],
        colors: ['Red', 'Blue', 'Green', 'Yellow'],
        sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
        stock: 80,
        rating: 4.4,
        reviews: 215,
        isFeatured: true,
        tags: ['kids', 'casual', 'cartoon', 'fun']
    },
    {
        _id: 'kids-pants-1',
        name: 'Denim Dungarees',
        slug: 'denim-dungarees',
        price: 1499,
        originalPrice: 2499,
        category: 'kids',
        subcategory: 'pants',
        description: 'Comfortable denim dungarees for playtime',
        images: ['https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800'],
        colors: ['Blue Denim', 'Black Denim'],
        sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
        stock: 50,
        rating: 4.6,
        reviews: 98,
        isFeatured: true,
        tags: ['kids', 'denim', 'playful', 'comfortable']
    },
    {
        _id: 'kids-jacket-1',
        name: 'Winter Puffer Jacket',
        slug: 'winter-puffer-jacket',
        price: 2999,
        originalPrice: 4999,
        category: 'kids',
        subcategory: 'jackets',
        description: 'Warm puffer jacket for cold weather',
        images: ['https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800'],
        colors: ['Navy', 'Red', 'Pink', 'Black'],
        sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
        stock: 40,
        rating: 4.8,
        reviews: 145,
        isFeatured: false,
        tags: ['kids', 'winter', 'jacket', 'warm']
    },
    {
        _id: 'kids-set-1',
        name: 'School Uniform Set',
        slug: 'school-uniform-set',
        price: 1999,
        originalPrice: 3499,
        category: 'kids',
        subcategory: 'sets',
        description: 'Complete school uniform set',
        images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800'],
        colors: ['Navy Blue', 'Black'],
        sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
        stock: 65,
        rating: 4.3,
        reviews: 178,
        isFeatured: false,
        tags: ['kids', 'school', 'uniform', 'formal']
    },
    {
        _id: 'kids-dress-1',
        name: 'Floral Party Dress',
        slug: 'floral-party-dress',
        price: 2499,
        originalPrice: 3999,
        category: 'kids',
        subcategory: 'dresses',
        description: 'Beautiful dress for special occasions',
        images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800'],
        colors: ['Pink', 'Blue', 'White'],
        sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
        stock: 35,
        rating: 4.7,
        reviews: 89,
        isFeatured: true,
        tags: ['kids', 'dress', 'party', 'formal']
    },
    {
        _id: 'kids-shorts-1',
        name: 'Cotton Shorts',
        slug: 'cotton-shorts',
        price: 699,
        originalPrice: 1199,
        category: 'kids',
        subcategory: 'shorts',
        description: 'Comfortable cotton shorts for summer',
        images: ['https://images.unsplash.com/photo-1519457431-7571350bc89a?w=800'],
        colors: ['Navy', 'Black', 'Gray', 'Khaki'],
        sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
        stock: 90,
        rating: 4.5,
        reviews: 234,
        isFeatured: false,
        tags: ['kids', 'shorts', 'summer', 'casual']
    },
    {
        _id: 'kids-hoodie-1',
        name: 'Kids Hoodie',
        slug: 'kids-hoodie',
        price: 1799,
        originalPrice: 2999,
        category: 'kids',
        subcategory: 'hoodies',
        description: 'Cozy hoodie for chilly days',
        images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800'],
        colors: ['Gray', 'Navy', 'Red', 'Black'],
        sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
        stock: 55,
        rating: 4.6,
        reviews: 167,
        isFeatured: false,
        tags: ['kids', 'hoodie', 'cozy', 'casual']
    },
    {
        _id: 'kids-tracksuit-1',
        name: 'Sports Tracksuit',
        slug: 'sports-tracksuit',
        price: 2499,
        originalPrice: 3999,
        category: 'kids',
        subcategory: 'sets',
        description: 'Complete tracksuit for active kids',
        images: ['https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800'],
        colors: ['Navy', 'Black', 'Red'],
        sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
        stock: 45,
        rating: 4.5,
        reviews: 123,
        isFeatured: false,
        tags: ['kids', 'sports', 'tracksuit', 'active']
    },
    {
        _id: 'kids-sweater-1',
        name: 'Knit Sweater',
        slug: 'knit-sweater',
        price: 1999,
        originalPrice: 3499,
        category: 'kids',
        subcategory: 'sweaters',
        description: 'Warm knit sweater for winter',
        images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800'],
        colors: ['Red', 'Navy', 'Gray'],
        sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
        stock: 40,
        rating: 4.4,
        reviews: 95,
        isFeatured: false,
        tags: ['kids', 'sweater', 'knit', 'winter']
    },
    {
        _id: 'kids-shirt-1',
        name: 'Formal Shirt',
        slug: 'formal-shirt',
        price: 1299,
        originalPrice: 2199,
        category: 'kids',
        subcategory: 'shirts',
        description: 'Formal shirt for special occasions',
        images: ['https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800'],
        colors: ['White', 'Blue', 'Black'],
        sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
        stock: 50,
        rating: 4.3,
        reviews: 78,
        isFeatured: false,
        tags: ['kids', 'formal', 'shirt', 'occasion']
    },

    // ==================== ACCESSORIES (12 Products) ====================

    {
        _id: 'acc-wallet-1',
        name: 'Leather Wallet',
        slug: 'leather-wallet',
        price: 1499,
        originalPrice: 2999,
        category: 'accessories',
        subcategory: 'wallets',
        description: 'Premium leather wallet with multiple card slots',
        images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800'],
        colors: ['Black', 'Brown', 'Tan'],
        sizes: ['Standard'],
        stock: 90,
        rating: 4.7,
        reviews: 267,
        isFeatured: true,
        tags: ['accessories', 'leather', 'wallet', 'premium']
    },
    {
        _id: 'acc-sunglasses-1',
        name: 'Designer Sunglasses',
        slug: 'designer-sunglasses',
        price: 2999,
        originalPrice: 5999,
        category: 'accessories',
        subcategory: 'eyewear',
        description: 'Stylish UV protection sunglasses',
        images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800'],
        colors: ['Black', 'Tortoise', 'Gold'],
        sizes: ['Standard'],
        stock: 45,
        rating: 4.6,
        reviews: 123,
        isFeatured: true,
        tags: ['accessories', 'sunglasses', 'fashion', 'UV']
    },
    {
        _id: 'acc-backpack-1',
        name: 'Canvas Backpack',
        slug: 'canvas-backpack',
        price: 3499,
        originalPrice: 5999,
        category: 'accessories',
        subcategory: 'bags',
        description: 'Durable canvas backpack for daily use',
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
        colors: ['Khaki', 'Navy', 'Black', 'Gray'],
        sizes: ['Standard'],
        stock: 70,
        rating: 4.8,
        reviews: 198,
        isFeatured: true,
        tags: ['accessories', 'backpack', 'canvas', 'daily']
    },
    {
        _id: 'acc-belt-1',
        name: 'Leather Belt',
        slug: 'leather-belt',
        price: 999,
        originalPrice: 1999,
        category: 'accessories',
        subcategory: 'belts',
        description: 'Classic leather belt with metal buckle',
        images: ['https://images.unsplash.com/photo-1624222247344-550fb60583aa?w=800'],
        colors: ['Black', 'Brown'],
        sizes: ['28', '30', '32', '34', '36'],
        stock: 85,
        rating: 4.4,
        reviews: 145,
        isFeatured: false,
        tags: ['accessories', 'belt', 'leather', 'classic']
    },
    {
        _id: 'acc-watch-1',
        name: 'Smart Watch',
        slug: 'smart-watch',
        price: 8999,
        originalPrice: 14999,
        category: 'accessories',
        subcategory: 'watches',
        description: 'Advanced fitness and smart watch',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
        colors: ['Black', 'Silver', 'Rose Gold'],
        sizes: ['Standard'],
        stock: 30,
        rating: 4.9,
        reviews: 342,
        isFeatured: true,
        tags: ['accessories', 'watch', 'tech', 'fitness']
    },
    {
        _id: 'acc-cap-1',
        name: 'Baseball Cap',
        slug: 'baseball-cap',
        price: 899,
        originalPrice: 1499,
        category: 'accessories',
        subcategory: 'caps',
        description: 'Classic baseball cap for casual wear',
        images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'],
        colors: ['Black', 'Navy', 'White', 'Red'],
        sizes: ['Standard'],
        stock: 100,
        rating: 4.5,
        reviews: 234,
        isFeatured: false,
        tags: ['accessories', 'cap', 'casual', 'baseball']
    },
    {
        _id: 'acc-scarf-1',
        name: 'Wool Scarf',
        slug: 'wool-scarf',
        price: 1499,
        originalPrice: 2499,
        category: 'accessories',
        subcategory: 'scarves',
        description: 'Warm wool scarf for winter',
        images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800'],
        colors: ['Red', 'Navy', 'Gray', 'Black'],
        sizes: ['Standard'],
        stock: 60,
        rating: 4.6,
        reviews: 156,
        isFeatured: false,
        tags: ['accessories', 'scarf', 'wool', 'winter']
    },
    {
        _id: 'acc-gloves-1',
        name: 'Leather Gloves',
        slug: 'leather-gloves',
        price: 1999,
        originalPrice: 3499,
        category: 'accessories',
        subcategory: 'gloves',
        description: 'Premium leather gloves for winter',
        images: ['https://images.unsplash.com/photo-1596522354195-e84ae3c98731?w=800'],
        colors: ['Black', 'Brown'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 45,
        rating: 4.7,
        reviews: 89,
        isFeatured: false,
        tags: ['accessories', 'gloves', 'leather', 'winter']
    },
    {
        _id: 'acc-tie-1',
        name: 'Silk Tie',
        slug: 'silk-tie',
        price: 1299,
        originalPrice: 2299,
        category: 'accessories',
        subcategory: 'ties',
        description: 'Premium silk tie for formal occasions',
        images: ['https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800'],
        colors: ['Navy', 'Black', 'Red', 'Blue'],
        sizes: ['Standard'],
        stock: 70,
        rating: 4.5,
        reviews: 112,
        isFeatured: false,
        tags: ['accessories', 'tie', 'silk', 'formal']
    },
    {
        _id: 'acc-handbag-1',
        name: 'Leather Handbag',
        slug: 'leather-handbag',
        price: 5999,
        originalPrice: 9999,
        category: 'accessories',
        subcategory: 'bags',
        description: 'Elegant leather handbag',
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800'],
        colors: ['Black', 'Brown', 'Tan', 'Red'],
        sizes: ['Standard'],
        stock: 35,
        rating: 4.8,
        reviews: 178,
        isFeatured: true,
        tags: ['accessories', 'handbag', 'leather', 'elegant']
    },
    {
        _id: 'acc-socks-1',
        name: 'Cotton Socks Pack',
        slug: 'cotton-socks-pack',
        price: 599,
        originalPrice: 999,
        category: 'accessories',
        subcategory: 'socks',
        description: 'Pack of 3 comfortable cotton socks',
        images: ['https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800'],
        colors: ['Multi', 'Black', 'White'],
        sizes: ['M', 'L'],
        stock: 150,
        rating: 4.4,
        reviews: 567,
        isFeatured: false,
        tags: ['accessories', 'socks', 'cotton', 'pack']
    },
    {
        _id: 'acc-jewelry-1',
        name: 'Statement Necklace',
        slug: 'statement-necklace',
        price: 2499,
        originalPrice: 4499,
        category: 'accessories',
        subcategory: 'jewelry',
        description: 'Bold statement necklace for special occasions',
        images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'],
        colors: ['Gold', 'Silver'],
        sizes: ['Standard'],
        stock: 25,
        rating: 4.7,
        reviews: 89,
        isFeatured: true,
        tags: ['accessories', 'jewelry', 'necklace', 'statement']
    }
];

// Filter helper functions
export const filterProducts = (products, filters) => {
    let filtered = [...products];

    if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.subcategory) {
        filtered = filtered.filter(p => p.subcategory === filters.subcategory);
    }

    if (filters.priceRange) {
        filtered = filtered.filter(p =>
            p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
        );
    }

    if (filters.colors && filters.colors.length > 0) {
        filtered = filtered.filter(p =>
            p.colors.some(color => {
                const colorName = typeof color === 'string' ? color : color.name;
                return filters.colors.includes(colorName);
            })
        );
    }

    if (filters.sizes && filters.sizes.length > 0) {
        filtered = filtered.filter(p =>
            p.sizes.some(size => {
                const sizeVal = typeof size === 'string' ? size : size.size;
                return filters.sizes.includes(sizeVal);
            })
        );
    }

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }

    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                // Keep original order (newest first)
                break;
            default:
                break;
        }
    }

    return filtered;
};

export const getCategories = () => {
    return [
        { value: 'all', label: 'All Products', icon: '🛍️' },
        { value: 'men', label: 'Men', icon: '👔' },
        { value: 'women', label: 'Women', icon: '👗' },
        { value: 'kids', label: 'Kids', icon: '👶' },
        { value: 'accessories', label: 'Accessories', icon: '👜' }
    ];
};

export const getSubcategories = (category) => {
    const subcategories = {
        men: ['shirts', 'jeans', 'pants', 'jackets', 'tshirts', 'activewear', 'sweaters'],
        women: ['dresses', 'tops', 'pants', 'jeans', 'jackets', 'activewear'],
        kids: ['tshirts', 'pants', 'jackets', 'sets', 'dresses', 'shorts', 'hoodies', 'sweaters', 'shirts'],
        accessories: ['wallets', 'eyewear', 'bags', 'belts', 'watches', 'caps', 'scarves', 'gloves', 'ties', 'socks', 'jewelry']
    };

    return subcategories[category] || [];
};
