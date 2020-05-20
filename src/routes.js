import Home from "./components/main/home/Home";
import OrderList from "./components/main/orders/OrderMainContent";
import ProductList from "./components/main/products/ProductList";
import FinanceMainComponent from "./components/main/finance/FinanceMainComponent";
import ProductDetailsComponent from "./components/main/products/ProductDetailsComponent";
import LoginComponent from "./components/main/login/LoginComponent";
import RegisterUserForm from "./components/main/login/RegisterUserForm";
import LoginForm from "./components/main/login/LoginForm";
import SignupComponent from "./components/main/login/SignupComponent";
import MainContent from "./components/MainContent";
import AddCategories from "./components/main/categories/AddCategories";
import AddProductComponent from "./components/main/products/AddProductComponent";
import ProfileComponent from "./components/main/profile/ProfileComponent";

export const routes = [
  {
    path: '/login', component: LoginComponent,
    children: [
      {path: '/', component: LoginForm},
      {path: '/signup', component: RegisterUserForm}
    ]
  },
  {
    path: '/', component: MainContent,
    children: [
      {path: '/', component: Home},
      {path: '/orders', component: OrderList},
      {path: '/products', component: ProductList},
      {path: '/finance', component: FinanceMainComponent},
      {path: '/profile', component: ProfileComponent},
      {path: '/addCategories', component: AddCategories},
      {
        path: '/productDetails',
        component: AddProductComponent,
        name: 'productDetails',
        props: (route) => ({
          ...route.params
        })
      }
    ]
  }
]
