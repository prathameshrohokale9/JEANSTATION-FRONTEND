// src/App.js
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { CustomerProvider } from "./contexts/CustomerContext";
import Home from "./pages/Home";
import Store from "./pages/Store";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import ItemsView from "./pages/ItemsView";
import Items from "./pages/Items";
import Signup from './pages/Signup';
import Admins from "./pages/Admins";
import StoreEdit from "./pages/StoreEdit.js";
import ProfileUpdate from "./pages/ProfileUpdate.js";
import OrdersView from "./pages/OrdersView.js";
import AdminsItemsView from "./pages/AdminsItemsView.js";

// Carts imports
import OpenCart from './components/Carts/OpenCart';
import CartView from './components/Carts/CartView';

// Orders imports
import ViewOrders from "./components/Orders/ViewOrders.js";
import ViewOrdersByID from "./components/Orders/ViewOrdersByID.js"; 
import AddOrders from "./components/Orders/AddOrders.js";
import UpdateOrder from "./components/Orders/UpdateOrder.js";
import Searchbyname from "./components/Search/Searchbyname.jsx";
import Searchbyprice from "./components/Search/Searchbyprice.jsx";


// Import the ProtectedRoute component
import ProtectedRoute from './components/Home/ProtectedRoute.jsx';

function App() {
  return (
    <div className="App">
      <CustomerProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/Store" element={<Store />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/profileUpdate" element={<ProfileUpdate />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Store/ItemsView" element={<ItemsView />} />
            <Route path="/Items" element={<Items />} />
            <Route path="/searchbyname/:name" element={<Searchbyname />} />
            <Route path="/OrdersView" element={<OrdersView />} />
            <Route path="/AdminsItemsView" element={<AdminsItemsView />} />
            <Route path="searchbyprice/:minprice/:maxprice" element={<Searchbyprice/>}/>
    
            {/* <Route path="/searchbycode/:id" element={<Searchbycde />} /> */}
            <Route path="/StoreEdit" element={<StoreEdit />} />
            <Route path="/Admins" element={<ProtectedRoute allowEmployee={true}><Admins /></ProtectedRoute>} />

            {/* Orders Routes */}
            <Route exact path="/add-orders" element={<AddOrders />} />
            <Route exact path="/view-orders" element={<ViewOrders />} />
            <Route exact path="/view-orders/:orderId" element={<ViewOrdersByID />} />
            <Route exact path="/update-orders/:orderId/:itemCode" element={<UpdateOrder />} />

            {/* Carts Routes */}
            <Route exact path="/open-cart" element={<OpenCart />} />
            <Route exact path='/cart-view' element={<CartView />} />

            {/* Protected Cart Route */}
            <Route path="/Cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </CustomerProvider>
    </div>
  );
}

export default App;
