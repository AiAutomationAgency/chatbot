import React, { useState } from "react";
import "../assets/css/settings.css";
import TranslateIcon from "@mui/icons-material/Translate";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SecurityIcon from "@mui/icons-material/Security";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import PolicyIcon from "@mui/icons-material/Policy";
import AccountSidebar from "./SettingsSidebars/AccountSidebar";
import ModelConfiguration from "./SettingsSidebars/ModelConfiguration";
import LanguagePreferences from "./SettingsSidebars/LanguagePreferences";
import PageTransition from "./PageTransition";
import SecurityPreferences from "./SettingsSidebars/SecurityPreferences";
import { useTranslation } from "react-i18next";
const Settings = () => {
  const [selected, setSelected] = useState("account");
  const { t } = useTranslation();
  const clickHandler = (e) => {
    setSelected(e.target.id);
    const clickables = document.querySelectorAll(".settings-left-body-row");
    clickables.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  };
  const renderSidebar = () => {
    switch (selected) {
      case "account":
        return <AccountSidebar />;
      case "model":
        return <ModelConfiguration />;
      case "language":
        return <LanguagePreferences />;
      case "security":
        return <SecurityPreferences />;
      case "privacy":
        return <SecurityPreferences />;

      default:
        return <AccountSidebar />;
    }
  };
  return (
    <div className="settings-container">
      <div className="settings-left">
        <div className="settings-header">
          <div className="settings-header-left">
            <span>{t("Settings")}</span>
          </div>
          <div className="settings-header-right">
            {/* <ButtonNav text={""}/> */}
          </div>
        </div>
        <div className="settings-left-body">
          <div
            className="settings-left-body-row active "
            id="account"
            onClick={clickHandler}
          >
            <AccountCircleIcon className="settings-left-body-row-icon" />
            <p>{t("Account Settings")}</p>
          </div>
          <div
            className="settings-left-body-row "
            id="model"
            onClick={clickHandler}
          >
            <ModelTrainingIcon className="settings-left-body-row-icon" />
            <p>{t("Model Configuration")}</p>
          </div>
          <div
            className="settings-left-body-row "
            id="language"
            onClick={clickHandler}
          >
            <TranslateIcon className="settings-left-body-row-icon" />
            <p>{t("Language Preferences")}</p>
          </div>
          <div
            className="settings-left-body-row "
            id="security"
            onClick={clickHandler}
          >
            <SecurityIcon className="settings-left-body-row-icon" />
            <p>{t("Security")}</p>
          </div>
          <div
            className="settings-left-body-row "
            id="privacy"
            onClick={clickHandler}
          >
            <PolicyIcon className="settings-left-body-row-icon" />
            <p>{t("Privacy & Policy")}</p>
          </div>
        </div>
      </div>
      {renderSidebar()}
      <PageTransition />
    </div>
  );
};

export default Settings;
