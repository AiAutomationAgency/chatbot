import React, { useState } from "react";
import SecurityIcon from "@mui/icons-material/Security";
import "../../assets/css/settings.css";
import { Button, TextField } from "@mui/material";
import { useUpdatePassMutation } from "../../features/settings/SettingsApiSlice";
import { t } from "i18next";

const SecurityPreferences = () => {
  const [isError, setIsError] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [updatePass] = useUpdatePassMutation();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setIsError(true);
    } else {
      setIsError(false);
      const obj = {
        old_password: oldPassword,
        new_password: password,
        confirm_new_password: rePassword,
      };
      try {
        const res = await updatePass({ data: obj }).unwrap();
        console.log("success:", res);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className="settings-right">
      <div className="settings-right-header">
        <h3 className="settings-right-header-title">
          <SecurityIcon className="settings-right-header-title-icon" />{" "}
          {t("Security")}
        </h3>
      </div>
      <form className="settings-right-body" onSubmit={SubmitHandler}>
        <p className="input-label-settings-right-body-row">
          {t("Change Password")} :
        </p>
        <div className="settings-right-body-row">
          <TextField
            className="settings-right-body-row-item"
            label={t("Current Password")}
            type="password"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            className="settings-right-body-row-item"
            label={t("New Password")}
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={isError ? t("Passwords don't match!") : ""}
            error={isError}
          />
        </div>
        <div className="settings-right-body-row">
          <TextField
            className="settings-right-body-row-item"
            label={t("Retype Password")}
            type="password"
            required
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            error={isError}
            helperText={isError ? t("Passwords don't match!") : ""}
          />
          <Button
            type="submit"
            variant="contained"
            className="input-settings-right-body-row item"
          >
            {t("Update Password")}
          </Button>
        </div>
        <p className="input-label-settings-right-body-row">
          {t("Bring your open AI key")} :
        </p>
        <TextField
          className="settings-right-body-row-item full"
          label={t("API Key")}
          type="text"
        />
        <Button
          type="button"
          variant="contained"
          className="input-settings-right-body-row"
        >
          {t("Update Key")}
        </Button>
      </form>
    </div>
  );
};

export default SecurityPreferences;
