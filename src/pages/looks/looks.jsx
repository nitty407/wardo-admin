import React from "react";

import PageContent from "components/page-content";

import GenericGrid from "components/grid/generic-grid-stateless";
import looksColumn from "./looks-column";

import { ROUTE_URLS } from "utils/app-constants";

const LookBook = () => {
  return (
    <PageContent>
      <GenericGrid
        titleKey="Looks"
        colFieldUrl="/look/all/fields"
        baseUrl="/look"
        columnDefGenerator={looksColumn}
        // redirectOnAddNew={true}
        // routeUrlOnAddNew={ROUTE_URLS.NEW_BRAND_URL}
        hideGlobalSearch
        hideExport
        csvName="look-book-list"
      />
    </PageContent>
  );
};

export default LookBook;
