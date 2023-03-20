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

const PieChartMerchant = (props) => {
  const { chartData } = props;
  let [pieChartMerchant, setPieChartMerchant] = useState([]);
  let [legendMerchant, setLegendMerchant] = useState([]);
  console.log("pieChartMerchant data ", chartData.flat().slice(0, -1));
  console.log("pie chart merchant state", pieChartMerchant);
  console.log("legend merchant", legendMerchant);

  useEffect(() => {
    let chartArr = chartData.flat().slice(0, -1);
    let pieChartMerchantArr = [];
    let legendMerchantArr = [];
    for (let i = 0; i < chartArr.length; i++) {
      pieChartMerchantArr.push({
        x: chartArr[i].merchant,
        y: parseInt(chartArr[i].transactionAmount),
      });
      legendMerchantArr.push({name: chartArr[i].merchant});
    }
    setPieChartMerchant(pieChartMerchantArr);
    setLegendMerchant(legendMerchantArr);
  }, [setPieChartMerchant, chartData]);

  return (
    <div className="row">
        <div className="col-8 border-svg">
      {pieChartMerchant && legendMerchant? (
        
          <svg width="500" height="500" viewBox="0 0 400 400" >
          
            <VictoryPie
              standalone={false}
              width={400}
              height={400}
              colorScale={["#ff7960", "#fec44d", "#54d4f1", "#9798fe", "#9ce775", "#a8b3bd", "#65717d"]}
              data={pieChartMerchant}
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
          data={legendMerchant}
        />
        </div>
    </div>
  );
};

export default PieChartMerchant;
