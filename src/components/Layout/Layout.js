import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import { FullPageSpinner } from "components/spinners";

// pages
// import Dashboard from "pages/dashboard";
import Consumers from "pages/consumers";
import NewConsumer from "pages/new-consumer";
import ConsumerOrders from "pages/consumer-orders";
import Items from "pages/items";
import Looks from "pages/looks";
import LookBook from "pages/look-book";
import NewLookBook from "pages/new-lookbook";
import Categories from "pages/categories";
import Brands from "pages/brands";
import NewBrand from "pages/new-brand";
import NewCategory from "pages/new-category";
import IntroScreen from "pages/intro-screen";
import NewIntroScreen from "pages/new-intro-screen";
import TrendingServices from "pages/trending-service";

import Typography from "pages/typography";
import Notifications from "pages/notifications";
import Maps from "pages/maps";
import Tables from "pages/tables";
import Icons from "pages/icons";
import Charts from "pages/charts";
import Stylists from "pages/stylists";
import StylistPckg from "pages/stylists-pckg";

// context
import { useLayoutState } from "context/LayoutContext";
import { useUserState, useUserDispatch } from "context/UserContext";

import API from "utils/api";
import auth from "utils/auth";
import { ROUTE_URLS } from "utils/app-constants";

const Layout = props => {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();

  const { isAuthenticated } = useUserState();
  const userDispatch = useUserDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const validateToken = async () => {
    try {
      const resp = await API.post("/auth/user/validate-token");

      if (resp && resp.data) {
        auth.setUserInfo(resp.data);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      auth.clearAll();
      userDispatch({ type: "SIGN_OUT_SUCCESS" });
      props.history.push("/login");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      validateToken();
    }
  }, []);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            {/* <Route exact path="/app/dashboard" component={Dashboard} /> */}
            <Route
              exact
              path={ROUTE_URLS.CONSUMERS_URL}
              component={Consumers}
            />
            <Route
              exact
              path={ROUTE_URLS.NEW_CONSUMER_URL}
              component={NewConsumer}
            />
            <Route
              exact
              path={ROUTE_URLS.CONSUMER_ORDERS_URL}
              component={ConsumerOrders}
            />
            <Route exact path={ROUTE_URLS.ITEMS_URL} component={Items} />
            <Route exact path={ROUTE_URLS.LOOKS_URL} component={Looks} />
            <Route exact path={ROUTE_URLS.LOOK_BOOK_URL} component={LookBook} />
            <Route
              exact
              path={ROUTE_URLS.NEW_LOOK_BOOK_URL}
              component={NewLookBook}
            />
            <Route
              exact
              path={ROUTE_URLS.CATEGORIES_URL}
              component={Categories}
            />
            <Route
              exact
              path={ROUTE_URLS.NEW_CATEGORY_URL}
              component={NewCategory}
            />
            <Route exact path={ROUTE_URLS.BRANDS_URL} component={Brands} />
            <Route exact path={ROUTE_URLS.NEW_BRAND_URL} component={NewBrand} />
            <Route
              exact
              path={ROUTE_URLS.INTRO_SCREEN_URL}
              component={IntroScreen}
            />
            <Route
              exact
              path={ROUTE_URLS.NEW_INTRO_SCREEN_URL}
              component={NewIntroScreen}
            />
            <Route exact path={ROUTE_URLS.STYLISTS_URL} component={Stylists} />
            <Route
              exact
              path={ROUTE_URLS.STYLIST_PCKG_URL}
              component={StylistPckg}
            />
            <Route
              exact
              path={ROUTE_URLS.TRENDING_SERVICE_URL}
              component={TrendingServices}
            />
            <Route exact path="/app/typography" component={Typography} />
            <Route exact path="/app/tables" component={Tables} />
            <Route exact path="/app/notifications" component={Notifications} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
        </div>
      </>
    </div>
  );
};

export default withRouter(Layout);
