import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { trackPromise } from "react-promise-tracker";

import { Button } from "@material-ui/core";
import { CloudUpload as CloudUploadIcon } from "@material-ui/icons";

import DropZone from "components/dropzone/dropzone";
import PageTitle from "components/PageTitle/PageTitle";
import CustmTextInp from "components/form/custom-input-mui";
import { GoBackBtn, SubmitBtnMui } from "components/button";

import API from "utils/api";
import { notifySuccess } from "utils/notify";

const NewIntroScreen = ({ location }) => {
  const { isEditMode, rowData = {} } = location.state || {};

  const routerHistory = useHistory();

  const initFiles = [{ preview: rowData.imageUrl }];
  const [files, setFiles] = useState(rowData.imageUrl ? initFiles : []);

  const {
    register,
    unregister,
    setValue,
    handleSubmit,
    errors,
    reset: resetForm
  } = useForm({
    defaultValues: {
      imageUrl: rowData.imageUrl,
      header: rowData.header,
      subHeader: rowData.subHeader,
      sequenceNumber: rowData.sequenceNumber
    }
  });

  useEffect(() => {
    register({ name: "imageUrl" }, { required: true });
    return () => unregister("imageUrl");
  }, [register, unregister]);

  useEffect(() => {
    setValue("imageUrl", (files[0] || {}).preview);
  }, [files]);

  const onSubmit = async data => {
    if (isEditMode) {
      const resp = await trackPromise(
        API.put("/intro-screen/update", { ...rowData, ...data })
      );

      const { status } = resp || {};

      if (status) {
        notifySuccess("added successfully!");
      }
    } else {
      const resp = await trackPromise(API.post("/intro-screen", data));

      const { status } = resp || {};

      if (status) {
        resetForm();
        setFiles([]);
        notifySuccess("added successfully!");
      }
    }
  };

  return (
    <>
      <GoBackBtn onClick={routerHistory.goBack} />
      <PageTitle title="Upload File" />
      <div className="upload">
        <div className="row">
          <div className="col-6 d-flex justify-content-center">
            <DropZone
              files={files}
              setFilesCallback={setFiles}
              fileTypes={[
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/svg+xml"
              ]}
              maxSize={2}
              uploadDirectory="assets/intro"
              isInValid={errors && errors.imageUrl}
              validationText="Only images with max. 2mb size supported. Recommended resolution is 375x812."
            />
          </div>
          <div className="col-4">
            <div className="upload__meta">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4">
                  <CustmTextInp
                    label="Heading"
                    inputRef={register({ required: true })}
                    name="header"
                  />
                </div>
                <div className="form-group mb-4">
                  <CustmTextInp
                    label="Sub-Heading"
                    inputRef={register({ required: true })}
                    name="subHeader"
                    multiline
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <CustmTextInp
                    label="Sequence No."
                    type="number"
                    inputRef={register({ required: true })}
                    name="sequenceNumber"
                  />
                </div>
                <div className="form-group--submit pt-5">
                  <SubmitBtnMui
                    type="submit"
                    className="mr-4"
                    // startIcon={<CloudUploadIcon />}
                  >
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

export default NewIntroScreen;
