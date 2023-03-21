import React, { useEffect, useRef, useState } from "react";

import {
  VictoryPie,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryLabel,
  VictoryContainer,
  VictoryTooltip
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
        <div className="col-8">
      {pieChartMerchant && legendMerchant? (
        
          <svg width="500" height="500" viewBox="0 0 400 400" >
          
            <VictoryPie
              standalone={false}
              width={400}
              height={400}
              colorScale={["#54d4f1", "#9ce775", "#9798fe", "#fec44d", "#ff7960", 
              "#a8b3bd", "#65717d", "#f56bdd", "#f5ec6b", "#9d9ad0", "#efdeb5", "#f69646", "#cdd9e1", ]}
              data={pieChartMerchant}
              innerRadius={68}
              labelRadius={100}
              labelComponent = {<VictoryTooltip/>}
            />
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 20 }}
              x={200}
              y={200}
              text="By Merchant"
            />
          </svg>
          
      ) : (
        "Loading in pie chart"
      )}
      </div>
      <div className="col-4 mt-n2">
      <VictoryLegend 
          colorScale={["#54d4f1", "#9ce775", "#9798fe", "#fec44d", "#ff7960", 
          "#a8b3bd", "#65717d", "#f56bdd", "#f5ec6b", "#9d9ad0", "#efdeb5", "#f69646", "#cdd9e1", ]}
          data={legendMerchant}
          style={{ labels: {fontSize: 25 }}}
          padding={{left: 60 }}
          margin={{top: 0 }}
        />
        </div>
    </div>
  );
};

export default PieChartMerchant;
