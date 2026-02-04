import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../../services/apiService'
import axios from '../../utils/axios'
import { toast } from 'react-toastify'
import { FiUser, FiMail, FiCalendar, FiShield, FiSlash, FiCheck } from 'react-icons/fi'

function AdminCustomers() {
    const navigate = useNavigate()
    const { userInfo: user } = useSelector((state) => state.auth)
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login')
            return
        }
        fetchCustomers()
    }, [user, navigate])

    const fetchCustomers = async () => {
        try {
            const data = await apiService.getCustomers()
            setCustomers(data.customers || data)
            setLoading(false)
        } catch (error) {
            toast.error('Failed to fetch customers')
            setLoading(false)
        }
    }

    const handleToggleBlock = async (customerId) => {
        try {
            await axios.put(`/api/admin/customers/${customerId}/block`)
            const updatedCustomers = customers.map(c => (c._id || c.id) === customerId ? { ...c, isBlocked: !c.isBlocked } : c)
            setCustomers(updatedCustomers)
            toast.success('Customer status updated')
        } catch (error) {
            toast.error('Failed to update customer status')
        }
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
                <div className="animate-pulse space-y-6">
                    <div className="h-12 bg-gray-100 rounded-2xl w-1/4"></div>
                    <div className="h-96 bg-gray-100 rounded-[3rem]"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
            <div className="mb-12">
                <h1 className="font-heading text-4xl font-black text-primary uppercase tracking-tighter">
                    Manage <span className="text-accent underline decoration-8 underline-offset-[-4px]">Customers</span>
                </h1>
                <p className="text-[10px] font-black text-muted uppercase tracking-widest mt-2">Customer Management — Registered Users</p>
            </div>

            <div className="bg-white rounded-[3rem] shadow-soft overflow-hidden border-2 border-gray-50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-6 text-[10px] font-black text-muted uppercase tracking-widest">Customer</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted uppercase tracking-widest">Email</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted uppercase tracking-widest">Registration Date</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted uppercase tracking-widest">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {customers.map((customer) => (
                                <tr key={customer._id || customer.id} className="group hover:bg-gray-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                                                {customer.firstName ? customer.firstName[0] : 'U'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-primary uppercase tracking-tight">{customer.firstName} {customer.lastName}</p>
                                                <p className="text-[8px] font-black text-muted uppercase tracking-widest mt-1">ID: #{String(customer.id).slice(-8)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-muted truncate max-w-[200px]">
                                            <FiMail size={14} />
                                            <span className="text-xs font-bold">{customer.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-muted">
                                            <FiCalendar size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{new Date(customer.createdAt).toLocaleDateString('en-IN')}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${customer.isBlocked
                                            ? 'bg-error/10 text-error'
                                            : 'bg-success/10 text-success'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${customer.isBlocked ? 'bg-error' : 'bg-success'} animate-pulse`} />
                                            {customer.isBlocked ? 'BLOCKED' : 'ACTIVE'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleToggleBlock(customer._id || customer.id)}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all shadow-soft active:scale-95 ${customer.isBlocked
                                                    ? 'bg-success text-white hover:bg-success-dark'
                                                    : 'bg-error text-white hover:bg-error-dark'
                                                    }`}
                                            >
                                                {customer.isBlocked ? (
                                                    <><FiCheck size={14} /> Unblock Customer</>
                                                ) : (
                                                    <><FiSlash size={14} /> Block Customer</>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminCustomers
