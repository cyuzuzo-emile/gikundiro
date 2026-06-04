import React, { useState, useEffect } from 'react';
import { Package, Search, Eye, X } from 'lucide-react';
import { ordersAPI } from '../../services/api';

const statusColor = (s) => ({ pending: 'bg-yellow-100 text-yellow-800', processing: 'bg-blue-100 text-blue-800', shipped: 'bg-purple-100 text-purple-800', delivered: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800' }[s] || 'bg-gray-100 text-gray-800');
const paymentColor = (s) => ({ pending: 'bg-yellow-100 text-yellow-800', paid: 'bg-green-100 text-green-800', failed: 'bg-red-100 text-red-800' }[s] || 'bg-gray-100 text-gray-800');

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try { const res = await ordersAPI.getAll(); setOrders(res.data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const updateOrderStatus = async (id, status) => {
    try { await ordersAPI.updateStatus(id, status); fetchOrders(); setSelectedOrder(null); }
    catch (e) { console.error(e); }
  };

  const updatePaymentStatus = async (id, paymentStatus) => {
    try { await ordersAPI.updatePayment(id, paymentStatus); fetchOrders(); setSelectedOrder(null); }
    catch (e) { console.error(e); }
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer_email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch && (filterStatus === 'all' || o.status === filterStatus);
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div></div>;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900">Manage Orders</h1>
          <p className="text-gray-600 mt-1">View and manage customer orders</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search by order number, name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field-light pl-10" />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field-light md:w-48">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Order #</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Customer</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Total</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Payment</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.length === 0 ? (
                  <tr><td colSpan="7" className="px-6 py-12 text-center text-gray-500"><Package className="w-12 h-12 mx-auto mb-4 text-gray-300" /><p>No orders found</p></td></tr>
                ) : filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-primary">{order.order_number}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{order.customer_name}</p>
                      <p className="text-sm text-gray-500">{order.customer_email}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">RWF {order.subtotal?.toLocaleString()}</td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${paymentColor(order.payment_status)}`}>{order.payment_status}</span></td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(order.status)}`}>{order.status}</span></td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => setSelectedOrder(order)} className="text-primary hover:text-primary-light"><Eye className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-xl font-heading font-bold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-500">{selectedOrder.order_number}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                  <p><span className="font-medium">Name:</span> {selectedOrder.customer_name}</p>
                  <p><span className="font-medium">Email:</span> {selectedOrder.customer_email}</p>
                  <p><span className="font-medium">Phone:</span> {selectedOrder.customer_phone}</p>
                </div>
              </div>

              {selectedOrder.shipping_street && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p>{selectedOrder.shipping_street}</p>
                    <p>{selectedOrder.shipping_city}, {selectedOrder.shipping_province}</p>
                    <p>{selectedOrder.shipping_country}</p>
                  </div>
                </div>
              )}

              {selectedOrder.items?.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity} × RWF {item.price?.toLocaleString()}</p>
                        </div>
                        <p className="font-medium text-primary">RWF {(item.price * item.quantity)?.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">RWF {selectedOrder.subtotal?.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Order Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                      <button key={s} onClick={() => updateOrderStatus(selectedOrder.id, s)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedOrder.status === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Payment Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['pending', 'paid', 'failed'].map((s) => (
                      <button key={s} onClick={() => updatePaymentStatus(selectedOrder.id, s)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedOrder.payment_status === s ? (s === 'paid' ? 'bg-green-600 text-white' : s === 'failed' ? 'bg-red-600 text-white' : 'bg-yellow-500 text-white') : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
