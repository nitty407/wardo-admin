import React from "react";

import PageContent from "components/page-content";

import GenericGrid from "components/grid/generic-grid-stateless";
import introScreenColumn from "./intro-screen-columns";

import { ROUTE_URLS } from "utils/app-constants";

const IntroScreen = () => {
  return (
    <PageContent>
      <GenericGrid
        titleKey="Intro Screen"
        colFieldUrl="/intro-screen/all/fields"
        baseUrl="/intro-screen"
        columnDefGenerator={introScreenColumn}
        redirectOnAddNew={true}
        routeUrlOnAddNew={ROUTE_URLS.NEW_INTRO_SCREEN_URL}
        hideGlobalSearch
        hideToggleEditMode
        hideExport
      />
    </PageContent>
  );
};

export default IntroScreen;
