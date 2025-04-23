import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // Function to create a new product
  createProduct: async (newProducts) => {
    if(!newProducts.name || !newProducts.price || !newProducts.image) {
        return {success: false, message: "Please fill all the fields."}
    }
    const response = await fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProducts),
    });
    const data = await response.json();
    set((state) => ({
        products: [...state.products, data.data],
    }));
    return {success: true, message: "Product created successfully."}
  },

  // Function to fetch products from the API
  fetchProducts: async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    set({ products: data.data });
  },

  deleteProduct: async (pid) => {
    const response = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if(!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: "Product deleted successfully." };
  },

  updateProduct: async (pid, updatedProduct) => {
    const response = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();
    if(!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? { ...product, ...updatedProduct } : product
      ),
    }));
    return { success: true, message: "Product updated successfully." };
  }

}));