import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Views/LandingPage";
import SignInPage from "./Views/SigInPage/SignInPage";
import SignUpPage from "./Views/SignUpPage/SignUpPage";
import HomePage from "./Views/HomePage/HomePage";
import { AuthProvider } from "./context/AuthProvider";
import ProfilePage from "./Views/ProfilePage/ProfilePage";
import ProductManagmentPage from "./Views/ProductManagmentPage/ProductManagmentPage";
import SellProductPage from "./Views/SellProductPage/SellProductPage";
import { ProductProvider } from "./context/ProductProvider";
import EditProduct from "./Views/EditProduct/EditProduct";
import ProductPage from "./Views/ProductPage/ProductPage";
import NotificationPage from "./Views/NotificationPage/NotificationPage";
import { NotificationProvider } from "./context/NotificationProvider";

const App = () => {
  return (
    <div className="h-screen">
      <NotificationProvider>
        <ProductProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/my-profile" element={<ProfilePage />} />
              <Route path="/products" element={<ProductManagmentPage />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/sell-product" element={<SellProductPage />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
            </Routes>
          </AuthProvider>
        </ProductProvider>
      </NotificationProvider>
    </div>
  );
};

export default App;
