import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./utils/i18n";
import { SearchProvider } from "./context/SearchContext";
import { CartContext } from "./context/CartContext";
import { FavoriteContext } from "./context/FavoriteContext";
import { AddressContext } from "./context/AddressContext";
import { PaymentContext } from "./context/PaymentContext";
import { ProfileContext } from "./context/ProfileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <CartContext>
      <FavoriteContext>
        <SearchProvider>
          <AuthProvider>
            <AddressContext>
              <PaymentContext>
                <ProfileContext>
                  <App />
                </ProfileContext>
              </PaymentContext>
            </AddressContext>
          </AuthProvider>
        </SearchProvider>
      </FavoriteContext>
    </CartContext>
  </Router>
);
