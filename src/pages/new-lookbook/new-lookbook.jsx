import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { trackPromise } from "react-promise-tracker";

import { Button } from "@material-ui/core";

import DropZone from "components/dropzone";
import PageTitle from "components/PageTitle/PageTitle";
import CustmTextInp from "components/form/custom-input-mui";
import { GoBackBtn, SubmitBtnMui } from "components/button";

import API from "utils/api";
import { notifySuccess } from "utils/notify";

const NewLookBook = ({ location }) => {
  const { isEditMode, rowData = {} } = location.state || {};

  const routerHistory = useHistory();

  const initActiveIcons = rowData.activeIconUrl
    ? [{ preview: rowData.activeIconUrl }]
    : [];
  const initInActiveIcons = rowData.inactiveIconUrl
    ? [{ preview: rowData.inactiveIconUrl }]
    : [];
  const initBookIcons = rowData.bookIconUrl
    ? [{ preview: rowData.bookIconUrl }]
    : [];

  const [activeIconArr, setActiveIconArr] = useState(initActiveIcons);
  const [inActiveIconArr, setInActiveIconArr] = useState(initInActiveIcons);
  const [bookIconArr, setBookIconArr] = useState(initBookIcons);

  const {
    register,
    unregister,
    setValue,
    handleSubmit,
    errors,
    control,
    reset: resetForm
  } = useForm({
    defaultValues: {
      name: rowData.name,
      activeIconUrl: rowData.activeIconUrl,
      inactiveIconUrl: rowData.inactiveIconUrl,
      bookIconUrl: rowData.bookIconUrl
    }
  });

  useEffect(() => {
    register({ name: "activeIconUrl" }, { required: true });
    register({ name: "inactiveIconUrl" }, { required: true });
    register({ name: "bookIconUrl" }, { required: true });

    return () => {
      unregister("activeIconUrl");
      unregister("inactiveIconUrl");
      unregister("bookIconUrl");
    };
  }, [register, unregister]);

  useEffect(() => {
    setValue("activeIconUrl", (activeIconArr[0] || {}).preview);
    setValue("inactiveIconUrl", (inActiveIconArr[0] || {}).preview);
    setValue("bookIconUrl", (bookIconArr[0] || {}).preview);
  }, [activeIconArr, inActiveIconArr, bookIconArr]);

  const onSubmit = async data => {
    if (isEditMode) {
      const resp = await trackPromise(
        API.put("/lookbook/update", { ...rowData, ...data })
      );

      const { status } = resp || {};

      if (status) {
        notifySuccess("changes saved!");
      }
    } else {
      const resp = await trackPromise(API.post("/lookbook", data));

      const { status } = resp || {};

      if (status) {
        resetForm();
        setActiveIconArr([]);
        setInActiveIconArr([]);
        setBookIconArr([]);
        notifySuccess("added successfully!");
      }
    }
  };

  return (
    <>
      <GoBackBtn onClick={routerHistory.goBack} />
      <PageTitle title="Look Book" />
      <div className="upload">
        <div className="row mb-4">
          <div className="col-3 d-flex flex-column align-items-center">
            <h6>Active Icon</h6>
            <DropZone
              files={activeIconArr}
              setFilesCallback={setActiveIconArr}
              uploadDirectory="assets/intro"
              fileTypes={[
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/svg+xml"
              ]}
              previewContainerStyle={{
                backgroundColor: "#ccc"
              }}
              maxSize={1}
              uploadDirectory="assets/intro"
              isInValid={errors && errors.activeIconUrl}
              validationText="Only images with max. 1mb size supported. Recommended resolution 800x800"
            />
          </div>
          <div className="col-3 d-flex flex-column align-items-center">
            <h6>Inactive Icon</h6>
            <DropZone
              files={inActiveIconArr}
              setFilesCallback={setInActiveIconArr}
              uploadDirectory="assets/intro"
              fileTypes={[
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/svg+xml"
              ]}
              maxSize={1}
              uploadDirectory="assets/intro"
              isInValid={errors && errors.inactiveIconUrl}
              validationText="Only images with max. 1mb size supported. Recommended resolution 800x800"
            />
          </div>
          <div className="col-3 d-flex flex-column align-items-center">
            <h6>Book Icon</h6>
            <DropZone
              files={bookIconArr}
              setFilesCallback={setBookIconArr}
              uploadDirectory="assets/intro"
              fileTypes={[
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/svg+xml"
              ]}
              maxSize={2}
              uploadDirectory="assets/intro"
              isInValid={errors && errors.bookIconUrl}
              validationText="Only images with max. 2mb size supported. Recommended resolution 1751x2320"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="upload__meta">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4">
                  <CustmTextInp
                    label="Name"
                    inputRef={register({ required: true })}
                    name="name"
                  />
                </div>

                <div className="form-group--submit pt-5">
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
      </div>
    </>
  );
};

export default NewLookBook;
