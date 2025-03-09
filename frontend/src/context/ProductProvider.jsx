import { NavigationMenuSub } from "@radix-ui/react-navigation-menu";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([])
  const navigate = useNavigate();

  const handleResponses = (status) => {
    switch (status) {
      case 401:
        toast(title, {
          description: "Session timeout. SignIn to continue",
        });
        localStorage.removeItem("accessToken");
        navigate("/sign-in");
        break;
      case 404:
        toast(title, {
          description: "User not found",
        });
        break;
      case 400:
        toast(title, {
          description: "Server in not responding.",
        });
        break;
      case 409:
        toast(title, {
          description: "Server error. Bad reaquest.",
        });
        break;
      case 500:
        toast(title, {
          description: "Internal Server Error.",
        });
        break;
      default:
        break;
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/products");

      if (response.status !== 200) {
        handleResponses(response.status);
        return { success: false, message: "Failed to fetch products!" };
      } else {
        setAllProducts(response.data.data);
        // toast("Cypher", {
        //     description: "Successfully fetched all products!"
        // });
        return { success: true, message: "Failed to fetch products!" };
      }
    } catch (error) {
      console.error("Error selling product:", error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to fetch products!",
      };
    }
  };

  const getProductsBySeller = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/products/kiton",
        { withCredentials: true }
      );

      if (response.status !== 200) {
        handleResponses(response.status);
        return { success: false, message: "Failed to fetch products!" };
      } else {
        setProducts(response.data.data);
        // toast("Cypher", {
        //     description: "Successfully fetched all products!"
        // });
        return { success: true, message: "Failed to fetch products!" };
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to fetch products!",
      };
    }
  };

  const getProduct = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/products/${id}`,
        { withCredentials: true }
      );

      if (response.status !== 200) {
        handleResponses(response.status);
        return { success: false, message: "Failed to fetch product!" };
      } else {
        return {
          success: true,
          product: response.data.data,
          message: "Failed to fetch product!",
        };
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to fetch product!",
      };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/products/${id}`,
        { product: productData },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        handleResponses(response.status);
        return { success: false, message: "Failed to update product!" };
      } else {
        navigate("/products");
        toast("Cypher", {
          description: "Product updated!",
        });
        return { success: true, message: "Product updated!" };
      }
    } catch (error) {
      console.error("Error while updating the product:", error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to update product!",
      };
    }
  };

  const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(
          `http://localhost:8000/api/v1/products/${id}`, { withCredentials: true }
        );
  
        if (response.status !== 200) {
          handleResponses(response.status);
          return { success: false, message: "Failed to delete product!" };
        } else {
            getProductsBySeller();
          toast("Cypher", {
            description: "Product deleted successfully!",
          });
          return { success: true, message: "Product deleted!" };
        }
      } catch (error) {
        console.error("Error while deleting product:", error);
        return {
          success: false,
          message: error?.response?.data?.message || "Failed to delete product!",
        };
      }
  };

  const sellProduct = async (productData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/products/sell",
        productData,
        { withCredentials: true }
      );

      if (response.status !== 200) {
        handleResponses(response.status);
        return { success: false, message: "Failed to sell product!" };
      } else {
        navigate("/products");
        toast("Cypher", {
          description: "Product added for sell!",
        });
        return { success: true, message: "Product added for sell!" };
      }
    } catch (error) {
      console.error("Error selling product:", error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to sell product!",
      };
    }
  };

  const buyProduct = async(id) => {
    try {
        const response = await axios.post(
          `http://localhost:8000/api/v1/products/buy/${id}`, {}, { withCredentials: true }
        );
  
        if (response.status !== 200) {
          handleResponses(response.status);
          return { success: false, message: "Failed to create order!" };
        } else {
            navigate('/notification')
          return {
            success: true,
            order: response.data.data.order,
            notification: response.data.data.notification,
            message: "Product added in order!",
          };
        }
      } catch (error) {
        console.error("Error while creating order:", error);
        return {
          success: false,
          message: error?.response?.data?.message || "Failed to create order!",
        };
      }
  }

  return (
    <ProductContext.Provider
      value={{
        getProduct,
        sellProduct,
        updateProduct,
        deleteProduct,
        getAllProducts,
        allProducts,
        products,
        getProductsBySeller,
        buyProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  return context;
};
