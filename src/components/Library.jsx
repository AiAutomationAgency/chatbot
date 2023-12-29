import React, { useEffect, useState } from "react";
import "../assets/css/library.css";
import { TextField } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import { useNavigate } from "react-router-dom";
import CustomDataGrid from "./CustomDataGrid";
import { useFilterLibraryMutation } from "../features/Library/LibraryApiSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentIsFiltered,
  selectCurrentIsOpen,
  selectCurrentSidebar,
  selectCurrentSidebarFiles,
  setSidebarFiles,
  toggleIsFiltered,
  toggleSidebar,
} from "../features/Library/LibrarySlice";

import FilesLibraryListItem from "./FilesLibraryListItem";
import BadgeWithName from "./BadgeWithName";
import ButtonNav from "./ButtonNav";
import { useTranslation } from "react-i18next";
const Library = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [topic, setTopic] = useState("");
  const [mesure, setMesure] = useState("");

  const open = useSelector(selectCurrentIsOpen);

  const sidebar = useSelector(selectCurrentSidebar);
  const sidebarFiles = useSelector(selectCurrentSidebarFiles);
  const [filterLibrary] = useFilterLibraryMutation();

  const isFiltered = useSelector(selectCurrentIsFiltered);

  const dispatch = useDispatch();

  useEffect(() => {
    const header = document.querySelector(".lc-right-header");
    const body = document.querySelector(".lc-right-history");
    const footer = document.querySelector(".lc-right-footer");

    if (open) {
      setTimeout(() => {
        header?.classList.remove("closed");
        body?.classList.remove("closed");
        footer?.classList.remove("closed");
      }, 200);
    } else {
      setTimeout(() => {
        header?.classList.add("closed");
        body?.classList.add("closed");
        footer?.classList.add("closed");
      }, 100);
    }
  }, [open]);

  const FilterHandler = async (e) => {
    e.preventDefault();
    let isTopicNow = false;
    let isMeasureNow = false;
    if (topic !== "") {
      isTopicNow = true;
    }
    if (mesure !== "") {
      isMeasureNow = true;
    }
    if (isTopicNow && isMeasureNow) {
      await filterLibrary({ Topic: topic, Measure: mesure });
    } else if (isTopicNow && !isMeasureNow) {
      await filterLibrary({ Topic: topic });
    } else if (!isTopicNow && isMeasureNow) {
      await filterLibrary({ Measure: mesure });
    }
    HandleCloseFilterBar();
  };

  const HandleCloseFileBar = (files) => {
    dispatch(toggleSidebar({ sidebar: "files", isOpen: false }));
    dispatch(setSidebarFiles(files));
  };
  const HandleCloseFilterBar = () => {
    dispatch(toggleSidebar({ sidebar: "filters", isOpen: false }));
  };
  const CancelFilter = (e) => {
    e.preventDefault();
    dispatch(toggleIsFiltered(false));
  };

  const clickFilters = () => {
    dispatch(toggleSidebar({ sidebar: "filters", isOpen: true }));
  };

  const renderSidebar = () => {
    let content;

    if (sidebar === "filters") {
      content = (
        <div className={open ? "lc-right" : "lc-right closed"}>
          <div className="lc-right-header">
            <p>{t("Filters")}</p>
            <ButtonNav
              Comp={CloseIcon}
              text={t("Close")}
              onClick={(e) => {
                HandleCloseFilterBar();
              }}
            />
          </div>
          <ul className="lc-right-history">
            <TextField
              label={t("Topic")}
              variant="outlined"
              className="lc-rf-form-input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <TextField
              label={t("Measure")}
              variant="outlined"
              className="lc-rf-form-input"
              value={mesure}
              onChange={(e) => setMesure(e.target.value)}
            />
          </ul>

          <div className="lc-right-footer" style={{ flexDirection: "column" }}>
            {isFiltered ? (
              <button className="lc-rf-button" onClick={CancelFilter}>
                <FilterAltOutlinedIcon />
                {t("Cancel")}
              </button>
            ) : null}
            <button className="lc-rf-button" onClick={FilterHandler}>
              <FilterAltOutlinedIcon fontSize="30px" />
              {t("Filter")}
            </button>
          </div>
        </div>
      );
    } else {
      content = (
        <div className={open ? "lc-right" : "lc-right closed"}>
          <div className="lc-right-header">
            <BadgeWithName name={t("Files")} length={sidebarFiles.length} />
            <ButtonNav
              Comp={CloseIcon}
              text={t("Close")}
              onClick={(e) => {
                HandleCloseFileBar(sidebarFiles);
              }}
            />
          </div>
          <ul className="lc-right-history">
            {sidebarFiles.length !== 0
              ? sidebarFiles.map((it, ind) => {
                  return <FilesLibraryListItem item={it} key={ind} />;
                })
              : null}
          </ul>
        </div>
      );
    }
    return content;
  };

  return (
    <div className="library-container" style={{ position: "relative" }}>
      <div className="lc-left">
        <div
          className="lc-left-header"
          style={!open ? { borderRadius: " 20px 20px 0 0" } : null}
        >
          <div className="lc-lh-left">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/library")}
            >
              {t("Library")}
            </span>
          </div>

          <div className="lc-lh-right">
            <ButtonNav Comp={CachedOutlinedIcon} text={t("Refresh")} />
            <ButtonNav
              Comp={FilterAltOutlinedIcon}
              text={t("Filter")}
              onClick={clickFilters}
            />
          </div>
        </div>

        <div className="lc-left-content">
          <div className="lc-lc-top">
            {/* <div className="lc-lc-top-search">
                            <TextField
                                className='lc-lc-top-search-input'
                                variant="outlined"
                                placeholder='Search Library'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div> */}

            <div className="lc-lc-top-buttons">
              <ButtonNav Comp={FileUploadOutlinedIcon} text={t("Import")} />
              <ButtonNav Comp={FileDownloadOutlinedIcon} text={t("Export")} />
            </div>
          </div>

          <div className="lc-lc-bottom">
            <CustomDataGrid />
          </div>
        </div>
      </div>
      {renderSidebar()}
    </div>
  );
};

export default Library;
