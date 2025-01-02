import "bootstrap/dist/css/bootstrap.css";
import ListProducts from "./components/ListProducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
