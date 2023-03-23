import React, { useEffect, useRef, useState } from "react";

import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryContainer,
  VictoryAxis,
} from "victory";
import { Select } from "@chakra-ui/react";
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

const BarChartForModal = (props) => {
  const {
    chartData
  } = props;
  //   let [barChartCredit, setBarChartCredit] = useState([]);
  let [barChartDebit, setBarChartDebit] = useState([]);
  console.log("chartData sub category", chartData.flat().slice(0, -1));
  let totalAmount = 0;
    let count = 0;
    let average = 0;

  useEffect(() => {

    if (chartData !== undefined) {
      barChartDebit = [];
      
      let chartArr = chartData.flat().slice(0, -1);
      for (let i = 0; i < chartArr.length; i++) {
        let monthIndex = parseInt(chartArr[i].yearmonth.split("-")[1]);
        let currMonth = MONTHS[monthIndex - 1];
        let currYear = chartArr[i].yearmonth.split("-")[0].slice(2);

        if (chartArr[i].credit_debit === "debit") {
          barChartDebit.push({
            monthYear: `${currMonth} ${currYear}`,
            total: parseInt(chartArr[i].transactionAmount),
          });
        }
      }
      console.log("barChartDebit ", barChartDebit);

      setBarChartDebit(barChartDebit.slice(6));
      barChartDebit.forEach(item => {
        totalAmount+= item.total;
        count++;
      })
      average = totalAmount / count;
    } else {
      console.log("No data to display");
    }
  }, [setBarChartDebit, chartData]);

  return (
    <div className="container">
      

      {chartData &&
      chartData.length &&
      chartData.flat().slice(0, -1)[0] !== undefined &&
      barChartDebit ? (
        <div className="row border">
          <div className="col-12 p-0 border">
        <VictoryChart
          domainPadding={50}
          padding={{ top: 200, bottom: 100, left: 100, right: 5 }}
          height={700}
          width={800}
        >
          <VictoryLegend
            x={200}
            y={60}
            orientation="horizontal"
            gutter={50}
            colorScale={["#ff7960"]}
            data={[
              { name: `${chartData.flat().slice(0, -1)[0].subcategoryName}` },
            ]}
            style={{ labels: { fontSize: 25 } }}
          />

          <VictoryAxis
            label={` Last 6 months average`}
            style={{
              tickLabels: { fontSize: 25, padding: 5 },
              axisLabel: { fontSize: 30, padding: 50 },
            }}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => `$${x}`}
            style={{ tickLabels: { fontSize: 25, padding: 5 } }}
          />

          <VictoryGroup offset={25}>
            <VictoryBar
              color="#ff7960"
              // animate={{ duration: 2000, onLoad: { duration: 4000 } }}
              data={barChartDebit}
              x="monthYear"
              y="total"
              style={{ tickLabels: { fontSize: 15, padding: 5 } }}
              barRatio={0.8}
            />
          </VictoryGroup>
        </VictoryChart>
        </div>

        
        </div>
      ) : (
        <img src="./assets/placeholderGraph.png" width="300" height="800" alt="" className="mt-4 pt-4"/>
      )}
    </div>
  );
};

export default BarChartForModal;
