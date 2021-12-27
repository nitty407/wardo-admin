import React from "react";

import PageContent from "components/page-content";

import GenericGrid from "components/grid/generic-grid-stateless";
import itemsColumn from "./items-column";

import { ROUTE_URLS } from "utils/app-constants";

const Items = () => {
  return (
    <PageContent>
      <GenericGrid
        titleKey="Items"
        colFieldUrl="/item/all/fields"
        baseUrl="/item"
        columnDefGenerator={itemsColumn}
        redirectOnAddNew={true}
        routeUrlOnAddNew={ROUTE_URLS.NEW_ITEM_URL}
        hideGlobalSearch
        hideAddNew
        hideExport
        csvName="customers-list"
      />
    </PageContent>
  );
};

export default Items;
