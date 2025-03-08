import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState();

    const getProduct = async () => {

    }

    const updateProduct = async (productData) => {

    }

    const deleteProduct = async (ProductProvider) => {

    }

    const sellProduct = async (productData) => {

    }

    return (
        <ProductContext.Provider value={{ getProduct, sellProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = () => {
    const context = useContext(ProductContext);
    return context;
}