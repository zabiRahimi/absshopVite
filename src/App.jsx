import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./Root";
import Home from "./components/home/Home";
import UserContext, { useUserContext } from "./components/contexts/UserContext";
import NotFound from "./components/notFound/notFound";
import { AboutUs } from "./components/aboutUs/AboutUs";
import { ContactUs } from "./components/contactUs/ContactUs";
import UserGuardRoute from "./components/privateRoutes/UserGuardRoute";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Dashboard from "./components/user/dashboard/Dashboard";
import OrderInProcess from "./components/user/dashboard/OrderInProcess";
import PurchasesReceived from "./components/user/dashboard/PurchasesReceived";
import ReturnPurchases from "./components/user/dashboard/ReturnPurchases";
import MyComments from "./components/user/dashboard/MyComments";
import ShopMessages from "./components/user/dashboard/ShopMessages";
import ShopWarnings from "./components/user/dashboard/ShopWarnings";
import UsersMessages from "./components/user/dashboard/UsersMessages";
import MyVisits from "./components/user/dashboard/MyVisits";
import MyFavorites from "./components/user/dashboard/MyFavorites";
import MyScores from "./components/user/dashboard/MyScores";
import Cart from "./components/user/cart/Cart";
import AddProduct, {
  action as addProductAction,
} from "./components/management/AddProduct";
import ShowProductsM, {
  loader as showProductsMLoader,
} from "./components/management/ShowProductsM";
import EditProductM, {
  loader as productMLoader,
  action as editProductMAction,
} from "./components/management/EditProductM";

import { action as destroyProductM } from "./components/management/DestroyProductM";
import AddProSliderM, {
  loader as showProductsMSliderLoader,
  action as addProSliderMAction,
} from "./components/management/AddProSliderM";

function App() {
  const userData = useUserContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<NotFound />}>
        <Route index element={<Home />} />

        <Route path="aboutUs" element={<AboutUs />} />

        <Route path="contactUs" element={<ContactUs />} />

        <Route
          element={
            <UserGuardRoute
              backPath="profile"
              isEffect={userData.isEffect}
              isLogin={userData.user.login}
              requiresLogin={false}
            />
          }
        >
          <Route path="signIn" exact element={<SignIn />} />
          <Route path="signUp" exact element={<SignUp />} />
        </Route>

        {/* گارد روت، بعضی از روتها در صورتی که کار خاصی انجام گرفته باشد را در دست قرار می دهد،
         * مانند دسترسی به پروفایل فقط در صورت لاگین بودن
         */}
        <Route
          element={
            <UserGuardRoute
              backPath="signIn"
              isEffect={userData.isEffect}
              isLogin={userData.user.login}
            />
          }
        >
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="orderInProcess" element={<OrderInProcess />} />
            <Route path="purchasesReceived" element={<PurchasesReceived />} />
            <Route path="returnPurchases" element={<ReturnPurchases />} />
            <Route path="myComments" element={<MyComments />} />
            <Route path="shopMessages" element={<ShopMessages />} />
            <Route path="shopWarnings" element={<ShopWarnings />} />
            <Route path="usersMessages" element={<UsersMessages />} />
            <Route path="myVisits" element={<MyVisits />} />
            <Route path="myFavorites" element={<MyFavorites />} />
            <Route path="MyScores" element={<MyScores />} />
            {/* <Route path="" element={< />} /> */}
            {/* <Route path="" element={< />} /> */}
          </Route>
        </Route>

        {/* روت زیر بصورت موقت ساخته شده است */}
        <Route
          path="addProduct"
          element={<AddProduct />}
          action={addProductAction}
        />

        {/* روت زیر بصورت موقت ساخته شده است */}
        <Route
          path="showProductsM"
          element={<ShowProductsM />}
          loader={showProductsMLoader}
        />

        {/* روت زیر بصورت موقت ساخته شده است */}
        <Route
          path="editProductM/:productId"
          element={<EditProductM />}
          loader={productMLoader}
          action={editProductMAction}
        />

        {/* روت زیر بصورت موقت ساخته شده است */}
        <Route path="destroyProductM/:productId" action={destroyProductM} />

        {/* روت زیر بصورت موقت ساخته شده است */}
        <Route
          path="addProSliderM"
          element={<AddProSliderM />}
          loader={showProductsMSliderLoader}
          action={addProSliderMAction}
        />
      </Route>
    )
  );

  return (
    <UserContext.Provider value={userData}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
