import React, { useEffect, useRef, useState } from "react";

import {
  VictoryPie,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryLabel,
  VictoryContainer,
  VictoryTooltip,
} from "victory";
import "../Trends/Trends.css";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import Button from "react-bootstrap/Button";

const MONTHS = [
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
];

const PieChartCategory = (props) => {
  const {
    chartData,
    selectedDates,
    setSelectedDates,
    handleDateChangePieCategory,
  } = props;
  let [pieChart, setPieChart] = useState([]);
  let [legend, setLegend] = useState([]);
  console.log("pieChart data ", chartData.flat().slice(0, -1));
  console.log("pie chart ", pieChart);
  console.log("legend ", legend);

  useEffect(() => {
    let chartArr = chartData.flat().slice(0, -1);
    let pieChartArr = [];
    let legendArr = [];
    for (let i = 0; i < chartArr.length; i++) {
      pieChartArr.push({
        x: chartArr[i].categoryName,
        y: parseInt(chartArr[i].transactionAmount),
      });
      legendArr.push({ name: chartArr[i].categoryName });
    }
    setPieChart(pieChartArr);
    setLegend(legendArr);
  }, [setPieChart, chartData]);

  return (
    <div className="row">
      <div className="col-8">
        {pieChart && pieChart.length && legend ? (
          <svg width="500" height="700" viewBox="0 0 400 400">
            <VictoryPie
              standalone={false}
              width={400}
              height={400}
              colorScale={[
                "#54d4f1",
                "#9ce775",
                "#9798fe",
                "#fec44d",
                "#ff7960",
                "#a8b3bd",
                "#65717d",
                "#f56bdd",
                "#f5ec6b",
                "#9d9ad0",
                "#efdeb5",
                "#f69646",
                "#cdd9e1",
              ]}
              data={pieChart}
              innerRadius={68}
              labelRadius={100}
              labelComponent={<VictoryTooltip />}
              padding={{ left: 50 }}
            />
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 20 }}
              x={225}
              y={200}
              text="By Category"
            />
          </svg>
        ) : (
          <div className="row border pl-4" align="center" style={{width: "50vw"}}>
          <div className="col-12">
          No data to diaplay
          </div>
          </div>
        )}
      </div>
      <div className="col-4 mt-n1 ">
        <div className="" align="center">
          <h6 className="fw-bold mb-2 mt-2">Pick a date range</h6>
          <RangeDatepicker
            selectedDates={selectedDates}
            onDateChange={setSelectedDates}
            propsConfigs={{
              inputProps: {
                size: "lg",
                _active: {
                  border: "purple",
                },
                _visited: {
                  border: "purple",
                },
                _focus: {
                  border: "none",
                },
              },
            }}
          />
          <Button
            variant="outline-dark"
            onClick={() => handleDateChangePieCategory(selectedDates)}
            className="col-12 display-chart mt-3"
          >
            {" "}
            Display Chart
          </Button>
        </div>

        <VictoryLegend
          x={50}
          y={-300}
          colorScale={[
            "#54d4f1",
            "#9ce775",
            "#9798fe",
            "#fec44d",
            "#ff7960",
            "#a8b3bd",
            "#65717d",
            "#f56bdd",
            "#f5ec6b",
            "#9d9ad0",
            "#efdeb5",
            "#f69646",
            "#cdd9e1",
          ]}
          data={legend}
          style={{ labels: { fontSize: 35 } }}
        />
      </div>
    </div>
  );
};

export default PieChartCategory;
