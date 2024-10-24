import  { useContext, useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import { ClearCart, LoadCart, RemoveItem } from '../Utils/Utils';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import axios from 'axios';

export default function Cart() {
  const { setCartId } = useContext(CartContext);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await LoadCart(setCart, setLoading);
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleClearCart = async () => {
    try {
      await ClearCart(setCart);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await RemoveItem(id, setCart);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    const voucherCode = e.target.voucher.value;

    if (voucherCode === 'Hussien') {
      setDiscount(10);
      setVoucherMessage('Voucher applied successfully!');
    } else {
      setVoucherMessage('Invalid voucher code');
    }
  };

  async function Add(productId, currentCount) {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.error('User token is missing');
      return;
    }

    try {
      let response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: currentCount + 1 },
        { headers: { token, 'Content-Type': 'application/json' } }
      );

      // تحديث الكمية في الواجهة بدون إعادة التحميل
      setCart((prevCart) => {
        const updatedProducts = prevCart.data.products.map((product) => {
          if (product.product._id === productId) {
            return { ...product, count: product.count + 1 };
          }
          return product;
        });
        return { ...prevCart, data: { ...prevCart.data, products: updatedProducts } };
      });

      console.log('Update count success:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  }

  async function Mines(productId, currentCount) {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.error('User token is missing');
      return;
    }

    if (currentCount > 1) {
      try {
        let response = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          { count: currentCount - 1 },
          { headers: { token, 'Content-Type': 'application/json' } }
        );

        setCart((prevCart) => {
          const updatedProducts = prevCart.data.products.map((product) => {
            if (product.product._id === productId) {
              return { ...product, count: product.count - 1 };
            }
            return product;
          });
          return { ...prevCart, data: { ...prevCart.data, products: updatedProducts } };
        });

        console.log('Update count success:', response.data);
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    }
  }




  const calculateTotalAfterDiscount = () => {
    return (cart.data.totalCartPrice * (1 - discount / 100)).toFixed(2);
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <HashLoader color="#5a9aa0" />
          </div>
        ) : cart.data?.products && cart.data.products.length > 0 ? (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart.data.products.map((item) => (
                  <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <div className="shrink-0 md:order-1">
                        <img className="h-20 w-20 dark:hidden" src={item.product.imageCover} alt={item.name} />
                        <img className="hidden h-20 w-20 dark:block" src={item.product.imageCover} alt={item.name} />
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <h3 className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.product.title}</p>

                        <div className="flex items-center gap-4">
                          <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                            </svg>
                            Add to Favorites
                          </button>

                          <button type="button" onClick={() => handleRemoveItem(item.product._id)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            Remove
                          </button>

                        </div>
                      </div>

                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 pr-3">Count</p>

                          <button
                            onClick={() => Mines(item.product._id, item.count)}
                            type="button"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <label className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">
                            {item.count}
                          </label>
                          <button onClick={() => Add(item.product._id, item.count)}
                            type="button" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>

                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">${item.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">${cart.data.totalCartPrice}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Discount ({discount}%)</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">-${(cart.data.totalCartPrice * (discount / 100)).toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">${calculateTotalAfterDiscount()}</span>
                </div>

                <form onSubmit={handleApplyVoucher}>
                  <input type="text" name="voucher" className="mt-4 block w-full border border-gray-300 p-2 rounded-md" placeholder="Enter voucher code" />
                  <button type="submit" className="mt-2 w-full rounded-md bg-blue-600 py-2 text-white">Apply</button>
                  {voucherMessage && <p className="mt-2 text-sm text-red-500">{voucherMessage}</p>}
                </form>

                <button onClick={handleClearCart} className="mt-4 w-full rounded-md bg-red-600 py-2 text-white">Clear Cart</button>
                <NavLink to="/" className="mt-2 block w-full rounded-md bg-gray-300 py-2 text-center">Continue Shopping</NavLink>
                <NavLink to={"/checkout"}
                  onClick={setCartId(cart.data._id)}
                  className="mt-2 block w-full rounded-md bg-green-600 py-2 text-white text-center">Proceed to Checkout</NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-gray-500 dark:text-gray-400">No products added</p>
          </div>
        )}
      </div>
    </section>
  );
}