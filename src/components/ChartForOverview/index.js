import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchOverviewChartData,
  selectOverviewChartData,
} from "../../reducers/trendsPageSLice";
import {
  VictoryChart,
  VictoryArea,
  VictoryGroup,
  VictoryStack,
  VictoryLine,
  VictoryLegend,
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

const ChartForOVerview = (props) => {
  //   const { userId } = useParams();
  const { userId } = props;
  const dispatch = useDispatch();

  const overviewChartData = useSelector(selectOverviewChartData);
  console.log("overview chart data ", overviewChartData.flat().slice(0, -1));
  const [dateToday, setDateToday] = useState(new Date());
  let [chartdataLastMonth, setChartDataLastMonth] = useState([]);
  let [chartdataThisMonth, setChartDataThisMonth] = useState([]);

  let lastMonthArr = [];
  let thisMonthArr = [];

  if (overviewChartData.flat().slice(0, -1).length > 0) {
    let chartDataArr = overviewChartData.flat().slice(0, -1);
    let lastMonth = chartDataArr[0].yearmonthday.split("-")[1];
    let thisMonth =
      chartDataArr[chartDataArr.length - 1].yearmonthday.split("-")[1];
    chartdataLastMonth = [];
    chartdataThisMonth = [];

    // creating two arrays with data from last month and data from this month and aggregating each successive y value
    let newMonthStarted = false;
    for (let i = 0; i < chartDataArr.length; i++) {
      if (chartDataArr[i].yearmonthday.split("-")[1] === lastMonth) {
        if (i === 0) {
          let date = new Date();
          date.setDate(parseInt(chartDataArr[i].yearmonthday.split("-")[2]));
          chartdataLastMonth.push({
            x: date.getDate(),
            y: parseInt(chartDataArr[i].transactionAmount),
          });
        } else {
          let date = new Date();
          date.setDate(parseInt(chartDataArr[i].yearmonthday.split("-")[2]));
          chartdataLastMonth.push({
            x: date.getDate(),
            y:
              parseInt(chartDataArr[i].transactionAmount) +
              parseInt(chartdataLastMonth[i - 1].y),
          });
        }
      } else if (chartDataArr[i].yearmonthday.split("-")[1] === thisMonth) {
        if (newMonthStarted === false) {
          let date = new Date();
          date.setDate(parseInt(chartDataArr[i].yearmonthday.split("-")[2]));
          chartdataThisMonth.push({
            x: date.getDate(),
            y: parseInt(chartDataArr[i].transactionAmount),
          });
          newMonthStarted = true;
        } else {
          let date = new Date();
          date.setDate(parseInt(chartDataArr[i].yearmonthday.split("-")[2]));
          chartdataThisMonth.push({
            x: date.getDate(),
            y:
              parseInt(chartDataArr[i].transactionAmount) +
              parseInt(chartdataThisMonth[chartdataThisMonth.length - 1].y),
          });
        }
      }
    }

    console.log("chartdataLastMonth ", chartdataLastMonth);
    console.log("chartDataThisMonth ", chartdataThisMonth);

    lastMonthArr = [];
    thisMonthArr = [];

    let pointerlastMonth = 0;
    let pointerThisMonth = 0;
    let lastElementIndex = 0;

    // calculations for lastMonthArr - adding interpolation points that exist in this month arr but not in last month arr
    for (let i = 0; i < chartdataLastMonth.length; i++) {
      let alreadyexists = false;
      if (chartdataLastMonth[i].x === chartdataThisMonth[pointerThisMonth].x) {
        console.log(' i ', i, ' pointerThisMonth ', pointerThisMonth, ' chartdataLastMonth[i].x ', chartdataLastMonth[i].x, ' chartdataThisMonth[pointerThisMonth].x ', chartdataThisMonth[pointerThisMonth].x)
        lastMonthArr.push({
          x: chartdataLastMonth[i].x,
          y: chartdataLastMonth[i].y,
        });
        pointerThisMonth++;
        console.log(' lastMonthArr ', lastMonthArr);
      } else if (
        chartdataLastMonth[i].x < chartdataThisMonth[pointerThisMonth].x
      ) {
        console.log(' i ', i, ' pointerThisMonth ', pointerThisMonth, ' chartdataLastMonth[i].x ', chartdataLastMonth[i].x, ' chartdataThisMonth[pointerThisMonth].x ', chartdataThisMonth[pointerThisMonth].x)
        lastMonthArr.push({
          x: chartdataLastMonth[i].x,
          y: chartdataLastMonth[i].y,
        });
        console.log(' lastMonthArr ', lastMonthArr);
      } else {
        console.log(' i ', i, ' pointerThisMonth ', pointerThisMonth, ' chartdataLastMonth[i].x ', chartdataLastMonth[i].x, ' chartdataThisMonth[pointerThisMonth].x ', chartdataThisMonth[pointerThisMonth].x)
        for (let j = 0; j < lastMonthArr.length; j++) {
          if (lastMonthArr[j].x === chartdataThisMonth[pointerThisMonth].x)
            alreadyexists = true;
        }
        if (!alreadyexists) {
          lastMonthArr.push({
            x: chartdataThisMonth[pointerThisMonth].x,
            y: chartdataLastMonth[i - 1].y,
          });
          lastMonthArr.push({
            x: chartdataLastMonth[i].x,
            y: chartdataLastMonth[i].y,
          });
          pointerThisMonth++;
        } else {
          lastMonthArr.push({
            x: chartdataLastMonth[i].x,
            y: chartdataLastMonth[i].y,
          });
        }
        console.log(' lastMonthArr ', lastMonthArr);
      }
      if (pointerThisMonth === chartdataThisMonth.length - 1) {
        lastElementIndex = i;
        break;
      }
    }

    if (lastElementIndex > 0) {
      for (let i = lastElementIndex + 1; i < chartdataLastMonth.length; i++) {
        console.log('inside lastElementIndex > 0 , chartdataLastMonth[i].x ',  chartdataLastMonth[i].x, ' i ', i)
        lastMonthArr.push({
          x: chartdataLastMonth[i].x,
          y: chartdataLastMonth[i].y,
        });
      }
    }

    if (pointerThisMonth < chartdataThisMonth.length) {
      console.log(' inside ')
      
      for (let i = pointerThisMonth + 1; i < chartdataThisMonth.length; i++) {
        let alreadyexists = false;
        console.log(' i ', i, ' chartdataThisMonth[i].x ', chartdataThisMonth[i].x)
        for (let j = 0; j < lastMonthArr.length; j++) {
          if (lastMonthArr[j].x === chartdataThisMonth[i].x)
            alreadyexists = true;
        }
        console.log('alreadyexists ', alreadyexists)
        if (!alreadyexists) {
          let indexOfLastMonth = 0;
          for (let j = 0; j < lastMonthArr.length; j++) {
            if (lastMonthArr[j].x > chartdataThisMonth[i].x) {
              indexOfLastMonth = j - 1;
              console.log(' j - 1 ', indexOfLastMonth)
              break;
            }
          }
          lastMonthArr.push({
            x: chartdataThisMonth[i].x,
            y: lastMonthArr[indexOfLastMonth].y,
          });
      }
    }
  }

    console.log("lastMonthArr ", lastMonthArr);

    let lastElement = 0;
    // calculations for thisMonthArr - adding interpolation points that exist in last month arr but not in this month arr
    for (let i = 0; i < chartdataThisMonth.length; i++) {
      let alreadyexists = false;
      if (chartdataThisMonth[i].x === chartdataLastMonth[pointerlastMonth].x) {
        console.log(' i ', i, ' pointerlastMonth ', pointerlastMonth, ' chartdataThisMonth[i].x ', chartdataThisMonth[i].x, ' chartdataLastMonth[pointerlastMonth].x ', chartdataLastMonth[pointerlastMonth].x)
        thisMonthArr.push({
          x: chartdataThisMonth[i].x,
          y: chartdataThisMonth[i].y,
        });
        pointerlastMonth++;
      } else if (
        chartdataThisMonth[i].x < chartdataLastMonth[pointerlastMonth].x
      ) {
        console.log(' i ', i, ' pointerlastMonth ', pointerlastMonth, ' chartdataThisMonth[i].x ', chartdataThisMonth[i].x, ' chartdataLastMonth[pointerlastMonth].x ', chartdataLastMonth[pointerlastMonth].x)
        thisMonthArr.push({
          x: chartdataThisMonth[i].x,
          y: chartdataThisMonth[i].y,
        });
      } else {
        console.log(' i ', i, ' pointerlastMonth ', pointerlastMonth, ' chartdataThisMonth[i].x ', chartdataThisMonth[i].x, ' chartdataLastMonth[pointerlastMonth].x ', chartdataLastMonth[pointerlastMonth].x)
        for (let j = 0; j < thisMonthArr.length; j++) {
          if (thisMonthArr[j].x === chartdataLastMonth[pointerlastMonth].x)
            alreadyexists = true;
        }
        if (!alreadyexists) {
          thisMonthArr.push({
            x: chartdataLastMonth[pointerlastMonth].x,
            y: chartdataThisMonth[i - 1].y,
          });
          thisMonthArr.push({
            x: chartdataThisMonth[i].x,
            y: chartdataThisMonth[i].y,
          });
          pointerlastMonth++;
        } else {
          thisMonthArr.push({
            x: chartdataThisMonth[i].x,
            y: chartdataThisMonth[i].y,
          });
        }
      }
      lastElement = thisMonthArr[thisMonthArr.length - 1].x;
    }

    console.log("thisMonthArr after 1st iteration", thisMonthArr);
    console.log('pointerlastMonth ', pointerlastMonth);
    console.log(' lastElement ', lastElement)

    for (let i = pointerlastMonth + 1; i < chartdataLastMonth.length; i++) {
      let alreadyexists = false;
      console.log('i ', i, ' chartdataLastMonth[i] ', chartdataLastMonth[i])

      if (chartdataLastMonth[i].x < lastElement) {
        for (let j = 0; j < thisMonthArr.length; j++) {
          if (thisMonthArr[j].x === chartdataLastMonth[i].x)
            alreadyexists = true;
        }
        console.log(' alreadyexists ', alreadyexists);

        if (!alreadyexists) {
          let indexInThisMonth = 0;
          for (let j = 0; j < thisMonthArr.length; j++) {
            if (chartdataLastMonth[i].x < thisMonthArr[j].x) {
              indexInThisMonth = j - 1;
              console.log(' indexInThisMonth ', indexInThisMonth)
              break;
            }
          }
          thisMonthArr.push({
            x: chartdataLastMonth[i].x,
            y: thisMonthArr[indexInThisMonth].y,
          });
        }
      }
    }
    console.log("thisMonthArr ", thisMonthArr);
    thisMonthArr.sort((a,b) => a.x - b.x);
    lastMonthArr.sort((a,b) => a.x - b.x);
    console.log("lastMonthArr before slice", lastMonthArr);
    // slicing data set for laxt month to match this month arr length to be able to show data uptil the current date.
    lastMonthArr = lastMonthArr.slice(0, thisMonthArr.length); 
    console.log("lastMonthArr after slice", lastMonthArr);
  }

  useEffect(() => {
    chartdataLastMonth = [];
    chartdataThisMonth = [];
    let todaysDate = (dateToday.toString() + 1).split(" ");
    let currentMonth = "";
    if ((dateToday.getMonth() + 1).toString().length === 1) {
      currentMonth = `0${(dateToday.getMonth() + 1).toString()}`;
    } else {
      currentMonth = (dateToday.getMonth() + 1).toString();
    }
    let startingDate = `2023-02-01`;
    let endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`;

    async function getOverviewChartData() {
      await dispatch(
        fetchOverviewChartData({
          userId: userId,
          fromDate: startingDate,
          toDate: endingDate,
        })
      );
    }
    getOverviewChartData();

    setChartDataLastMonth(chartdataLastMonth);
    setChartDataThisMonth(chartdataThisMonth);
  }, [dispatch]);

  return (
    <>
      {overviewChartData && overviewChartData.flat().slice(0, -1).length ? (
        <VictoryChart width={800} height={400}>
          <VictoryLegend
            x={125}
            y={10}
            title={
              thisMonthArr[thisMonthArr.length - 1].y -
                lastMonthArr[lastMonthArr.length - 1].y >
              0
                ? `$${
                    thisMonthArr[thisMonthArr.length - 1].y -
                    lastMonthArr[lastMonthArr.length - 1].y
                  }  more than last month all spending`
                : `$${
                    lastMonthArr[lastMonthArr.length - 1].y -
                    thisMonthArr[thisMonthArr.length - 1].y
                  } less than last month all spending`
            }
            orientation="horizontal"
            gutter={20}
            //   style={{ border: { stroke: "black" } }}
            colorScale={["#b5b6ff", "#a8b3bd"]}
            data={[{ name: "Now" }, { name: "Last Month" }]}
          />
          <VictoryGroup
            style={{
              data: { strokeWidth: 3, fillOpacity: 0.4 },
            }}
          >
            <VictoryArea
              interpolation="natural"
              style={{
                data: { fill: "#b5b6ff", stroke: "#b5b6ff", fillOpacity: 0.7 },
              }}
              data={thisMonthArr}
            />
            <VictoryLine
              interpolation="natural"
              style={{
                data: { stroke: "#a8b3bd" },
                parent: { border: "1px solid #a8b3bd" },
              }}
              data={lastMonthArr}
            />
          </VictoryGroup>
          <VictoryAxis label="Day of month" />

          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => `$${x}`}
            style={{ tickLabels: { fontSize: 15, padding: 5 } }}
          />
        </VictoryChart>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default ChartForOVerview;
