import Home from "@/page/Home";
import Discover from "@/page/Discover";
import Order from "@/page/Order";
import City from "@/page/City";
import Search from "@/page/Search";
import SearchShop from "@/page/Search/SearchShop";
import ShopDetail from "@/page/ShopDetail";
import Login from "@/page/Login";
import Confirm from "@/page/ConfirmOrder";
import Remark from "@/page/ConfirmOrder/subPage/Remark";
import Invoic from "@/page/ConfirmOrder/subPage/Invoic";
import ChooseAddress from "@/page/ConfirmOrder/subPage/ChooseAddress";
import AddAddress from "@/page/ConfirmOrder/subPage/AddAddress";
import Payment from "@/page/ConfirmOrder/subPage/Payment";
import OrderDetail from "@/page/Order/subPage/OrderDetail";
import UserInfoDetail from "@/page/User/subPage/UserInfoDetail";
import SetUserName from "@/page/User/subPage/SetUserName";
import Address from "@/page/User/subPage/Address";
import ForgetPwd from "@/page/User/subPage/ForgetPwd";
import Balance from "@/page/Balance";
import BlanceDetail from "@/page/Balance/subPage/detail";
import Points from "@/page/Points";
import PointsDetail from "@/page/Points/subPage/detail";
import Layout from "@/components/Layout";

export default [
  {
    path: "/",
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/discover",
        name: "Discover",
        component: Discover,
      },
      {
        path: "/order",
        name: "Order",
        component: Order,
      },
      {
        path: "/user",
        name: "User",
        component: () => import("@/page/User"),
      },
    ],
    component: Layout,
  },
  {
    path: "/city",
    name: "City",
    component: City,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/search/shop",
    name: "SearchShop",
    component: SearchShop,
  },
  {
    path: "/shopdetail",
    name: "ShopDetail",
    component: ShopDetail,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/confirmorder",
    name: "ConfirmOrder",
    component: Confirm,
  },
  {
    path: "/confirmorder/remark",
    name: "Remark",
    component: Remark,
  },
  {
    path: "/confirmorder/invoic",
    name: "Invoic",
    component: Invoic,
  },
  {
    path: "/confirmorder/chooseaddress",
    name: "ChooseAddress",
    component: ChooseAddress,
  },
  {
    path: "/confirmorder/addAddress",
    name: "AddAddress",
    component: AddAddress,
  },
  {
    path: "/confirmorder/payment",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/order/orderDetail",
    name: "OrderDetail",
    component: OrderDetail,
  },
  {
    path: "/user/info",
    name: "UserInfoDetail",
    component: UserInfoDetail,
  },
  {
    path: "/user/info/setusername",
    name: "SetUserName",
    component: SetUserName,
  },
  {
    path: "/user/info/address",
    name: "Address",
    component: Address,
  },
  {
    path: "/user/info/forgetpwd",
    name: "ForgetPwd",
    component: ForgetPwd,
  },
  {
    path: "/balance",
    name: "Balance",
    component: Balance,
  },
  {
    path: "/balance/detail",
    name: "BlanceDetail",
    component: BlanceDetail,
  },
  {
    path: "/points",
    name: "Points",
    component: Points,
  },
  {
    path: "/points/detail",
    name: "PointsDetail",
    component: PointsDetail,
  },
];
