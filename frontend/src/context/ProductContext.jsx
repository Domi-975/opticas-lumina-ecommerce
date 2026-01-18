import { createContext, useContext, useEffect, useState } from "react";
import { products as fallbackProducts } from "../data/products";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const tryLoad = async (url) => {
        try {
          const res = await fetch(url);
          if (!res.ok) return null;
          const data = await res.json();
          if (!Array.isArray(data) || data.length === 0) return null;
          return data;
        } catch {
          return null;
        }
      };

      const from3001 = await tryLoad("http://localhost:3001/products");
      const from3000 = from3001 ? null : await tryLoad("http://localhost:3000/products");
      const finalData = from3001 || from3000;

      setProducts(finalData || fallbackProducts);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
