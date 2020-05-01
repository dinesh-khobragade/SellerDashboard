import Home from "./Home";
import OrderList from "./components/main/orders/OrderList";
import ProductList from "./components/main/products/ProductList";

export const routes =  [
  { path : '' , component:Home},
  { path : '/orders' , component:OrderList},
  { path : '/products' , component:ProductList}
]
