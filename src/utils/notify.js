import React from "react";
import { toast } from "react-toastify";

import Notification from "components/Notification";

function sendNotification(componentProps, options) {
  return toast(<Notification {...componentProps} />, options);
}

export const notifySuccess = (msg, notifOptionsOverride) => {
  const componentProps = {
    type: "feedback",
    message: msg,
    variant: "contained",
    color: "success"
  };

  return sendNotification(componentProps, {
    type: "success",
    ...(notifOptionsOverride || {})
  });
};

export const notifyError = (msg, notifOptionsOverride) => {
  const componentProps = {
    type: "report",
    message: msg,
    variant: "contained",
    color: "secondary"
  };

  return sendNotification(componentProps, {
    type: "error",
    ...(notifOptionsOverride || {})
  });
};

export const notifyInfo = (msg, notifOptionsOverride) => {
  const componentProps = {
    type: "shipped",
    message: msg,
    variant: "contained",
    color: "primary"
  };

  return sendNotification(componentProps, {
    type: "success",
    ...(notifOptionsOverride || {})
  });
};
