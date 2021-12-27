import React from "react";
import PageContent from "components/page-content";
import GenericGrid from "components/grid/generic-grid-stateless";
import stylistsColumn from "./stylist-column";

const Stylists = () => {
  const defaultFilter = {
    isAlsoAStylist: {
      filterType: "boolean",
      value: true
    }
  };
  return (
    <PageContent>
      <GenericGrid
        titleKey="Stylists"
        colFieldUrl="/consumer/all/fields"
        baseUrl="/consumer"
        defaultFilter={defaultFilter}
        columnDefGenerator={stylistsColumn}
        // redirectOnAddNew={true}
        // routeUrlOnAddNew={ROUTE_URLS.NEW_CONSUMER_URL}
        hideGlobalSearch
        hideAddNew
        csvName="stylist-list"
      />
    </PageContent>
  );
};

export default Stylists;
