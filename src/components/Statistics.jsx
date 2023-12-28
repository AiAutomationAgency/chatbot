import React from "react";
import "../assets/css/statistics.css";
import { Doughnut, Bar, Line, Pie, Radar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";
import PageTransition from "./PageTransition";
import ButtonNav from "./ButtonNav";
import { useTranslation } from "react-i18next";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale
);
const Statistics = () => {
  const { t } = useTranslation();

  const data = {
    labels: [t("Lost"), t("Won"), t("Pending")],
    datasets: [
      {
        label: t("Bids"),
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const labels = [
    t("January"),
    t("February"),
    t("March"),
    t("April"),
    t("May"),
    t("June"),
    t("July"),
  ];

  const data2 = {
    labels: labels,
    datasets: [
      {
        label: t("Bids"),
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data3 = {
    labels: [
      t("Eating"),
      t("Drinking"),
      t("Sleeping"),
      t("Designing"),
      t("Coding"),
      t("Cycling"),
      t("Running"),
    ],
    datasets: [
      {
        label: "User 1",
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "User 1",
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };
  return (
    <div className="statistics-container">
      <div className="statistics-left">
        <div className="statistics-header">
          <div className="statistics-header-left">
            <span>{t("Statistics")}</span>
          </div>
          <div className="statistics-header-right">
            <ButtonNav Comp={FileUploadOutlinedIcon} text={t("Import")} />
            <ButtonNav Comp={FileDownloadOutlinedIcon} text={t("Export")} />
          </div>
        </div>
        <div className="statistics-left-body">
          <div className="statistics-left-body-row">
            <div className="statistics-left-body-row-item">
              <Doughnut
                width={"50%"}
                data={data}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: t("Average Bids Status"),
                    },
                  },
                }}
              />
            </div>
            <div className="statistics-left-body-row-item">
              <Bar
                height={300}
                data={data2}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: t("Bids per Month"),
                    },
                  },
                }}
              />
            </div>
            <div className="statistics-left-body-row-item">
              <Line
                height={300}
                data={data2}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: t("Bids per Month"),
                    },
                  },
                }}
              />
            </div>
            {/* <div className="statistics-left-body-row-item">
                            <Pie  data={data} options={{
                                responsive: true, plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Chart.js Doughnut Chart'
                                    }
                                }
                            }} />
                        </div> */}
            <div className="statistics-left-body-row-item">
              <Radar
                height={200}
                data={data3}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: t("Average Activity"),
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <PageTransition />
    </div>
  );
};

export default Statistics;
