import React, { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  ShoppingBasket as ShoppingBasketIcon,
  // NotificationsNone as NotificationsIcon,
  // FormatSize as TypographyIcon,
  // FilterNone as UIElementsIcon,
  // BorderAll as TableIcon,
  // QuestionAnswer as SupportIcon,
  // LibraryBooks as LibraryIcon,
  // HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  PhoneAndroid as PhoneAndroidIcon
} from "@material-ui/icons";
import { FaApple, FaUsers, FaTruckLoading } from "react-icons/fa";
import { MdBook, MdTrendingUp } from "react-icons/md";
import { GiLargeDress } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";
import clsx from "clsx";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
// import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar
} from "context/LayoutContext";

import { ROUTE_URLS } from "utils/app-constants";

const structure = [
  // { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 0,
    label: "All Users",
    link: ROUTE_URLS.CONSUMERS_URL,
    icon: <PeopleIcon />
  },
  {
    id: 1,
    label: "Consumers Orders",
    link: ROUTE_URLS.CONSUMER_ORDERS_URL,
    icon: <FaTruckLoading size="22px" />
  },
  {
    id: 2,
    label: "Items",
    link: ROUTE_URLS.ITEMS_URL,
    icon: <ShoppingBasketIcon />
  },
  {
    id: 3,
    label: "Looks",
    link: ROUTE_URLS.LOOKS_URL,
    icon: <GiLargeDress size="24px" />
  },
  {
    id: 4,
    label: "Look Books",
    link: ROUTE_URLS.LOOK_BOOK_URL,
    icon: <MdBook size="24px" />
  },
  {
    id: 5,
    label: "Categories",
    link: ROUTE_URLS.CATEGORIES_URL,
    icon: <CategoryIcon />
  },
  {
    id: 6,
    label: "Brands",
    link: ROUTE_URLS.BRANDS_URL,
    icon: <FaApple size="24px" />
  },
  {
    id: 7,
    label: "Intro Screen",
    link: ROUTE_URLS.INTRO_SCREEN_URL,
    icon: <PhoneAndroidIcon />
  },
  // {
  //   id: 8,
  //   label: "Stylists",
  //   link: ROUTE_URLS.STYLISTS_URL,
  //   icon: <FaUsers size="24px" />
  // },
  {
    id: 9,
    label: "Stylist Package",
    link: ROUTE_URLS.STYLIST_PCKG_URL,
    icon: <GoPackage size="24px" />
  }
  // {
  //   id: 10,
  //   label: "Trending Services",
  //   link: ROUTE_URLS.TRENDING_SERVICE_URL,
  //   icon: <MdTrendingUp size="24px" />
  // }
  // {
  //   id: 11,
  //   label: "Typography",
  //   link: "/app/typography",
  //   icon: <TypographyIcon />
  // },
  // { id: 12, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  // {
  //   id: 13,
  //   label: "Notifications",
  //   link: "/app/notifications",
  //   icon: <NotificationsIcon />
  // },
  // {
  //   id: 14,
  //   label: "UI Elements",
  //   link: "/app/ui",
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" }
  //   ]
  // },
  // { id: 15, type: "divider" },
  // { id: 16, type: "title", label: "HELP" },
  // { id: 17, label: "Library", link: "", icon: <LibraryIcon /> },
  // { id: 18, label: "Support", link: "", icon: <SupportIcon /> },
  // { id: 19, label: "FAQ", link: "", icon: <FAQIcon /> },
  // { id: 20, type: "divider" },
  // { id: 21, type: "title", label: "PROJECTS" },
  // {
  //   id: 22,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="small" color="warning" />
  // },
  // {
  //   id: 23,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="small" color="primary" />
  // },
  // {
  //   id: 24,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="small" color="secondary" />
  // }
];

const Sidebar = ({ location }) => {
  const classes = useStyles();
  const theme = useTheme();

  // global
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // local
  const [isPermanent, setPermanent] = useState(true);

  const handleWindowWidthChange = () => {
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme.breakpoints.values.md;
    const isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  };

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened
        })
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        </IconButton>
      </div>
      <List
        className={clsx(classes.sidebarList, "flex-grow-1 d-flex flex-column")}
      >
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
        <ListItem dense className="mt-auto">
          <ListItemText>BUILD 0.8.0002 (10/11/2020)</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default withRouter(Sidebar);
