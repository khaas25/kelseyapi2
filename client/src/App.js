import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import ViewProducts from "./Components/ViewProducts/ViewProducts";
import AddCustomer from "./Components/AddCustomer";
import ViewCustomers from "./Components/ViewCustomers/ViewCustomers";
import EditProduct from "./Components/EditProduct";
import Practice from "./Components/Practice";
import Practice2 from "./Components/Practice2";
import ViewUsers from "./Components/Users/ViewUsers";
import AllPokemon from "./Components/Pokemon/AllPokemon";
import PokemonInfo from "./Components/PokemonInfo/PokemonInfo";
import RandomUser from "./Components/RandomUser/RandomUser";
import SavedUsers from "./Components/RandomUser/SavedUsers";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/savedusers"
            element={
              <>
                <SavedUsers />
              </>
            }
          />
          <Route
            path="/randomuser"
            element={
              <>
                <RandomUser />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <AddProduct />
              </>
            }
          />
          <Route
            path="/allpokemon"
            element={
              <>
                <AllPokemon />
              </>
            }
          />
          <Route
            path="/singlepokemon"
            element={
              <>
                <PokemonInfo />
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <ViewUsers />
              </>
            }
          />
          <Route
            path="/practice2"
            element={
              <>
                <Practice2 />
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
          <Route
            path="/editproduct"
            element={
              <>
                <EditProduct />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
