import React from "react";

import PageContent from "components/page-content";

import GenericGrid from "components/grid/generic-grid-stateless";
import consumerOrdersColumn from "./consumer-orders-column";

import { ROUTE_URLS } from "utils/app-constants";

const ConsumerOrders = () => {
  return (
    <PageContent>
      <GenericGrid
        titleKey="Consumer Orders"
        colFieldUrl="/booking/all/fields"
        baseUrl="/booking"
        columnDefGenerator={consumerOrdersColumn}
        redirectOnAddNew={true}
        routeUrlOnAddNew={ROUTE_URLS.NEW_CONSUMER_URL}
        hideGlobalSearch
        hideAddNew
        csvName="consumer-orders"
      />
    </PageContent>
  );
};

export default ConsumerOrders;
