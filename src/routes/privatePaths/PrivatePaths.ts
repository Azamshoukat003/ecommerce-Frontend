import { RouteItem } from "../types";
import CheckoutPage from "../../pages/chaeckOutPage/CheckoutPage";
import ProfileDashboardPage from "../../pages/dashboard/DashboardPage";
// import ProfilePage from '@/pages/Profile/ProfilePage'
import Cart from "../../pages/cart/Cart.tsx";
import OrderSuccess from "../../components/successPage/OrderSuccess";
const PrivatePaths: RouteItem[] = [
  { path: "/dashboard/:tab", Content: ProfileDashboardPage },
  { path: "/checkout", Content: CheckoutPage },
  { path: "/cart", Content: Cart },
  { path: "/order-success", Content: OrderSuccess },
];

export default PrivatePaths;
