import React, { createContext, useContext, useState, useRef } from "react";
import ConfirmDialog from "components/confirm-dialog";

/* interface ConfirmationOptions {
  title: string;
  description: string;
} */

const ConfirmDialogContext = createContext();

export const useConfirmation = () => useContext(ConfirmDialogContext);

export const ConfirmDialogServiceProvider = ({ children }) => {
  const [confirmationState, setConfirmationState] = useState(null);

  const awaitingPromiseRef = useRef();

  const openConfirmation = options => {
    setConfirmationState(options);
    return new Promise((resolve, reject) => {
      // save the promise result to the ref
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    // Mostly always you don't need to handle canceling of alert dialog
    // So shutting up the unhandledPromiseRejection errors
    if (confirmationState.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }

    setConfirmationState(null);
  };

  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }

    setConfirmationState(null);
  };

  return (
    <>
      <ConfirmDialogContext.Provider
        value={openConfirmation}
        children={children}
      />

      <ConfirmDialog
        open={Boolean(confirmationState)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...confirmationState}
      />
    </>
  );
};
