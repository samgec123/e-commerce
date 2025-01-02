import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import Card from "./Card";
import List from "./List";
import ReactWordcloud from "./Filter";
import Header from "./Header";
import Footer from "./Footer";

interface Product {
  id: number;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  title: string;
}

interface Category {
  text: string;
  value: number;
}

const ListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryCount, setCategoryCount] = useState<Category[]>([]);
  const [view, setView] = useState("grid");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categoryWeights = useMemo(() => {
    const weights: { [key: string]: number } = {};
    products.forEach((product) => {
      weights[product.category] = (weights[product.category] || 0) + 1;
    });
    return Object.entries(weights).map(([text, value]) => ({ text, value }));
  }, [products]);

  useEffect(() => {
    setCategoryCount(categoryWeights);
  }, [categoryWeights]);

  const handleClick = useCallback((viewType: string) => {
    setView(viewType);
  }, []);

  const activeClassName = (viewType: string) => {
    return viewType === view ? "active" : "";
  };

  return (
    <>
      <Header />
      <div className="container mt-3">
        <div
          className="btn-group"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            type="button"
            className={`btn btn-outline-primary ${activeClassName("grid")}`}
            onClick={() => handleClick("grid")}
          >
            Grid
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary ${activeClassName("list")}`}
            onClick={() => handleClick("list")}
          >
            List
          </button>
        </div>
        <ReactWordcloud data={categoryCount} />
        <div
          className="row row-cols-1 row-cols-md-4 g-4"
          style={{ marginTop: "1rem" }}
        >
          {products.map((p) => (
            <div className="col" key={p.id}>
              {view === "grid" ? (
                <Card
                  id={p.id}
                  brand={p.brand}
                  category={p.category}
                  description={p.description}
                  discountPercentage={p.discountPercentage}
                  images={p.images[0]}
                  price={p.price}
                  title={p.title}
                />
              ) : (
                <List
                  id={p.id}
                  brand={p.brand}
                  category={p.category}
                  description={p.description}
                  discountPercentage={p.discountPercentage}
                  images={p.images[0]}
                  price={p.price}
                  title={p.title}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListProducts;
