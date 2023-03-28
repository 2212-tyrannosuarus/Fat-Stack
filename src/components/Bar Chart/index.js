import React, { useEffect, useRef, useState } from "react";

import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryContainer,
  VictoryAxis,
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

const BarChart = (props) => {
  const { chartData } = props;
  let [barChartCredit, setBarChartCredit] = useState([]);
  let [barChartDebit, setBarChartDebit] = useState([]);

  useEffect(() => {
    barChartCredit = [];
    barChartDebit = [];
    let chartArr = chartData.flat().slice(0, -1);
    for (let i = 0; i < chartArr.length; i++) {
      let monthIndex = parseInt(chartArr[i].yearmonth.split("-")[1]);
      let currMonth = MONTHS[monthIndex - 1];
      let currYear = chartArr[i].yearmonth.split("-")[0].slice(2);
      if (chartArr[i].credit_debit === "credit") {
        barChartCredit.push({
          monthYear: `${currMonth} ${currYear}`,
          total: parseInt(chartArr[i].transactionAmount),
        });
      } else if (chartArr[i].credit_debit === "debit") {
        barChartDebit.push({
          monthYear: `${currMonth} ${currYear}`,
          total: parseInt(chartArr[i].transactionAmount),
        });
      }
    }
    setBarChartCredit(barChartCredit.slice(6));
    setBarChartDebit(barChartDebit.slice(6));
  }, [setBarChartCredit, setBarChartDebit, chartData]);

  return (
    <div className="container">
      {chartData &&
      chartData.length &&
      barChartCredit &&
      barChartCredit.length &&
      barChartDebit &&
      barChartDebit.length ? (
        <VictoryChart
          domainPadding={50}
          padding={{ top: 125, bottom: 100, left: 100, right: 5 }}
          height={600}
          width={700}
        >
          <VictoryLegend
            x={150}
            y={30}
            orientation="horizontal"
            gutter={50}
            colorScale={["#9798fe", "#ff7960"]}
            data={[{ name: "Income" }, { name: "Total Expenses" }]}
            style={{ labels: { fontSize: 25 } }}
          />

          <VictoryAxis
            label="Last 6 months"
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
              color="#9798fe"
              data={barChartCredit}
              x="monthYear"
              y="total"
              tickFormat={(t) => `${t}k`}
              style={{ tickLabels: { fontSize: 15, padding: 5 } }}
            />

            <VictoryBar
              color="#ff7960"
              data={barChartDebit}
              x="monthYear"
              y="total"
              style={{ tickLabels: { fontSize: 15, padding: 5 } }}
            />
          </VictoryGroup>
        </VictoryChart>
      ) : (
        <div className="row pl-4" align="center" style={{ width: "50vw" }}>
          <div className="col-12">No data to display</div>
        </div>
      )}
    </div>
  );
};

export default BarChart;
