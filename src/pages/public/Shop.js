import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Plus, Minus, Trash2, X, CreditCard, CheckCircle, Package } from 'lucide-react';
import { ordersAPI, shopAPI } from '../../services/api';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productImages, setProductImages] = useState({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'cash',
    street: '',
    city: '',
    province: '',
    notes: ''
  });

  const categories = ['all', 'Jerseys', 'Scarves', 'Hats', 'Accessories', 'Tickets'];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await shopAPI.getProducts();
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([
          { _id: 1, name: '2024 Home Jersey', category: 'Jerseys', price: 25000, image: 'https://share.google/tA2Lahwhd03dAYPLx', rating: 4.8, inStock: true },
          { _id: 2, name: '2024 Away Jersey', category: 'Jerseys', price: 25000, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop', rating: 4.6, inStock: true },
          { _id: 3, name: 'Official Scarf', category: 'Scarves', price: 8000, image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop', rating: 4.9, inStock: true },
          { _id: 4, name: 'Club Cap', category: 'Hats', price: 5000, image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop', rating: 4.5, inStock: true },
          { _id: 5, name: 'Flag Banner', category: 'Accessories', price: 12000, image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop', rating: 4.7, inStock: true },
          { _id: 6, name: 'Season Ticket 2024', category: 'Tickets', price: 150000, image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop', rating: 5.0, inStock: true },
          { _id: 7, name: 'Training Kit', category: 'Jerseys', price: 18000, image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop', rating: 4.4, inStock: true },
          { _id: 8, name: 'Retro Jersey 2010', category: 'Jerseys', price: 30000, image: 'https://images.unsplash.com/photo-1517446787929-bc90951d0974?w=400&h=400&fit=crop', rating: 4.9, inStock: false },
        ]);
      }
    };
    fetchProducts();
  }, []);

useEffect(() => {
    const images = {};
    products.forEach(product => {
      const stored = localStorage.getItem(`product_${product._id || product.id}`);
      if (stored) images[product._id || product.id] = stored;
    });
    setProductImages(images);
  }, [products]);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    const productId = product._id || product.id;
    const existingItem = cart.find(item => (item._id || item.id) === productId);
    if (existingItem) {
      setCart(cart.map(item => 
        (item._id || item.id) === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => (item._id || item.id) !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(cart.map(item => {
      if ((item._id || item.id) === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const orderData = {
        customer: {
          name: checkoutForm.name,
          email: checkoutForm.email,
          phone: checkoutForm.phone
        },
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal: cartTotal,
        paymentMethod: checkoutForm.paymentMethod,
        shippingAddress: {
          street: checkoutForm.street,
          city: checkoutForm.city,
          province: checkoutForm.province,
          country: 'Rwanda'
        },
        notes: checkoutForm.notes
      };

      const response = await ordersAPI.create(orderData);
      setOrderDetails(response.data);
      setOrderComplete(true);
      setCart([]);
      setIsCartOpen(false);
      setIsCheckoutOpen(false);
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1920&h=600&fit=crop" 
            alt="Shop" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">
            Official <span className="text-white">Shop</span>
          </h1>
          <p className="text-xl text-blue-200">Get your Rayon Sports FC merchandise</p>
        </div>
      </section>

      {/* Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-primary p-4 rounded-full shadow-lg hover:bg-primary-light transition-colors"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6 text-white" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
        </div>
      </button>

      {/* Categories */}
      <section className="py-8 bg-white sticky top-20 z-30 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id || product.id} className="card group border border-gray-200">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={productImages[product._id || product.id] || product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full">
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-heading font-bold text-primary">
                      RWF {product.price.toLocaleString()}
                    </span>
                    <button 
                      onClick={() => product.inStock && addToCart(product)}
                      disabled={!product.inStock}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        product.inStock 
                          ? 'bg-primary text-white hover:bg-primary-light'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold text-gray-900">Shopping Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 ml-3">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-primary">RWF {item.price.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Minus className="w-4 h-4 text-gray-700" />
                          </button>
                          <span className="mx-3 text-gray-700">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Plus className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Total</span>
                  <span className="text-2xl font-heading font-bold text-primary">
                    RWF {cartTotal.toLocaleString()}
                  </span>
                </div>
                <button 
                  onClick={() => { setIsCheckoutOpen(true); }}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => !isProcessing && setIsCheckoutOpen(false)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-heading font-bold text-gray-900">Checkout</h2>
              <button 
                onClick={() => !isProcessing && setIsCheckoutOpen(false)}
                disabled={isProcessing}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCheckout} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={checkoutForm.name}
                  onChange={handleCheckoutChange}
                  required
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={checkoutForm.email}
                  onChange={handleCheckoutChange}
                  required
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={checkoutForm.phone}
                  onChange={handleCheckoutChange}
                  required
                  className="input-field"
                  placeholder="+250 7xx xxx xxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={checkoutForm.paymentMethod}
                  onChange={handleCheckoutChange}
                  required
                  className="input-field"
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="mobile_money">Mobile Money (MTN/Airtel)</option>
                  <option value="card">Card Payment</option>
                </select>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <input
                      type="text"
                      name="street"
                      value={checkoutForm.street}
                      onChange={handleCheckoutChange}
                      className="input-field"
                      placeholder="Street Address"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={checkoutForm.city}
                      onChange={handleCheckoutChange}
                      className="input-field"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="province"
                      value={checkoutForm.province}
                      onChange={handleCheckoutChange}
                      className="input-field"
                      placeholder="Province"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
                <textarea
                  name="notes"
                  value={checkoutForm.notes}
                  onChange={handleCheckoutChange}
                  className="input-field"
                  rows="2"
                  placeholder="Any special instructions..."
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">RWF {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-2xl font-heading font-bold text-primary">
                    RWF {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Complete Modal */}
      {orderComplete && orderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setOrderComplete(false)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Order Placed!</h2>
            <p className="text-gray-600 mb-4">Your order has been successfully placed.</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-lg font-bold text-primary">{orderDetails.orderNumber}</p>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
              <Package className="w-5 h-5" />
              <span>We'll send you a confirmation email shortly</span>
            </div>

            <button
              onClick={() => setOrderComplete(false)}
              className="btn-primary w-full"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
