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
import { connect } from "react-redux";

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

const ChartForOVerview = ({user}) => {
  //   const { userId } = useParams();
  console.log('user ', user);
  let userId = user.id;
  // const { userId } = props;
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
        lastMonthArr.push({
          x: chartdataLastMonth[i].x,
          y: chartdataLastMonth[i].y,
        });
        pointerThisMonth++;
      } else if (
        chartdataLastMonth[i].x < chartdataThisMonth[pointerThisMonth].x
      ) {
        lastMonthArr.push({
          x: chartdataLastMonth[i].x,
          y: chartdataLastMonth[i].y,
        });
      } else {
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
      }
      if (pointerThisMonth === chartdataThisMonth.length - 1) {
        lastElementIndex = i;
        break;
      }
    }

    if (lastElementIndex > 0) {
      for (let i = lastElementIndex + 1; i < chartdataLastMonth.length; i++) {
        lastMonthArr.push({
          x: chartdataLastMonth[i].x,
          y: chartdataLastMonth[i].y,
        });
      }
    }

    if (pointerThisMonth < chartdataThisMonth.length) {
      for (let i = pointerThisMonth + 1; i < chartdataThisMonth.length; i++) {
        let alreadyexists = false;
        for (let j = 0; j < lastMonthArr.length; j++) {
          if (lastMonthArr[j].x === chartdataThisMonth[i].x)
            alreadyexists = true;
        }
        if (!alreadyexists) {
          let indexOfLastMonth = 0;
          for (let j = 0; j < lastMonthArr.length; j++) {
            if (lastMonthArr[j].x > chartdataThisMonth[i].x) {
              indexOfLastMonth = j - 1;
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
        thisMonthArr.push({
          x: chartdataThisMonth[i].x,
          y: chartdataThisMonth[i].y,
        });
        pointerlastMonth++;
      } else if (
        chartdataThisMonth[i].x < chartdataLastMonth[pointerlastMonth].x
      ) {
        thisMonthArr.push({
          x: chartdataThisMonth[i].x,
          y: chartdataThisMonth[i].y,
        });
      } else {
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

    for (let i = pointerlastMonth + 1; i < chartdataLastMonth.length; i++) {
      let alreadyexists = false;

      if (chartdataLastMonth[i].x < lastElement) {
        for (let j = 0; j < thisMonthArr.length; j++) {
          if (thisMonthArr[j].x === chartdataLastMonth[i].x)
            alreadyexists = true;
        }

        if (!alreadyexists) {
          let indexInThisMonth = 0;
          for (let j = 0; j < thisMonthArr.length; j++) {
            if (chartdataLastMonth[i].x < thisMonthArr[j].x) {
              indexInThisMonth = j - 1;
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
    thisMonthArr.sort((a, b) => a.x - b.x);
    lastMonthArr.sort((a, b) => a.x - b.x);
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
    if (window.localStorage.getItem('token') && user.id !== undefined) {
      userId = user.id;
      getOverviewChartData();
    }
    

    setChartDataLastMonth(chartdataLastMonth);
    setChartDataThisMonth(chartdataThisMonth);
  }, [dispatch]);

  return (
    <>
      {overviewChartData && overviewChartData.flat().slice(0, -1).length ? (
        <VictoryChart width={800} height={500}>
          <VictoryLegend
            x={125}
            y={10}
            style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
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
            colorScale={["#b5b6ff", "#f8a7dc"]}
            data={[{ name: "This Month" }, { name: "Last Month" }]}
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
                data: { stroke: "#f8a7dc" },
                parent: { border: "1px solid #f8a7dc" },
              }}
              data={lastMonthArr}
            />
          </VictoryGroup>
          <VictoryAxis
            label="Day of month"
            style={{
              tickLabels: { fontSize: 18, padding: 5 },
              axisLabel: { fontSize: 20, padding: 25 },
            }}
          />

          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => `$${x}`}
            style={{ tickLabels: { fontSize: 18, padding: 5 } }}
            height={600}
          />
        </VictoryChart>
      ) : (
        "Loading"
      )}
    </>
  );
};

// export default ChartForOVerview;
const mapState = (state) => {
  return {
    user: state.auth,
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     handleLogout() {
//       dispatch(logout());
//     },
//   };
// };

export default connect(mapState)(ChartForOVerview);
