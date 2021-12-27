import React from "react";

import PageContent from "components/page-content";

import GenericGrid from "components/grid/generic-grid-stateless";
import categoryColumn from "./categories-column";

import { ROUTE_URLS } from "utils/app-constants";

const Categories = () => {
  return (
    <PageContent>
      <GenericGrid
        titleKey="Categories"
        colFieldUrl="/category/all/fields"
        baseUrl="/category"
        columnDefGenerator={categoryColumn}
        redirectOnAddNew={true}
        routeUrlOnAddNew={ROUTE_URLS.NEW_CATEGORY_URL}
        hideToggleEditMode
        hideGlobalSearch
        hideExport
        csvName="category-list"
      />
    </PageContent>
  );
};

export default Categories;
