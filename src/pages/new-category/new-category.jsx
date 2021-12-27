import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { trackPromise } from "react-promise-tracker";

import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { CloudUpload as CloudUploadIcon } from "@material-ui/icons";

import DropZone from "components/dropzone/dropzone";
import PageTitle from "components/PageTitle/PageTitle";
import CustmTextInp from "components/form/custom-input-mui";
import { GoBackBtn, SubmitBtnMui } from "components/button";

import API from "utils/api";
import { notifySuccess } from "utils/notify";

const NewCategory = ({ location }) => {
  const { isEditMode, rowData = {} } = location.state || {};

  const routerHistory = useHistory();

  const initFiles = [{ preview: rowData.iconUrl }];
  const [files, setFiles] = useState(rowData.iconUrl ? initFiles : []);
  const [parentCategories, setParentCategories] = useState([]);

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
      parentCategoryName: rowData.parentCategoryName || ""
    }
  });

  useEffect(() => {
    register({ name: "iconUrl" }, { required: true });
    return () => unregister("iconUrl");
  }, [register, unregister]);

  useEffect(() => {
    setValue("iconUrl", (files[0] || {}).preview);
  }, [files]);

  const onSubmit = async data => {
    if (isEditMode) {
      const resp = await trackPromise(
        API.put("/category/update", { ...rowData, ...data })
      );

      const { status } = resp || {};

      if (status) {
        notifySuccess("changes saved!");
      }
    } else {
      const resp = await trackPromise(API.post("/category", data));

      const { status } = resp || {};

      if (status) {
        resetForm();
        setFiles([]);
        notifySuccess("added successfully!");
      }
    }
  };

  const fetchParentCategories = async () => {
    const resp = await trackPromise(API.get("/category/all/parent"));
    const { status, data } = resp || {};

    if (status) {
      setParentCategories(data);
    }
  };

  useEffect(() => {
    fetchParentCategories();
  }, []);

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
              uploadDirectory="assets/intro"
              fileTypes={[
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/svg+xml"
              ]}
              maxSize={1}
              uploadDirectory="assets/intro"
              isInValid={errors && errors.iconUrl}
              validationText="Only images with max. 1mb size supported. Recommended resolution 300x300"
            />
          </div>
          <div className="col-4">
            <div className="upload__meta">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4">
                  <CustmTextInp
                    label="Name"
                    inputRef={register({ required: true })}
                    name="name"
                  />
                </div>
                <div className="form-group mb-4">
                  <FormControl style={{ minWidth: "100%" }}>
                    <InputLabel>Parent Category Name</InputLabel>

                    <Controller
                      as={
                        <Select>
                          <MenuItem value="">None</MenuItem>
                          {parentCategories.map((item, i) => (
                            <MenuItem key={i} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                      name="parentCategoryName"
                      control={control}
                      defaultValue=""
                    />
                  </FormControl>
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

export default NewCategory;
