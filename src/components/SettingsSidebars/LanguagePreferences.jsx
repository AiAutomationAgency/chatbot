import React, { useEffect, useState } from "react";
import "../../assets/css/settings.css";
import TranslateIcon from "@mui/icons-material/Translate";
import { Button, MenuItem, Select } from "@mui/material";
import {
  useFetchModelQuery,
  useUpdateModelMutation,
} from "../../features/settings/SettingsApiSlice";
import { useTranslation } from "react-i18next";

const LanguagePreferences = () => {
  const { data, isSuccess } = useFetchModelQuery();
  const [updateModel] = useUpdateModelMutation();
  const [language, setLanguage] = useState("EN");
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (isSuccess) {
      setLanguage(data.language);
    }
  }, [isSuccess, data]);
  const HandleUpdate = (e) => {
    updateModel({ data: { language } });
  };
  useEffect(() => {
    i18n.changeLanguage(language.toLowerCase());
  }, [language, i18n]);
  return (
    <div className="settings-right">
      <div className="settings-right-header">
        <h3 className="settings-right-header-title">
          <TranslateIcon className="settings-right-header-title-icon" />{" "}
          {t("Language Preferences")}
        </h3>
      </div>
      <div className="settings-right-body">
        <p className="input-label-settings-right-body-row">
          {t("Language Preferences")} :
        </p>
        <Select
          sx={{ flex: "1" }}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value={"EN"}>{t("English")}</MenuItem>
          <MenuItem value={"FR"}>{t("French")}</MenuItem>
          <MenuItem value={"NL"}>{t("Dutch")}</MenuItem>
        </Select>
        <Button
          fullWidth
          variant="contained"
          className="input-settings-right-body-row"
          onClick={HandleUpdate}
        >
          {t("Update Language")}
        </Button>
      </div>
    </div>
  );
};

export default LanguagePreferences;
