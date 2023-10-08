import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./index.css";
import guestRoutes from "./routes/GuestRoutes";
import MainRoutes from "./routes/MainRoutes";
import { Provider } from "react-redux";
import store from "./redux store";
const queryClient = new QueryClient();
const applicationRoutes = [...guestRoutes, ...MainRoutes];

const router = createBrowserRouter(applicationRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
