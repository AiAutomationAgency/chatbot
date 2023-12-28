import { DataGrid } from "@mui/x-data-grid";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { useFetchLibraryQuery } from "../features/Library/LibraryApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentIsFiltered,
  selectCurrentLibraryFiltered,
  setSidebarFiles,
  toggleSidebar,
} from "../features/Library/LibrarySlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { nlNL, frFR, enUS } from "@mui/x-data-grid";
import { selectCurrentLang } from "../features/settings/SettingsSlice";

export default function CustomDataGrid() {
  const { t } = useTranslation();
  const language = useSelector(selectCurrentLang);
  const { data, isLoading, isSuccess, refetch } = useFetchLibraryQuery();
  const isFiltered = useSelector(selectCurrentIsFiltered);
  const filteredLibrary = useSelector(selectCurrentLibraryFiltered);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickFiles = (files) => {
    dispatch(toggleSidebar({ sidebar: "files", isOpen: true }));
    dispatch(setSidebarFiles(files));
  };
  const columns = [
    {
      field: "project_name",
      headerName: t("Project name"),
      width: 150,
      hide: true,
    },
    {
      field: "werkinhood",
      headerName: t("Work content"),
      width: 150,
      hide: true,
    },
    { field: "client", headerName: t("Client"), width: 150, hide: true },
    {
      field: "timestamp",
      headerName: t("Created date"),
      width: 150,
      hide: true,
    },
    // { field: "status",headerName:t("Status"),width:150, hide: true },
    { field: "result", headerName: t("Result"), width: 150, hide: true },
    { field: "enclosure", headerName: t("Enclosure"), width: 150, hide: true },
    { field: "status", headerName: t("Status"), width: 150, hide: true },
    {
      field: "contract_type",
      headerName: t("Contract type"),
      width: 150,
      hide: true,
    },
    {
      field: "files",
      headerName: t("Files"),
      width: 100,
      hide: false,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <IconButton
            onClick={() => {
              clickFiles(params.value);
            }}
          >
            <LastPageIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  useEffect(() => {
    let arr = [];
    if (data?.length !== 0 && isSuccess) {
      data?.map((p) => {
        const obj = {
          ...p,
          id: p.project_id,
          timestamp: p.timestamp.split("T")[0],
          files: p.files,
          status: p.status || "in progress",
          contract_type: p.contract_type || "NAN",
          enclosure: p.enclosure || "NAN",
          result: p.result || "Pending",
          client: p.client || "NAN",
        };
        return arr.push(obj);
      });
      setProjects(arr);
    }
  }, [isLoading, data, isSuccess]);
  useEffect(() => {
    let arr = [];
    if (isFiltered) {
      filteredLibrary?.map((p) => {
        const obj = {
          ...p,
          id: p.project_id,
          timestamp: p.timestamp.split("T")[0],
        };
        return arr.push(obj);
      });
    } else {
      data?.map((p) => {
        const obj = {
          ...p,
          id: p.project_id,
          timestamp: p.timestamp.split("T")[0],
        };
        return arr.push(obj);
      });
    }
    setProjects(arr);
  }, [isFiltered, filteredLibrary, data]);
  const handleCellClick = (params) => {
    if (params.field !== "files") {
      navigate(`/projects/${params.id}`);
    }
  };
  useEffect(() => {
    const reFetch = async () => {
      await refetch();
    };
    let isMounted = true;
    if (isMounted) {
      reFetch();
    }
    return () => {
      isMounted = false;
    };
  }, [refetch]);
  const LanguageChanger = () => {
    if (language === "FR") {
      return frFR.components.MuiDataGrid.defaultProps.localeText;
    } else if (language === "NL") {
      return nlNL.components.MuiDataGrid.defaultProps.localeText;
    } else {
      return enUS.components.MuiDataGrid.defaultProps.localeText;
    }
  };
  let content;
  if (isLoading) {
    content = (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            sx={{ border: "none", boxShadow: "var(--box-shadow)" }}
            // {...data}
            columns={columns}
            rows={projects}
            loading={true}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
            disableRowSelectionOnClick
            onCellClick={handleCellClick}
          />
        </div>
      </div>
    );
  } else {
    content = (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            sx={{ border: "none", boxShadow: "var(--box-shadow)" }}
            // {...data}
            columns={columns}
            rows={projects}
            loading={false}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            localeText={LanguageChanger()}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
            disableRowSelectionOnClick
            onCellClick={handleCellClick}
          />
        </div>
      </div>
    );
  }
  return content;
}
