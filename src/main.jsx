import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./utils/CartContext.jsx";
import "./index.scss";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "./Blocks/Homepage/Homepage.jsx";
import Hawk from "./Blocks/Brends/Hawk/Hawk.jsx";
import Mustang from "./Blocks/Brends/Mustang/Mustang.jsx";
import Osse from "./Blocks/Brends/Osse/Osse.jsx";
import Account from "./Blocks/Account/Account.jsx";
import ProtectedFilters from "./utils/ProtectedFilters.jsx";
import Bascket from "./Blocks/Bascket/Bascket.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "/hawk",
        element: <Hawk />,
      },
      {
        path: "/mustang",
        element: <Mustang />,
      },
      {
        path: "/osse",
        element: <Osse />,
      },
      {
        path: "/hawk/:id",
        element: <Hawk />,
      },
      {
        path: "/mustang/:id",
        element: <Mustang />,
      },
      {
        path: "/osse/:id",
        element: <Osse />,
      },
      {
        path: "/filters/*",
        element: <ProtectedFilters />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/bascket",
        element: <Bascket />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
