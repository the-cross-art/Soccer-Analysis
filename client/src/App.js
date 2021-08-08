import React, { useEffect, Suspense } from "react";
import { lazily } from "react-lazily";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./api/auth";
import { LoadingOutlined } from "@ant-design/icons";
import "./App.css";

const {
  MyLeagues,
  MyPlayers,
  UpdateLeague,
  UpdatePlayerTeams,
  UpdateTeam,
  Login,
  Register,
  Home,
  Product,
  RegisterComplete,
  ForgotPassword,
  UserDashboard,
  CreateLeague,
  CreateTeam,
  CreatePlayer,
  Profile,
  AdminDashboard,
  CategoryCreate,
  CategoryUpdate,
  SubcategoryCreate,
  SubcategoryUpdate,
  ProductCreate,
  PlayerCreate,
  UpdatePlayer,
  AllProducts,
  ProductUpdate,
  CategoryHome,
  SubcategoryHome,
  Shop,
  Cart,
  Checkout,
  CreateCoupon,
  Payment,
} = lazily(() => import("./views"));
const { Header, UserRoute, AdminRoute, SideDrawer } = lazily(() =>
  import("./components")
);

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: idTokenResult.token,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5 h1">
          __ EC
          <LoadingOutlined />
          MMY __
        </div>
      }
    >
      <Header />
      <ToastContainer />
      <SideDrawer />
      <Switch>
        {/* auth routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        {/* user routes */}
        <UserRoute exact path="/user/dashboard" component={UserDashboard} />
        <UserRoute exact path="/user/leagues/new" component={CreateLeague} />
        <UserRoute exact path="/user/team/leagues" component={MyLeagues} />
        <UserRoute exact path="/user/:lid/team/new" component={CreateTeam} />
        <UserRoute exact path="/user/player" component={CreatePlayer} />
        <UserRoute exact path="/user/players" component={MyPlayers} />
        <UserRoute exact path="/user/profile" component={Profile} />
        <UserRoute exact path="/league/edit/:id" component={UpdateLeague} />
        <UserRoute exact path="/team/edit/:id" component={UpdateTeam} />
        <UserRoute
          exact
          path="/player/edit/:id/teams"
          component={UpdatePlayerTeams}
        />
        <UserRoute exact path="/player/edit/:id" component={UpdatePlayer} />
        {/* admin routes */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute
          exact
          path="/admin/subcategory"
          component={SubcategoryCreate}
        />
        <AdminRoute
          exact
          path="/admin/subcategory/:slug"
          component={SubcategoryUpdate}
        />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/player" component={PlayerCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <AdminRoute exact path="/admin/coupon" component={CreateCoupon} />
        {/* Common Routes */}
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/subcategory/:slug" component={SubcategoryHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;
