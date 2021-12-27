const NotificationMsgs = {
  success: {
    update: "Successfully updated",
    import: "Successfully imported",
    upload: "Successfully uploaded",
    row: {
      add: "Row added successfully",
      delete: "Row(s) deleted successfully",
      update: "Row updated successfully"
    }
  },
  info: {
    "no.rows.select.delete": "Select atleast one row to delete"
  },
  error: {
    generic: "Something bad happened!"
  }
};

const AppConstants = {
  AUTH_TOKEN_KEY: "X-AUTH-TOKEN",
  USER_KEY: "USER",
  CONFIG_KEY: "CONFIG",

  ROLES: {
    SUPER_ADMIN_KEY: "SUPER-ADMIN",
    ADMIN_KEY: "ADMIN"
  },
  ICON: {
    IMAGE: "https://via.placeholder.com/150.png?text=No%20Image"
  },
  PAGE_SIZE: 50,
  ConfirmDeletePrompt: "Are you sure you want to Delete ?",
  VIEW_COL_DEF: {
    dataType: "LINK",
    validation: null,
    aggregationAllowed: false,
    localizedDisplay: null,
    collectionName: null,
    columnName: null,
    enumClass: null,
    defaultValue: null,
    allValues: null,
    locked: false,
    hidden: false,
    pinned: false
  }
};

const ROUTE_URLS = {
  CONSUMERS_URL: "/app/consumers",
  NEW_CONSUMER_URL: "/app/consumers/new",
  CONSUMER_ORDERS_URL: "/app/consumer-orders",
  ITEMS_URL: "/app/items",
  LOOKS_URL: "/app/looks",
  LOOK_BOOK_URL: "/app/look-book",
  NEW_LOOK_BOOK_URL: "/app/look-book/new",
  CATEGORIES_URL: "/app/categories",
  NEW_CATEGORY_URL: "/app/categories/new",
  BRANDS_URL: "/app/brands",
  NEW_BRAND_URL: "/app/brands/new",
  INTRO_SCREEN_URL: "/app/intro-screen",
  NEW_INTRO_SCREEN_URL: "/app/intro-screen/new",
  STYLISTS_URL: "/app/stylists",
  STYLIST_PCKG_URL: "/app/stylist-package",
  TRENDING_SERVICE_URL: "/app/trending-services"
};

export default AppConstants;
export { NotificationMsgs, ROUTE_URLS };
