import React, {
  useMemo,
  useCallback,
  useRef,
  useState,
  useEffect
} from "react";
import { trackPromise } from "react-promise-tracker";
import { useDropzone } from "react-dropzone";

import { Button } from "@material-ui/core";

import API from "utils/api";
import images from "utils/get-images";
import { notifyError } from "utils/notify";

const dropzoneBaseStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "450px",
  width: "100%",
  maxWidth: "430px",
  borderStyle: "none",
  backgroundImage: `url(
      "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='18' ry='18' stroke='%23707070FF' stroke-width='1' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
    )`,
  backgroundColor: "#F1F2F9",
  color: "#80838C",
  borderWidth: "1px",
  borderRadius: "18px",
  justifyContent: "center"
};

const activeStyle = {
  backgroundImage: `url(
    "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='18' ry='18' stroke='%232196F3' stroke-width='1' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
  )`
};

const acceptStyle = {
  backgroundImage: `url(
    "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='18' ry='18' stroke='%2300E676' stroke-width='1' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
  )`
};

const rejectStyle = {
  backgroundImage: `url(
    "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='18' ry='18' stroke='%23FF1744' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
  )`
};

const DropZone = ({
  files,
  setFilesCallback,
  uploadDirectory = "assets",
  styles,
  previewContainerStyle,
  isInValid,
  maxSize,
  fileTypes,
  validationText
}) => {
  const colRef = useRef(null);

  const [colWidth, setcolWidth] = useState();

  useEffect(() => {
    if (colRef.current) {
      let parentWidth = colRef.current.offsetWidth;
      setcolWidth(parentWidth);
    }
  }, [colRef]);

  const upload = async file => {
    const formData = new FormData();
    formData.append("file", file);

    const resp = await trackPromise(
      API.post("/file/upload", formData, { params: { dir: uploadDirectory } })
    );
    const { status, data } = resp || {};

    if (status && data) {
      return data;
    }
  };

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const files = acceptedFiles.map(file => {
      // Object.assign(file, {
      //   preview: URL.createObjectURL(file)
      // })
      return upload(file).then(url => {
        return { preview: url };
      });
    });

    Promise.all(files).then(function(results) {
      // setState here
      setFilesCallback(results);
    });
  }, []);

  const onDropReject = fileRejections => {
    fileRejections.map(file => {
      const errors = file.errors[0];

      if (errors.code === "file-invalid-type") {
        notifyError("file type not supported!");
      } else if (errors.code === "file-too-large") {
        notifyError(`file is larger than ${maxSize}mb.`);
      }
    });
  };

  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    maxSize: maxSize * 1048576,
    accept: fileTypes,
    onDrop,
    onDropRejected: onDropReject,
    noClick: true,
    noKeyboard: true
  });

  const drpZoneStyle = useMemo(
    () => ({
      ...{
        ...dropzoneBaseStyle,
        ...styles,
        ...(colWidth ? { height: colWidth / 1 } : {})
      },
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(isInValid ? { boxShadow: "0 0 5px #FF1744" } : {})
    }),
    [isDragActive, isDragReject, isDragAccept, isInValid, colWidth]
  );

  const removeFile = file => () => {
    const tempFiles = [...files];
    tempFiles.splice(tempFiles.indexOf(file), 1);
    setFilesCallback(tempFiles); // setState here
  };

  // useEffect(
  //   () => () => {
  //     // Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach(file => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );

  return (
    <>
      {files.length <= 0 ? (
        <div ref={colRef}>
          <div {...getRootProps({ style: drpZoneStyle })}>
            <input
              {...getInputProps({
                multiple: false
              })}
            />

            <div className="text-center">
              <img src={images["dropzone.svg"]} className="mb-4" /> <br />
              <Button
                color="primary"
                style={{ font: "14px 'Avenir LT Pro 65 Medium'" }}
                onClick={open}
              >
                Upload Photo
              </Button>
              or just drag and drop
            </div>
          </div>
          <p className="small pt-2 text-danger">{validationText}</p>
        </div>
      ) : (
        files.map((file, i) => (
          <div
            key={i}
            className="position-relative border mw-100 p-2"
            style={previewContainerStyle}
          >
            <img src={file.preview} className="mw-100" />

            <button
              type="button"
              title="remove file"
              className="close"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={removeFile(file)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default DropZone;
