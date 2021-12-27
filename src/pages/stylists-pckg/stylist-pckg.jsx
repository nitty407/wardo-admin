import React from "react";

import PageContent from "components/page-content";

import GenericGrid from "components/grid/generic-grid-stateless";
import stylistsColumn from "./stylist-pckg-column";

import { ROUTE_URLS } from "utils/app-constants";

const StylistPckg = () => {
  return (
    <PageContent>
      <GenericGrid
        titleKey="Stylist Packages"
        colFieldUrl="/stylist-package/all/fields"
        baseUrl="/stylist-package"
        columnDefGenerator={stylistsColumn}
        hideToggleEditMode
        // redirectOnAddNew={true}
        // routeUrlOnAddNew={ROUTE_URLS.NEW_CONSUMER_URL}
        hideGlobalSearch
        hideAddNew
        csvName="stylist-pckg-list"
      />
    </PageContent>
  );
};

export default StylistPckg;
