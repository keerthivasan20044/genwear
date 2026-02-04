import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../../services/apiService'
import axios from '../../utils/axios'
import { toast } from 'react-toastify'
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi'

function AdminProducts() {
    const navigate = useNavigate()
    const { userInfo: user } = useSelector((state) => state.auth)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'topwear',
        gender: 'men',
        images: [''],
        material: 'cotton',
        fit: 'regular',
        brand: 'GENWEAR',
        isNew: false
    })

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login')
            return
        }
        fetchProducts()
    }, [user, navigate])

    const fetchProducts = async () => {
        try {
            const { products: fetchedProducts } = await apiService.getProducts({ limit: 100, sort: 'newest' })
            setProducts(fetchedProducts)
            setLoading(false)
        } catch (error) {
            toast.error('Failed to fetch products')
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (editingProduct) {
                await axios.put(`/api/products/${editingProduct._id}`, formData)
                toast.success('Product updated successfully')
            } else {
                await axios.post('/api/products', formData)
                toast.success('Product created successfully')
            }

            setShowModal(false)
            setEditingProduct(null)
            resetForm()
            fetchProducts()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed')
        }
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price,
            stock: product.stock,
            category: product.category,
            gender: product.gender || 'men',
            images: product.images.length > 0 ? product.images : [''],
            material: product.material || 'cotton',
            fit: product.fit || 'regular',
            brand: product.brand || 'GENWEAR',
            isNew: product.isNew || false
        })
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return
        }

        try {
            await axios.delete(`/api/products/${id}`)
            toast.success('Product deleted successfully')
            fetchProducts()
        } catch (error) {
            toast.error('Failed to delete product')
        }
    }

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            category: 'topwear',
            gender: 'men',
            images: [''],
            material: 'cotton',
            fit: 'regular',
            brand: 'GENWEAR',
            isNew: false
        })
    }

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images]
        newImages[index] = value
        setFormData({ ...formData, images: newImages })
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
                <div className="animate-pulse space-y-4">
                    <div className="h-12 bg-gray-100 rounded-2xl w-1/4"></div>
                    <div className="h-64 bg-gray-100 rounded-[3rem]"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                    <h1 className="font-heading text-3xl font-black text-primary uppercase tracking-tighter">
                        Manage <span className="text-accent underline decoration-8 underline-offset-[-4px]">Products</span>
                    </h1>
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest mt-2">{products?.length || 0} Products Available</p>
                </div>
                <button
                    onClick={() => {
                        resetForm()
                        setEditingProduct(null)
                        setShowModal(true)
                    }}
                    className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-strong hover:bg-accent transition-all flex items-center gap-3 active:scale-95"
                >
                    <FiPlus size={18} /> Add New Product
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-[3rem] shadow-soft overflow-hidden border-2 border-gray-50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-6 text-[10px] font-black text-muted uppercase tracking-widest">Image</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted uppercase tracking-widest">Product Name</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted uppercase tracking-widest">Price</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted uppercase tracking-widest">Stock</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted uppercase tracking-widest">Category</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map((product) => (
                                <tr key={product._id || product.id} className="group hover:bg-gray-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-soft group-hover:scale-105 transition-transform duration-500">
                                            <img
                                                src={
                                                    Array.isArray(product.images)
                                                        ? product.images[0]
                                                        : (product.images?.thumbnail || product.images?.main || 'https://via.placeholder.com/400')
                                                }
                                                alt={product.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-primary uppercase tracking-tight">{product.name}</p>
                                        <p className="text-[8px] font-black text-muted uppercase tracking-widest mt-1">ID: #{String(product._id || product.id).slice(-8)}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black text-primary tracking-tighter">₹{product.price.toLocaleString('en-IN')}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${(product.stock || 0) < 10 ? 'bg-error/10 text-error' : 'bg-success/10 text-success'}`}>
                                            {product.stock || 0} UNITS
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">{product.category}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="w-10 h-10 bg-white border border-gray-100 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-soft"
                                            >
                                                <FiEdit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id || product.id)}
                                                className="w-10 h-10 bg-white border border-gray-100 text-error rounded-xl flex items-center justify-center hover:bg-error hover:text-white hover:border-error transition-all shadow-soft"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[3rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-12 shadow-strong animate-in relative">
                        <button
                            onClick={() => { setShowModal(false); setEditingProduct(null); resetForm(); }}
                            className="absolute top-8 right-8 text-muted hover:text-primary transition-colors"
                        >
                            <FiX size={24} />
                        </button>

                        <h2 className="font-heading text-3xl font-black text-primary uppercase tracking-tighter mb-8">
                            {editingProduct ? 'Update Product' : 'Add New Product'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Product Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:bg-white focus:border-accent outline-none transition-all"
                                    placeholder="Premium Cotton T-Shirt"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Product Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:bg-white focus:border-accent outline-none transition-all"
                                    rows="3"
                                    placeholder="Comfortable and stylish cotton fabric..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Price (₹) *</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:bg-white focus:border-accent outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Total Stock *</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:bg-white focus:border-accent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-black uppercase tracking-widest focus:bg-white focus:border-accent outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="topwear">Topwear</option>
                                        <option value="bottomwear">Bottomwear</option>
                                        <option value="outerwear">Outerwear</option>
                                        <option value="accessories">Accessories</option>
                                        <option value="footwear">Footwear</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Gender *</label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-black uppercase tracking-widest focus:bg-white focus:border-accent outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="kids">Kids</option>
                                        <option value="unisex">Unisex</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Material</label>
                                    <select
                                        value={formData.material}
                                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-black uppercase tracking-widest focus:bg-white focus:border-accent outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="cotton">Cotton</option>
                                        <option value="denim">Denim</option>
                                        <option value="fleece">Fleece</option>
                                        <option value="wool">Wool</option>
                                        <option value="polyester">Polyester</option>
                                        <option value="silk">Silk</option>
                                        <option value="blend">Blend</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Fit Type</label>
                                    <select
                                        value={formData.fit}
                                        onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-black uppercase tracking-widest focus:bg-white focus:border-accent outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="regular">Regular</option>
                                        <option value="slim">Slim</option>
                                        <option value="relaxed">Relaxed</option>
                                        <option value="oversized">Oversized</option>
                                        <option value="athletic">Athletic</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Image URL *</label>
                                <input
                                    type="url"
                                    required
                                    value={formData.images[0]}
                                    onChange={(e) => handleImageChange(0, e.target.value)}
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:bg-white focus:border-accent outline-none transition-all"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button
                                    type="submit"
                                    className="flex-[2] bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-strong hover:bg-accent transition-all active:scale-95"
                                >
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false)
                                        setEditingProduct(null)
                                        resetForm()
                                    }}
                                    className="flex-1 border-2 border-gray-100 text-muted py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProducts
