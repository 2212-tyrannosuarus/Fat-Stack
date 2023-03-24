import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

export default function LineCart({ id, goal }) {
  const [dateArr, setDateArr] = useState([]);
  const [chartData, setChartData] = useState([
    {
      name: "Projected Path",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
    {
      name: "Recommended Path",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
    },
  ]);
  const [options, setChartOptions] = useState({
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#fff", "#3182CE"],
    },
    colors: ["#fff", "#3182CE"],
  });
  let ProjectedData = [];
  let RecommendedData = [];

  const handleDateCalculation = async () => {
    let start = moment(goal.start_date);
    let end = moment(goal.goal_date);
    let now = moment();
    let timePass = now.diff(start, "days", true);
    let dayDiff = end.diff(start, "days", true);
    console.log("timePass", timePass);

    let ProjectedIncr = (parseInt(goal.contributedamount) / timePass).toFixed(
      2
    );

    let RecommendedIncr = (parseInt(goal.goalamount) / dayDiff).toFixed(2);

    console.log("weekDiff", dayDiff);
    for (let i = 0; i < dayDiff; i++) {
      setDateArr(dateArr.push(start.add(1, "days").format("YYYY MM DD")));
      ProjectedData.push(parseInt((i * ProjectedIncr).toFixed(2)));
      RecommendedData.push(parseInt((i * RecommendedIncr).toFixed(2)));
    }

    setChartData([
      {
        name: "Current Path",
        data: ProjectedData,
      },
      {
        name: "Recommended Path",
        data: RecommendedData,
      },
    ]);
    setChartOptions({
      chart: {
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        theme: "dark",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "category",
        categories: dateArr,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#fff",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
            fontSize: "12px",
          },
        },
      },
      legend: {
        show: false,
      },
      grid: {
        strokeDashArray: 5,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 0.8,
          opacityTo: 0,
          stops: [],
        },
        colors: ["#fff", "#3182CE"],
      },
      colors: ["#fff", "#3182CE"],
    });
  };

  useEffect(() => {
    handleDateCalculation();
  }, [goal]);

  return (
    <>
      {goal ? (
        <ReactApexChart
          options={options}
          series={chartData}
          type="area"
          width="100%"
          height="100%"
        />
      ) : null}
    </>
  );
}
