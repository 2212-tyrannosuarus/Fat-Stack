import React, { useEffect, useRef, useState } from "react";

import {
  VictoryPie,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryLabel,
  VictoryContainer
} from "victory";

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
  const { chartData } = props;
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
      legendArr.push({name: chartArr[i].categoryName});
    }
    setPieChart(pieChartArr);
    setLegend(legendArr);
  }, [setPieChart, chartData]);

  return (
    <div className="row">
        <div className="col-8 border-svg">
      {pieChart && legend? (
        
          <svg width="500" height="500" viewBox="0 0 400 400" >
          
            <VictoryPie
              standalone={false}
              width={400}
              height={400}
              colorScale={["#ff7960", "#fec44d", "#54d4f1", "#9798fe", "#9ce775", "#a8b3bd", "#65717d"]}
              data={pieChart}
              innerRadius={68}
              labelRadius={100}
            />
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 20 }}
              x={200}
              y={200}
              text="Pie!"
            />
          </svg>
          
      ) : (
        "Loading in pie chart"
      )}
      </div>
      <div className="col-4 border-svg">
      <VictoryLegend 
          colorScale={["#ff7960", "#fec44d", "#54d4f1", "#9798fe", "#9ce775", "#a8b3bd", "#65717d"]}
          data={legend}
        />
        </div>
    </div>
  );
};

export default PieChartCategory;
