import React, { useState } from "react";

import PageContent from "components/page-content";

import GenericGrid from "components/grid/generic-grid-stateless";
import consumersColumn from "./consumers-column";

import { ROUTE_URLS } from "utils/app-constants";
import StylistDialog from "./stylist-dialog";
import { trackPromise } from "react-promise-tracker";
import { notifySuccess } from "utils/notify";
import API from "utils/api";

const Consumers = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const openDetailModal = data => {
    setUserData(data);
    setOpen(true);
    setSelectedCategory(
      data.stylistInfo.userCategory ? data.stylistInfo.userCategory : ""
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCategorySelected = evnt => {
    console.log(evnt.target.value);
    setSelectedCategory(evnt.target.value);
    let data = userData;
    data.stylistInfo.userCategory = evnt.target.value;
    updateCategory(data);
  };

  const updateCategory = async data => {
    const resp = await trackPromise(API.put("/consumer/update", data));

    const { status } = resp || {};

    if (status) {
      notifySuccess("changes saved!");
    }
  };

  return (
    <PageContent>
      <GenericGrid
        titleKey="Consumers"
        colFieldUrl="/consumer/all/fields"
        baseUrl="/consumer"
        columnDefGenerator={consumersColumn}
        redirectOnAddNew={true}
        routeUrlOnAddNew={ROUTE_URLS.NEW_CONSUMER_URL}
        openDetailModal={openDetailModal}
        hideGlobalSearch
        hideAddNew
        csvName="customers-list"
      />
      <StylistDialog
        open={open}
        handleClose={handleClose}
        userData={userData}
        onCategorySelected={onCategorySelected}
        selectedCategory={selectedCategory}
      />
    </PageContent>
  );
};

export default Consumers;
