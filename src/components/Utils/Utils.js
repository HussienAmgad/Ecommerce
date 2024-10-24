// Utils.js
import axios from 'axios';
import { toast } from 'react-toastify';


export async function LoadProducts(setProducts) {
  try {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    console.log(data.data);
    setProducts(data.data);
  } catch (error) {
    console.error('Error loading products', error);
  }
}


export async function LoadAllBrand(setBrands) {
  try {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    console.log(data.data);
    setBrands(data.data);
  } catch (error) {
    console.error('Error loading brands', error);
  }
}

export async function UpdateItemQuantity() {
  console.log("Hello");
  
}

export async function LoadOneBrand(setOneBrand, id) {
  try {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    setOneBrand(data.data);
  } catch (error) {
    console.error('Error loading brand', error);
  }
}
export async function LoadAllCategories(setCategories) {
  try {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    console.log(data.data);
    setCategories(data.data);
  } catch (error) {
    console.error('Error loading categories', error);
  }
}

// دالة جلب فئة واحدة
export async function LoadOneCategory(setOneCategory, id) {
  try {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    console.log(data.data);
    setOneCategory(data.data);  // تأكد من أن البيانات تتضمن subcategories
  } catch (error) {
    console.error('Error loading category', error);
  }
}



export async function addProductToCart(productId) {
  try {
    let response = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", 
      { productId: productId }, 
      { headers: { token: localStorage.getItem('userToken') } }
    );
    toast.success(response.data.message); // تم تغيير 'data.message' إلى 'response.data.message'
    console.log('Product added to cart:', response.data);
  } catch (error) {
    let errorMessage = error.response?.data?.message || "Error adding product to cart";
    toast.error(errorMessage); // استخدام الرسالة الصحيحة في حالة حدوث خطأ
    console.error('Error adding product to cart:', error);
  }
}


export async function LoadCart(setCart, setLoading) {
  try {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    console.log(data);
    setCart(data);
  } catch (error) {
    console.error('Error loading cart data', error);
  } finally {
    setLoading(false); // Stop loading after fetching data
  }
}

export async function LoadCartinf(setCart, setLoading) {
  try {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    console.log(data);
    setCart(data);
  } catch (error) {
    console.error('Error loading cart data', error);
  } finally {
    setLoading(false); // Stop loading after fetching data
  }
}

// تصدير الدالة ClearCart
export async function ClearCart(setCart) {
  try {
    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    console.log(data);
    setCart(data); // Update cart state after clearing
  } catch (error) {
    console.error('Error clearing cart', error);
  }
}

export async function ClearCartinf(setCart) {
  try {
    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    console.log(data);
    setCart(data); // Update cart state after clearing
  } catch (error) {
    console.error('Error clearing cart', error);
  }
}

export async function RemoveItem(id, setCart) {
  try {
    let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    console.log(data);
    setCart(data); // Update cart state after removing item
  } catch (error) {
    console.error('Error removing item', error);
  }
}

export async function RemoveIteminf(id, setCart) {
  try {
    let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    console.log(data);
    setCart(data); // Update cart state after removing item
  } catch (error) {
    console.error('Error removing item', error);
  }
}

