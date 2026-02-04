import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Cart from '../models/Cart.js'
import Order from '../models/Order.js'
import connectDB from '../config/db.js'

dotenv.config()

const seedData = async () => {
    try {
        await connectDB()

        // Clear existing data
        await User.deleteMany({})
        await Product.deleteMany({})
        await Cart.deleteMany({})
        await Order.deleteMany({})

        console.log('🗑️  Existing data cleared')

        // Create Admin
        await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@genwear.com',
            password: 'Admin@123',
            role: 'admin',
            isVerified: true
        })

        // Create Demo User
        await User.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'User@123',
            role: 'customer',
            isVerified: true,
            addresses: [{
                addressLine: '123 Fashion St',
                city: 'Chennai',
                state: 'Tamil Nadu',
                pincode: '600001',
                isDefault: true
            }]
        })

        console.log('👤 Users created')

        const fashionImages = {
            men: {
                topwear: [
                    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
                    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
                    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990',
                    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
                    'https://images.unsplash.com/photo-1624227208531-e7276bb62f57'
                ],
                bottomwear: [
                    'https://images.unsplash.com/photo-1542272604-787c3835535d',
                    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
                    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80',
                    'https://images.unsplash.com/photo-1598554747436-c9293d6a588f',
                    'https://images.unsplash.com/photo-1624373666014-9426f0490f20'
                ],
                outerwear: [
                    'https://images.unsplash.com/photo-1551028719-00167b16eac5',
                    'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9',
                    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
                    'https://images.unsplash.com/photo-1543076659-9380cdf10613',
                    'https://images.unsplash.com/photo-1591047139264-9430c6a655ad'
                ]
            },
            women: {
                topwear: [
                    'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f',
                    'https://images.unsplash.com/photo-1591369822096-ffd140ec948f',
                    'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6',
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
                    'https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f'
                ],
                bottomwear: [
                    'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec',
                    'https://images.unsplash.com/photo-1582418702059-97ebafb35d09',
                    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b',
                    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8',
                    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1'
                ],
                outerwear: [
                    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
                    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3',
                    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
                    'https://images.unsplash.com/photo-1548142813-c348350df52b',
                    'https://images.unsplash.com/photo-1510480628532-559f6bc06ce5'
                ]
            },
            footwear: [
                'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
                'https://images.unsplash.com/photo-1608256246200-53e635b5b65f',
                'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
                'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
                'https://images.unsplash.com/photo-1549298916-b41d501d3772'
            ],
            accessories: [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
                'https://images.unsplash.com/photo-1591076482161-42ce6da69f67',
                'https://images.unsplash.com/photo-1624222247344-550fb8ecf7c2',
                'https://images.unsplash.com/photo-1618354691792-d1d42acfd860',
                'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500'
            ]
        }

        const generateImages = (baseArr, index = 0) => {
            const mainImg = baseArr[index % baseArr.length]
            const gallery = baseArr.map((url, i) => ({
                url: `${url}?w=1200&q=80`,
                alt: 'Product View',
                type: ['front', 'back', 'side', 'detail', 'model'][i % 5]
            }))
            return {
                thumbnail: `${mainImg}?w=400&q=80`,
                main: `${mainImg}?w=1200&q=80`,
                gallery
            }
        }

        const products = []

        // Create 20 Men's Products
        const menBrands = ['Urban Threads', 'Modern Fit', 'Street Style', 'GENWEAR']
        const menMaterials = ['cotton', 'denim', 'fleece', 'wool', 'polyester']
        const menFits = ['slim', 'regular', 'relaxed', 'athletic']

        for (let i = 1; i <= 20; i++) {
            const cat = i <= 8 ? 'topwear' : (i <= 14 ? 'bottomwear' : 'outerwear')
            const name = `${menBrands[i % 4]} Men's ${cat === 'topwear' ? 'Shirt' : (cat === 'bottomwear' ? 'Trouser' : 'Jacket')} Vol. ${i}`
            products.push({
                name,
                slug: name.toLowerCase().replace(/ /g, '-').replace(/'/g, '') + '-' + i,
                sku: `MEN-${cat.slice(0, 3).toUpperCase()}-${i}`,
                description: `High-quality ${cat} for men. Made from premium ${menMaterials[i % 5]} for ultimate comfort and style.`,
                price: 500 + (i * 150),
                originalPrice: 800 + (i * 200),
                discount: 20,
                stock: 50,
                images: generateImages(fashionImages.men[cat] || fashionImages.men.topwear, i),
                category: cat,
                gender: 'men',
                colors: [{ name: 'Black', hex: '#000000' }],
                sizes: [{ size: 'M', stock: 10 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 10 }],
                material: menMaterials[i % 5],
                fit: menFits[i % 4],
                brand: menBrands[i % 4],
                rating: { average: 4 + (Math.random() * 1), count: 10 + Math.floor(Math.random() * 50) },
                tags: ['men', cat, 'new-arrival'],
                isNew: i > 10
            })
        }

        // Create 20 Women's Products
        const womenBrands = ['ChicStyle', 'Modern Fit', 'Beach Breeze', 'GENWEAR']
        const womenMaterials = ['silk', 'linen', 'viscose', 'cotton', 'denim']

        for (let i = 1; i <= 20; i++) {
            const cat = i <= 8 ? 'topwear' : (i <= 14 ? 'bottomwear' : 'outerwear')
            const name = `${womenBrands[i % 4]} Women's ${cat === 'topwear' ? 'Blouse' : (cat === 'bottomwear' ? 'Skirt' : 'Coat')} Vol. ${i}`
            products.push({
                name,
                slug: name.toLowerCase().replace(/ /g, '-').replace(/'/g, '') + '-' + (i + 50),
                sku: `WOM-${cat.slice(0, 3).toUpperCase()}-${i}`,
                description: `Elegant ${cat} for women. Crafted with ${womenMaterials[i % 5]} for a luxurious feel.`,
                price: 700 + (i * 120),
                originalPrice: 1000 + (i * 180),
                discount: 15,
                stock: 45,
                images: generateImages(fashionImages.women[cat] || fashionImages.women.topwear, i),
                category: cat,
                gender: 'women',
                colors: [{ name: 'Pink', hex: '#FFC0CB' }],
                sizes: [{ size: 'S', stock: 10 }, { size: 'M', stock: 15 }, { size: 'L', stock: 10 }],
                material: womenMaterials[i % 5],
                brand: womenBrands[i % 4],
                rating: { average: 4.2 + (Math.random() * 0.8), count: 20 + Math.floor(Math.random() * 100) },
                tags: ['women', cat, 'trendy'],
                isNew: i > 12
            })
        }

        // Footwear (10 Items)
        for (let i = 1; i <= 10; i++) {
            const gender = i <= 5 ? 'men' : 'women'
            const name = `GENWEAR ${gender === 'men' ? "Men's" : "Women's"} Signature Shoe ${i}`
            products.push({
                name,
                slug: name.toLowerCase().replace(/ /g, '-').replace(/'/g, '') + '-' + (i + 100),
                sku: `SHO-${gender.slice(0, 1).toUpperCase()}-${i}`,
                description: `Premium footwear designed for comfort and durability. Features an ergonomic sole for advanced support.`,
                price: 2500 + (i * 300),
                originalPrice: 3500 + (i * 400),
                discount: 10,
                stock: 30,
                images: generateImages(fashionImages.footwear, i),
                category: 'footwear',
                gender,
                colors: [{ name: 'White', hex: '#FFFFFF' }],
                sizes: [{ size: '8', stock: 5 }, { size: '9', stock: 5 }, { size: '10', stock: 5 }],
                brand: 'GENWEAR',
                rating: { average: 4.5 + (Math.random() * 0.5), count: 50 + i },
                tags: ['footwear', gender, 'shoes']
            })
        }

        // Accessories (10 Items)
        for (let i = 1; i <= 10; i++) {
            const name = `GENWEAR Premium Accessory ${i}`
            products.push({
                name,
                slug: name.toLowerCase().replace(/ /g, '-').replace(/'/g, '') + '-' + (i + 200),
                sku: `ACC-${i}`,
                description: `Exquisite accessories to complement your style. Crafted with precision and high-quality materials.`,
                price: 999 + (i * 200),
                originalPrice: 1500 + (i * 300),
                discount: 5,
                stock: 100,
                images: generateImages(fashionImages.accessories, i),
                category: 'accessories',
                gender: 'unisex',
                colors: [{ name: 'Black', hex: '#000000' }],
                sizes: [{ size: 'One Size', stock: 100 }],
                brand: 'GENWEAR',
                rating: { average: 4.6 + (Math.random() * 0.4), count: 30 + i },
                tags: ['accessories', 'unisex', 'style']
            })
        }

        await Product.insertMany(products)
        console.log(`📦 ${products.length} Products inserted`)
        console.log('\n🚀 Database seeded successfully!')
        process.exit()
    } catch (error) {
        console.error('❌ Seeding failed:', error)
        process.exit(1)
    }
}

seedData()
