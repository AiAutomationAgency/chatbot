import React, { useEffect, useState } from "react";
import "../../assets/css/settings.css";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import {
  useFetchModelQuery,
  useUpdateModelMutation,
} from "../../features/settings/SettingsApiSlice";
import { useTranslation } from "react-i18next";

const ModelConfiguration = () => {
  const { data, isLoading, isSuccess } = useFetchModelQuery();
  const [updateModel] = useUpdateModelMutation();
  const { t } = useTranslation();
  function valuetext(value) {
    return `${value}`;
  }
  const [model, setModel] = useState("");
  const [llm_temperature, setLlm_temperature] = useState(0);
  useEffect(() => {
    if (isSuccess) {
      setModel(data.model_name);
      setLlm_temperature(parseFloat(data.llm_temperature));
      console.log(parseFloat(data.llm_temperature));
    }
  }, [isSuccess, data]);
  const UpdateHandler = (e) => {
    if (e.target.innerText.toLowerCase() === "Update Model".toLowerCase()) {
      updateModel({ data: { model_name: model } });
    } else {
      updateModel({ data: { llm_temperature } });
    }
  };
  const renderGPTDesc = () => {
    if (model === "gpt-4-1106-preview") {
      return t(
        "The latest GPT-4 and the most capable model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more, tends to be a little bit slower"
      );
    } else if (model === "gpt-4") {
      return t(
        "legacy gpt 4 model with less token capabilities but less halucination"
      );
    } else if (model === "gpt-3.5-turbo-1106") {
      return t(
        "The latest GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more, also alot faster than GPT4"
      );
    } else {
      return t(
        "Ability to understand images, in addition to all other GPT-4 Turbo capabilties."
      );
    }
  };
  let content;
  if (isLoading) {
    content = (
      <div className="settings-right">
        <div className="settings-right-header">
          <h3 className="settings-right-header-title">
            <ModelTrainingIcon className="settings-right-header-title-icon" />{" "}
            {t("Model Configuration")}
          </h3>
        </div>
        <div className="settings-right-body">
          <CircularProgress />
        </div>
      </div>
    );
  } else {
    content = (
      <div className="settings-right">
        <div className="settings-right-header">
          <h3 className="settings-right-header-title">
            <ModelTrainingIcon className="settings-right-header-title-icon" />{" "}
            {t("Model Configuration")}
          </h3>
        </div>
        <div className="settings-right-body">
          <p className="input-label-settings-right-body-row">
            {t("GPT Model")} :
          </p>
          <div className="settings-right-body-row">
            <Select
              sx={{ flex: "1" }}
              value={model}
              // setModel(e.target.value)
              onChange={(e) => {
                setModel(e.target.value);
              }}
            >
              <MenuItem value={"gpt-4-1106-preview"}>
                {t("GPT-4 Turbo")}
              </MenuItem>
              <MenuItem value={"gpt-4-vision-preview"}>
                {t("GPT-4 Turbo with vision")}
              </MenuItem>
              <MenuItem value={"gpt-4"}>{t("GPT-4")}</MenuItem>
              <MenuItem value={"gpt-3.5-turbo-1106"}>
                {t("GPT-3.5 Turbo")}
              </MenuItem>
            </Select>
            <Button
              variant="contained"
              className="input-settings-right-body-row"
              onClick={UpdateHandler}
            >
              {t("Update Model")}
            </Button>
          </div>
          <p className="input-label-settings-right-body-row-desc">
            *{renderGPTDesc()}
          </p>
          <p className="input-label-settings-right-body-row">
            {t("Model Temperature")} :
          </p>
          <div
            className="settings-right-body-row"
            style={{ marginBottom: "20px" }}
          >
            <Slider
              sx={{ color: "#3464c4" }}
              defaultValue={0.7}
              value={llm_temperature}
              step={0.1}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              max={1}
              min={0}
              onChange={(e) => {
                setLlm_temperature(e.target.value);
              }}
            />
            <div className="abs-items-settings-right-body-row">
              <p>0.0 ({t("Reserved")})</p>
              <p>({t("Creative")}) 1.0</p>
            </div>
          </div>
          <p className="input-label-settings-right-body-row-desc">
            *Temperature is a parameter that controls the “creativity” or
            randomness of the text generated. A higher temperature (e.g., 0.7)
            results in more diverse and creative output, while a lower
            temperature (e.g., 0.2) makes the output more deterministic and
            focused
          </p>
          <Button
            fullWidth
            variant="contained"
            className="input-settings-right-body-row"
            onClick={UpdateHandler}
          >
            {t("Update Temperature")}
          </Button>
          <Button
            fullWidth
            variant="contained"
            className="input-settings-right-body-row"
          >
            {t("Reset Default")}
          </Button>
        </div>
      </div>
    );
  }
  return content;
};

export default ModelConfiguration;
