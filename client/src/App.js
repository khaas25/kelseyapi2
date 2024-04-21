import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import ViewProducts from "./Components/ViewProducts/ViewProducts";
import AddCustomer from "./Components/AddCustomer";
import ViewCustomers from "./Components/ViewCustomers/ViewCustomers";

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
            path="/addcustomer"
            element={
              <>
                <AddCustomer />
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
          <Route
            path="/viewcustomers"
            element={
              <>
                <ViewCustomers />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
