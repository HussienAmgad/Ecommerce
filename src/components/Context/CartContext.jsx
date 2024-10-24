import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [CartInfo, setCartInfo] = useState(false); // Example state
  const [CartId, setCartId] = useState(null); // Example state
  const [checkoutResponse, setCheckoutResponse] = useState(null);

  const checkout = async (cartId, shippingDetails) => {
    const token = localStorage.getItem('userToken');
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: {
            details: shippingDetails.details,
            phone: shippingDetails.phone,
            city: shippingDetails.city
          }
        },
        {
          headers: {
            token: token
          }
        }
      );
      setCheckoutResponse(data); 
      useNavigate("/")
      console.log("Checkout response:", data);
    } catch (error) {
      console.error("Error during checkout:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <CartContext.Provider value={{ CartId, setCartId, CartInfo, setCartInfo, checkout, checkoutResponse }}>
      {children}
    </CartContext.Provider>
  );
};
