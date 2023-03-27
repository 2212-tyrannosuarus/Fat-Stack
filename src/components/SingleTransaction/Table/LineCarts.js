import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpendingByCategoryPie,
  fetchSpendingByMerchantPie,
  fetchSpendingOvertime,
  fetchSpendingOvertimeBySubcategory,
  fetchTrendsCategories,
  selectSpendingByCategoryPie,
  selectSpendingByMerchantPie,
  selectSpendingOvertime,
  selectSpendingOvertimeBySubcategory,
  selectTrendsCategories,
} from "../../../reducers/trendsPageSLice";

export default function LineCarts() {
  const dispatch = useDispatch();
  let [dataToChartOvertime, setDataToChartOvertime] = useState([]);
  let spendingOvertime = useSelector(selectSpendingOvertime);

  useEffect(() => {
    let today = moment();
    let endDate = moment().format("YYY-MM-DD");
    let start = today.subtract(6, "months");
    let startDate = start.format("YYY-MM-DD");

    async function getSpendingOvertime() {
      await dispatch(
        fetchSpendingOvertime({
          //replace userId with userId
          userId: 1,
          fromDate: startDate,
          toDate: endDate,
        })
      );
      setDataToChartOvertime(spendingOvertime);
    }
    getSpendingOvertime();
    console.log(dataToChartOvertime);
  }, []);

  return (
    // <ReactApexChart
    //   options={this.state.chartOptions}
    //   series={this.state.chartData}
    //   type="area"
    //   width="100%"
    //   height="100%"
    // />
    <>hide_from_budget</>
  );
}
