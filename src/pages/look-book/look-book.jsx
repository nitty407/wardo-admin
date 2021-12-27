import React from "react";

import PageContent from "components/page-content";

import GenericGrid from "components/grid/generic-grid-stateless";
import lookBookColumn from "./look-book-column";

import { ROUTE_URLS } from "utils/app-constants";

const LookBook = () => {
  return (
    <PageContent>
      <GenericGrid
        titleKey="Look Books"
        colFieldUrl="/lookbook/all/fields"
        baseUrl="/lookbook"
        columnDefGenerator={lookBookColumn}
        redirectOnAddNew={true}
        routeUrlOnAddNew={ROUTE_URLS.NEW_LOOK_BOOK_URL}
        hideGlobalSearch
        hideToggleEditMode
        hideExport
        csvName="look-book-list"
      />
    </PageContent>
  );
};

export default LookBook;
