import { useContext } from 'react';
import { useFormik } from 'formik';
import { CartContext } from '../Context/CartContext';

export default function Checkout() {
  const { CartId, checkout } = useContext(CartContext);

  async function handleCheckout(values) {
    if (CartId) {
      await checkout(CartId, values); // استدعاء دالة checkout مع cartId وقيم النموذج
    } else {
      console.log("Cart ID is missing.");
    }
  }

  const myForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: handleCheckout
  });

  return (
    <>
      <form onSubmit={myForm.handleSubmit}>
        <div>
          <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Details</label>
          <input onBlur={myForm.handleBlur} type="text" name="details" id="details" value={myForm.values.details} onChange={myForm.handleChange} placeholder="Enter address details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
          <input onBlur={myForm.handleBlur} type="text" name="phone" id="phone" value={myForm.values.phone} onChange={myForm.handleChange} placeholder="Enter phone number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
          <input onBlur={myForm.handleBlur} type="text" name="city" id="city" value={myForm.values.city} onChange={myForm.handleChange} placeholder="Enter city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Checkout</button>
      </form>
    </>
  );
}
