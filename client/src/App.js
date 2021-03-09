import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import {loadStripe} from '@stripe/stripe-js'
import { CartProvider } from "use-shopping-cart";
import { Toaster } from 'react-hot-toast'

import Home from "./pages/Home";
import Product from "./pages/Product";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";


const queryClient = new QueryClient();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider mode="checkout-session" stripe={stripePromise} currency="USD">
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-center" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/result" component={Result} />
          <Route exact path="/:productId" component={Product} />
        </Switch>
      </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
