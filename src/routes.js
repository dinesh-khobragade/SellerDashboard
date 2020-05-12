import Home from "./components/main/home/Home";
import OrderList from "./components/main/orders/OrderMainContent";
import ProductList from "./components/main/products/ProductList";
import FinanceMainComponent from "./components/main/finance/FinanceMainComponent";
import ProductDetailsComponent from "./components/main/products/ProductDetailsComponent";
import LoginComponent from "./components/main/login/LoginComponent";
import RegisterUserForm from "./components/main/login/RegisterUserForm";
import LoginForm from "./components/main/login/LoginForm";

export const routes =  [
  { path : '' , component:Home},
  { path : '/orders' , component:OrderList},
  { path : '/products' , component:ProductList},
  { path : '/finance' , component:FinanceMainComponent},
  { path : '/signup' , component:RegisterUserForm},
  { path : '/login' , component:LoginForm},
  { path : '/productDetails' ,
    component:ProductDetailsComponent ,
    name : 'productDetails' ,
    props: (route) => ({
      ...route.params
    })}
]
