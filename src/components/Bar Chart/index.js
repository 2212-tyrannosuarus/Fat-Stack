import React, { useEffect, useRef, useState } from "react";

import {
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryLegend,
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
    const {chartData} = props;
    let [barChartCredit, setBarChartCredit] = useState([]);
    let [barChartDebit, setBarChartDebit] = useState([]);
    console.log('chartData ', chartData.flat().slice(0, -1));
    console.log('barChart Credit ', barChartCredit);
    console.log('barChart Debit ', barChartDebit);

    useEffect(() => {
      barChartCredit = [];
      barChartDebit = [];
      let chartArr = chartData.flat().slice(0, -1);
       for (let i = 0; i < chartArr.length; i++) {
        let monthIndex = parseInt(chartArr[i].yearmonth.split('-')[1]);
        let currMonth = MONTHS[monthIndex - 1];
        let currYear = chartArr[i].yearmonth.split('-')[0].slice(2);
        if (chartArr[i].credit_debit === 'credit') {
          barChartCredit.push({monthYear: `${currMonth} ${currYear}`, total: parseInt(chartArr[i].transactionAmount)})
        }
        else if (chartArr[i].credit_debit === 'debit') {
          barChartDebit.push({monthYear: `${currMonth} ${currYear}`, total: parseInt(chartArr[i].transactionAmount)})
        }
       }
        setBarChartCredit(barChartCredit.slice(6));
        setBarChartDebit(barChartDebit.slice(6));
        
    }, [setBarChartCredit, setBarChartDebit, chartData]);
   

  return (
    <div className="my-budget-graph-container">
      {barChartCredit && barChartDebit ? (
        <VictoryChart
        domainPadding={30}
        padding={{ top: 10, bottom: 27, left: 50, right: 5 }}
      >
  
         <VictoryLegend x={125} y={10}
          orientation="horizontal"
          gutter={50}
          colorScale={["#9798fe", "#ff7960"]}
          data={[
            { name: "Income" }, { name: "Total Expenses" }
          ]}
        />
  
        <VictoryGroup
          offset={16}>
          <VictoryBar
            color='#9798fe'
            // animate={{ duration: 2000 }}
            data={barChartCredit}
            x="monthYear"
            y="total"
            tickFormat={(t) => `${t}k`}
          />
          <VictoryBar
            color='#ff7960'
            // animate={{ duration: 2000, onLoad: { duration: 4000 } }}
            data={barChartDebit}
            x="monthYear"
            y="total"
          />
        </VictoryGroup>
  
      </VictoryChart>
      ): "Loading"}
    
  </div>
  
  )
};

export default BarChart;

