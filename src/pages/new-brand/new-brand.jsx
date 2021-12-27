import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { trackPromise } from "react-promise-tracker";
import { Button } from "@material-ui/core";

import { GoBackBtn, SubmitBtnMui } from "components/button";
import PageTitle from "components/PageTitle/PageTitle";
import PageContent from "components/page-content";
import CustmTextInp from "components/form/custom-input-mui";

import API from "utils/api";
import { notifySuccess } from "utils/notify";

const NewBrand = ({ location }) => {
  const routerHistory = useHistory();

  const { register, handleSubmit, reset: resetForm } = useForm({
    defaultValues: {
      name: ""
    }
  });

  const onSubmit = async data => {
    const resp = await trackPromise(API.post("/brand", data));

    console.log("resp", resp);
    const { status } = resp;

    if (status) {
      resetForm();
      notifySuccess("brand created!");
    }
  };

  return (
    <>
      <GoBackBtn onClick={routerHistory.goBack} />
      <PageTitle title="New Brand" />

      <div className="row">
        <div className="col-4">
          <div className="brand">
            <form className="brand-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <CustmTextInp
                  label="Brand Name"
                  inputRef={register({ required: true })}
                  name="name"
                />
              </div>

              <div>
                <SubmitBtnMui type="submit" className="mr-4">
                  Save
                </SubmitBtnMui>
                <Button color="primary" onClick={routerHistory.goBack}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBrand;
