import React from "react";

import PageContent from "components/page-content";

import GenericGrid from "components/grid/generic-grid-stateless";
import trendingServicesColumn from "./trending-services-column";

import { ROUTE_URLS } from "utils/app-constants";

const TrendingServices = () => {
  return (
    <PageContent>
      <GenericGrid
        titleKey="Trending Services"
        colFieldUrl="/trending-services/all/fields"
        baseUrl="/trending-services"
        columnDefGenerator={trendingServicesColumn}
        // redirectOnAddNew={true}
        // routeUrlOnAddNew={ROUTE_URLS.NEW_CONSUMER_URL}
        hideGlobalSearch
        hideAddNew
        csvName="trending-services-list"
      />
    </PageContent>
  );
};

export default TrendingServices;
