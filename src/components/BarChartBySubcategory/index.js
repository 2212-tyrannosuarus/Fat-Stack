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
import { v4 as uuidv4 } from "uuid";

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

const BarChartBySubcategory = (props) => {
  const {
    chartData,
    trendsCategories,
    handleOvertimeSubcategory,
    setSubCategoryName,
    subCategoryName,
  } = props;

  let [barChartDebit, setBarChartDebit] = useState([]);
  let categoriesForTrendsArr = [];
  let subCategoriesArr = [];
  let categoriesArr = [];

  if (trendsCategories !== undefined && trendsCategories.length !== 0) {
    categoriesForTrendsArr = trendsCategories.flat().slice(-1)[0]["rows"];

    for (let i = 0; i < categoriesForTrendsArr.length; i++) {
      if (!categoriesArr.includes(categoriesForTrendsArr[i].categoryName)) {
        categoriesArr.push(categoriesForTrendsArr[i].categoryName);
      }
    }

    for (let i = 0; i < categoriesArr.length; i++) {
      subCategoriesArr[i] = [];
    }

    for (let i = 0; i < categoriesArr.length; i++) {
      for (let j = 0; j < categoriesForTrendsArr.length; j++) {
        if (categoriesForTrendsArr[j].categoryName === categoriesArr[i]) {
          if (!subCategoriesArr[i].length) {
            subCategoriesArr[i] = [categoriesForTrendsArr[j].subCategoryName];
          } else {
            subCategoriesArr[i].push(categoriesForTrendsArr[j].subCategoryName);
          }
        }
      }
    }

    categoriesArr.push(subCategoriesArr);
  }

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

      barChartDebit = barChartDebit.slice(barChartDebit.length - 5);
      setBarChartDebit(barChartDebit);
    }
  }, [setBarChartDebit, chartData]);

  return (
    <div className="container">
      {chartData &&
      chartData.length &&
      chartData.flat().slice(0, -1)[0] !== undefined &&
      barChartDebit ? (
        <div className="row">
          <div className="col-8 p-0">
            <VictoryChart
              domainPadding={50}
              padding={{ top: 200, bottom: 100, left: 100, right: 5 }}
              height={700}
              width={700}
            >
              <VictoryLegend
                x={200}
                y={60}
                orientation="horizontal"
                gutter={50}
                colorScale={["#ff7960"]}
                data={[
                  {
                    name: `${chartData.flat().slice(0, -1)[0].subcategoryName}`,
                  },
                ]}
                style={{ labels: { fontSize: 25 } }}
              />

              <VictoryAxis
                label={` Last 6 months `}
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

          <div className="col-4 mt-n " align="center">
            {categoriesArr && categoriesArr.length ? (
              <>
                <h6 className="fw-bold mb-2 mt-2">Choose a sub-category</h6>
                <Select
                  name="sub-categories"
                  id="subCategory"
                  value={subCategoryName}
                  onChange={(evt) => {
                    setSubCategoryName(evt.target.value);
                    handleOvertimeSubcategory(evt.target.value);
                  }}
                >
                  {categoriesArr && categoriesArr.length
                    ? categoriesArr.map((category, index1) => {
                        if (index1 !== categoriesArr.length - 1) {
                          return (
                            <optgroup label={category} key={uuidv4()}>
                              {categoriesArr[categoriesArr.length - 1].map(
                                (subCategoryArr, index2) => {
                                  return (
                                    <>
                                      {index1 === index2
                                        ? subCategoryArr.map((subCategory) => {
                                            return (
                                              <option
                                                value={subCategory}
                                                key={uuidv4()}
                                              >
                                                {subCategory}
                                              </option>
                                            );
                                          })
                                        : null}
                                    </>
                                  );
                                }
                              )}
                            </optgroup>
                          );
                        }
                      })
                    : "Loading sub categories"}
                </Select>
              </>
            ) : (
              "Loading subcategories"
            )}
          </div>
        </div>
      ) : (
        <div className="row pl-4" align="center" style={{ width: "50vw" }}>
          <div className="col-12">No data to display</div>
        </div>
      )}
    </div>
  );
};

export default BarChartBySubcategory;
