import React from "react";
import { Button } from "@material-ui/core";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import "./confirm-dialog.scss";

const ConfirmDialog = ({
  modalOptions,
  open,
  title,
  icon,
  variant,
  description,
  buttonTexts,
  onSubmit,
  onClose
}) => {
  return (
    <Modal isOpen={open} toggle={onClose} {...modalOptions} zIndex={1201}>
      <ModalHeader toggle={onClose}>{title}</ModalHeader>
      <ModalBody>
        <div className="dialog">
          <div className="dialog-icon">
            <img src={icon} alt="icon" />
          </div>
          <div className="dialog-content">{description}</div>
          <div className="dialog-actions">
            <Button variant="contained" color="primary" onClick={onSubmit}>
              {buttonTexts && buttonTexts.ok}
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              {buttonTexts && buttonTexts.cancel}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmDialog;
