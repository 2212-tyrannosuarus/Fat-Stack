import React, { useEffect, useState } from "react";
import BarChart from "../Bar Chart";
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
} from "../../reducers/trendsPageSLice";
import { useParams } from "react-router-dom";
import "./Trends.css";
import PieChartCategory from "../PieChartCategory";
import PieChartMerchant from "../PieChartMerchant";
import "../../scss/styles.scss";
import * as bootstrap from "bootstrap";
import TrendsToggleButtonGroup from "./TrendsToggleButtonGroup";
import BarChartBySubcategory from "../BarChartBySubcategory";
// import theme from '../Budget/theme.js'
// import { ChakraProvider } from "@chakra-ui/react";

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

const Trends = (props) => {
  const { userId } = props;
  const dispatch = useDispatch();
  let spendingOvertime = useSelector(selectSpendingOvertime);
  let spendingByCategoryPie = useSelector(selectSpendingByCategoryPie);
  let spendingByMerchantPie = useSelector(selectSpendingByMerchantPie);
  let spendingOvertimeBySubcategory = useSelector(
    selectSpendingOvertimeBySubcategory
  );
  const trendsCategories = useSelector(selectTrendsCategories);
  console.log('trends categories ', trendsCategories);

  console.log("spending overtime ", spendingOvertime);
  console.log("spending by category ", spendingByCategoryPie);
  console.log("spending by merchant ", spendingByMerchantPie);

  let [dataToChartOvertime, setDataToChartOvertime] = useState([]);
  let [dataToChartCategoryPie, setDataToChartCategoryPie] = useState([]);
  let [dataToChartMerchantPie, setDataToChartMerchantPie] = useState([]);
  let [dataToChartOvertimeBySubcategory, setDataToChartOvertimeBySubcategory] = useState([]);
  let [subCategoryName, setSubCategoryName] = useState("Auto Insurance");

  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  console.log("selected dates ", selectedDates);
  console.log("dataToChartMerchantPie ", dataToChartMerchantPie);

  const [dateToday, setDateToday] = useState(new Date());

  useEffect(() => {
    let todaysDate = (dateToday.toString() + 1).split(" ");
    let currentMonth = "";
    if ((dateToday.getMonth() + 1).toString().length === 1) {
      currentMonth = `0${(dateToday.getMonth() + 1).toString()}`;
    } else {
      currentMonth = (dateToday.getMonth() + 1).toString();
    }
    let startingDate = `2022-04-01`;
    let endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`;

    async function getSpendingOvertime() {
      await dispatch(
        fetchSpendingOvertime({
          userId: userId,
          fromDate: startingDate,
          toDate: endingDate,
        })
      );
      setDataToChartCategoryPie(null);
      setDataToChartMerchantPie(null);
      setDataToChartOvertimeBySubcategory(null);
      setDataToChartOvertime(spendingOvertime);
      await dispatch(fetchTrendsCategories({userId: userId, fromDate: startingDate, toDate: endingDate}));
    } 
    getSpendingOvertime();
  }, [dispatch]);

  async function handleOvertime() {
    let todaysDate = (dateToday.toString() + 1).split(" ");
    let currentMonth = "";
    if ((dateToday.getMonth() + 1).toString().length === 1) {
      currentMonth = `0${(dateToday.getMonth() + 1).toString()}`;
    } else {
      currentMonth = (dateToday.getMonth() + 1).toString();
    }
    let startingDate = `2022-04-01`;
    let endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`;
    await dispatch(
      fetchSpendingOvertime({
        userId: userId,
        fromDate: startingDate,
        toDate: endingDate,
      })
    );
    setDataToChartCategoryPie(null);
    setDataToChartMerchantPie(null);
    setDataToChartOvertimeBySubcategory(null);
    setDataToChartOvertime(spendingOvertime);
  }

  async function handleCategoryPie() {
    setSelectedDates([new Date(), new Date()]);
    let todaysDate = (dateToday.toString() + 1).split(" ");
    let currentMonth = "";
    if ((dateToday.getMonth() + 1).toString().length === 1) {
      currentMonth = `0${(dateToday.getMonth() + 1).toString()}`;
    } else {
      currentMonth = (dateToday.getMonth() + 1).toString();
    }
    let startingDate = `${todaysDate[3]}-${currentMonth}-01`;
    let endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`;
    await dispatch(
      fetchSpendingByCategoryPie({
        userId: userId,
        fromDate: startingDate,
        toDate: endingDate,
      })
    );
    setDataToChartOvertime(null);
    setDataToChartMerchantPie(null);
    setDataToChartOvertimeBySubcategory(null);
    setDataToChartCategoryPie(spendingByCategoryPie);
  }

  async function handleMerchantPie() {
    setSelectedDates([new Date(), new Date()]);
    let todaysDate = (dateToday.toString() + 1).split(" ");
    let currentMonth = "";
    if ((dateToday.getMonth() + 1).toString().length === 1) {
      currentMonth = `0${(dateToday.getMonth() + 1).toString()}`;
    } else {
      currentMonth = (dateToday.getMonth() + 1).toString();
    }
    let startingDate = `${todaysDate[3]}-${currentMonth}-01`;
    let endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`;
    await dispatch(
      fetchSpendingByMerchantPie({
        userId: userId,
        fromDate: startingDate,
        toDate: endingDate,
      })
    );
    setDataToChartOvertime(null);
    setDataToChartCategoryPie(null);
    setDataToChartOvertimeBySubcategory(null);
    setDataToChartMerchantPie(spendingByMerchantPie);
  }

  async function handleDateChangePieCategory(selectedDates) {
    let startingDate = "";
    let endingDate = "";

    let deStucturedStartingDate = selectedDates[0].toString().split(" "); //[Wed Mar 01 2023 00:00:00 GMT-0500 (Eastern Standard Time)]
    let deStructuredEndingDate = selectedDates[1].toString().split(" "); //[Wed Mar 22 2023 00:00:00 GMT-0400 (Eastern Daylight Time)]

    let startingYear = deStucturedStartingDate[3];
    let endingYear = deStructuredEndingDate[3];

    let startingMonth = MONTHS.indexOf(deStucturedStartingDate[1]) + 1;
    if (startingMonth.length === 1) startingMonth = `0${startingMonth}`;
    let endingMonth = MONTHS.indexOf(deStructuredEndingDate[1]) + 1;
    if (endingMonth.length === 1) endingMonth = `0${endingMonth}`;

    let startingDay = deStucturedStartingDate[2];
    let endingDay = deStructuredEndingDate[2];

    startingDate = `${startingYear}-${startingMonth}-${startingDay}`;
    endingDate = `${endingYear}-${endingMonth}-${endingDay}`;

    await dispatch(
      fetchSpendingByCategoryPie({
        userId: userId,
        fromDate: startingDate,
        toDate: endingDate,
      })
    );
    setDataToChartOvertime(null);
    setDataToChartMerchantPie(null);
    setDataToChartOvertimeBySubcategory(null);
    setDataToChartCategoryPie(spendingByCategoryPie);
  }

  async function handleDateChangePieMerchant(selectedDates) {
    let startingDate = "";
    let endingDate = "";

    let deStucturedStartingDate = selectedDates[0].toString().split(" "); //[Wed Mar 01 2023 00:00:00 GMT-0500 (Eastern Standard Time)]
    let deStructuredEndingDate = selectedDates[1].toString().split(" "); //[Wed Mar 22 2023 00:00:00 GMT-0400 (Eastern Daylight Time)]

    let startingYear = deStucturedStartingDate[3];
    let endingYear = deStructuredEndingDate[3];

    let startingMonth = MONTHS.indexOf(deStucturedStartingDate[1]) + 1;
    if (startingMonth.length === 1) startingMonth = `0${startingMonth}`;
    let endingMonth = MONTHS.indexOf(deStructuredEndingDate[1]) + 1;
    if (endingMonth.length === 1) endingMonth = `0${endingMonth}`;

    let startingDay = deStucturedStartingDate[2];
    let endingDay = deStructuredEndingDate[2];

    startingDate = `${startingYear}-${startingMonth}-${startingDay}`;
    endingDate = `${endingYear}-${endingMonth}-${endingDay}`;

    await dispatch(
      fetchSpendingByMerchantPie({
        userId: userId,
        fromDate: startingDate,
        toDate: endingDate,
      })
    );
    setDataToChartOvertime(null);
    setDataToChartCategoryPie(null);
    setDataToChartOvertimeBySubcategory(null);
    setDataToChartMerchantPie(spendingByMerchantPie);
  }

  async function handleOvertimeSubcategory (subcategory) {
    let todaysDate = (dateToday.toString() + 1).split(" ");
    let currentMonth = "";
    if ((dateToday.getMonth() + 1).toString().length === 1) {
      currentMonth = `0${(dateToday.getMonth() + 1).toString()}`;
    } else {
      currentMonth = (dateToday.getMonth() + 1).toString();
    }
    let startingDate = `2022-04-01`;
    let endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`;
    await dispatch(
      fetchSpendingOvertimeBySubcategory({
        userId: userId,
        fromDate: startingDate,
        toDate: endingDate,
        subcategory: subcategory
      })
    );
    setDataToChartCategoryPie(null);
    setDataToChartMerchantPie(null);
    setDataToChartOvertime(null);
    setDataToChartOvertimeBySubcategory(spendingOvertimeBySubcategory);
    
  }

  return (

    <div className="container trends-container">
      <div className="row">
        <TrendsToggleButtonGroup
          handleOvertime={handleOvertime}
          handleOvertimeSubcategory={handleOvertimeSubcategory}
          handleCategoryPie={handleCategoryPie}
          handleMerchantPie={handleMerchantPie}
        />

        <div className="col-9 ">
          <div className="container mt-0 pt-0">
            {dataToChartOvertime && dataToChartOvertime.length !== undefined ? (
              <BarChart chartData={spendingOvertime} />
            ) : null}

            {dataToChartOvertimeBySubcategory && dataToChartOvertimeBySubcategory.length !== undefined ? (
              <BarChartBySubcategory
                chartData={spendingOvertimeBySubcategory}
                handleOvertimeSubcategory={handleOvertimeSubcategory}
                trendsCategories={trendsCategories}
                subCategoryName={subCategoryName}
                setSubCategoryName={setSubCategoryName}
              />
            ) : null}

            {dataToChartCategoryPie &&
            dataToChartCategoryPie.length !== undefined ? (
              <PieChartCategory
                chartData={spendingByCategoryPie}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
                handleDateChangePieCategory={handleDateChangePieCategory}
              />
            ) : null}

            {dataToChartMerchantPie &&
            dataToChartMerchantPie.length !== undefined ? (
              <PieChartMerchant
                chartData={spendingByMerchantPie}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
                handleDateChangePieMerchant={handleDateChangePieMerchant}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Trends;
