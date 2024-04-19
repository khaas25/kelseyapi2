import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import ViewProducts from "./Components/ViewProducts/ViewProducts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddProduct />
              </>
            }
          />
          <Route
            path="/viewproducts"
            element={
              <>
                <ViewProducts />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
