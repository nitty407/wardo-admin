import React from "react";
import { useHistory } from "react-router-dom";

import { GoBackBtn } from "components/button";
import PageTitle from "components/PageTitle/PageTitle";
import PageContent from "components/page-content";

const NewConsumer = () => {
  const routerHistory = useHistory();
  return (
    <>
      <GoBackBtn onClick={routerHistory.goBack} />
      <PageTitle title="New Consumer" />
      <PageContent>new consumer</PageContent>
    </>
  );
};

export default NewConsumer;
