import React, { useEffect, useState } from "react";
import BarChart from "../Bar Chart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpendingByCategoryPie,
  fetchSpendingByMerchantPie,
  fetchSpendingOvertime,
  selectSpendingByCategoryPie,
  selectSpendingByMerchantPie,
  selectSpendingOvertime,
} from "../../reducers/trendsPageSLice";
import { useParams } from "react-router-dom";
import "./Trends.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import PieChartCategory from "../PieChartCategory";
import PieChartMerchant from "../PieChartMerchant";
import "../../scss/styles.scss";
import * as bootstrap from "bootstrap";
import TrendsToggleButtonGroup from "./TrendsToggleButtonGroup";

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

const Trends = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  let spendingOvertime = useSelector(selectSpendingOvertime);
  let spendingByCategoryPie = useSelector(selectSpendingByCategoryPie);
  let spendingByMerchantPie = useSelector(selectSpendingByMerchantPie);

  console.log("spending overtime ", spendingOvertime);
  console.log("spending by category ", spendingByCategoryPie);
  console.log("spending by merchant ", spendingByMerchantPie);

  let [dataToChartOvertime, setDataToChartOvertime] = useState([]);
  let [dataToChartCategoryPie, setDataToChartCategoryPie] = useState([]);
  let [dataToChartMerchantPie, setDataToChartMerchantPie] = useState([]);

  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  console.log('selected dates ', selectedDates);
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
      setDataToChartOvertime(spendingOvertime);
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
    setDataToChartOvertime(spendingOvertime);
  }

  async function handleCategoryPie() {
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
    setDataToChartCategoryPie(spendingByCategoryPie);
  }

  async function handleMerchantPie() {
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
    setDataToChartMerchantPie(spendingByMerchantPie);
  }

  async function handleDateChangePieCategory(selectedDates) {
    let startingDate = "";
    let endingDate = "";

    let deStucturedStartingDate = selectedDates[0].toString().split(' '); //[Wed Mar 01 2023 00:00:00 GMT-0500 (Eastern Standard Time)]
    let deStructuredEndingDate = selectedDates[1].toString().split(' '); //[Wed Mar 22 2023 00:00:00 GMT-0400 (Eastern Daylight Time)]

    let startingYear = deStucturedStartingDate[3];
    let endingYear = deStructuredEndingDate[3];

    let startingMonth = MONTHS.indexOf(deStucturedStartingDate[1]) + 1;
    if (startingMonth.length === 1) startingMonth = `0${startingMonth}`;
    let endingMonth = MONTHS.indexOf(deStructuredEndingDate[1]) + 1;;
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
    setDataToChartCategoryPie(spendingByCategoryPie);
  }

  async function handleDateChangePieMerchant(selectedDates) {
    let startingDate = "";
    let endingDate = "";

    let deStucturedStartingDate = selectedDates[0].toString().split(' '); //[Wed Mar 01 2023 00:00:00 GMT-0500 (Eastern Standard Time)]
    let deStructuredEndingDate = selectedDates[1].toString().split(' '); //[Wed Mar 22 2023 00:00:00 GMT-0400 (Eastern Daylight Time)]

    let startingYear = deStucturedStartingDate[3];
    let endingYear = deStructuredEndingDate[3];

    let startingMonth = MONTHS.indexOf(deStucturedStartingDate[1]) + 1;
    if (startingMonth.length === 1) startingMonth = `0${startingMonth}`;
    let endingMonth = MONTHS.indexOf(deStructuredEndingDate[1]) + 1;;
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
    setDataToChartMerchantPie(spendingByMerchantPie);
  }

  return (
    <div className="container trends-container">
      <div className="row">
        <TrendsToggleButtonGroup
          handleOvertime={handleOvertime}
          handleCategoryPie={handleCategoryPie}
          handleMerchantPie={handleMerchantPie}
        />

        <div className="col-9 ">
          <div className="container mt-0 pt-0">
            {dataToChartOvertime && dataToChartOvertime.length !== undefined ? (
              <BarChart chartData={spendingOvertime} />
            ) : null}

            {dataToChartCategoryPie &&
            dataToChartCategoryPie.length !== undefined ? (
              <PieChartCategory chartData={spendingByCategoryPie} selectedDates={selectedDates}
              setSelectedDates={setSelectedDates} handleDateChangePieCategory={handleDateChangePieCategory}/>
            ) : null}

            {dataToChartMerchantPie &&
            dataToChartMerchantPie.length !== undefined ? (
              <PieChartMerchant chartData={spendingByMerchantPie} selectedDates={selectedDates}
              setSelectedDates={setSelectedDates} handleDateChangePieMerchant={handleDateChangePieMerchant} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;
