import React from "react";

import PageContent from "components/page-content";

import GenericGrid from "components/grid/generic-grid-stateless";
import brandsColumn from "./brands-column";

import { ROUTE_URLS } from "utils/app-constants";

const Brands = () => {
  return (
    <PageContent>
      <GenericGrid
        titleKey="Brands"
        colFieldUrl="/brand/all/fields"
        baseUrl="/brand"
        columnDefGenerator={brandsColumn}
        redirectOnAddNew={true}
        routeUrlOnAddNew={ROUTE_URLS.NEW_BRAND_URL}
        hideGlobalSearch
        hideDelete
        hideExport
        csvName="brands-list"
      />
    </PageContent>
  );
};

export default Brands;
