import React, {useEffect, useState} from "react";
import BarChart from "../Bar Chart";
import { useDispatch, useSelector } from "react-redux";
import {fetchAllUserTransactions, fetchSpendingByCategoryPie, fetchSpendingOvertime, getMonthsTransactions, selectMonthsTransactions, selectSpendingByCategoryPie, selectSpendingOvertime } from "../../reducers/trendsPageSLice";
import { useParams } from "react-router-dom";
import PieChart from "../PieChart";


const Trends = () => {

  const {userId} = useParams();
    const dispatch = useDispatch();
    let spendingOvertime = useSelector(selectSpendingOvertime);
    let spendingByCategoryPie = useSelector(selectSpendingByCategoryPie);
    console.log('spending overtime ', spendingOvertime);
    console.log('spending by category ', spendingByCategoryPie);
    let [dataToChartOvertime, setDataToChartOvertime] = useState([]);
    let [dataToChartCategoryPie, setDataToChartCategoryPie] = useState([]);
    console.log('dataToChartCategoryPie ', dataToChartCategoryPie);
    const [dateToday, setDateToday] = useState(new Date());

    useEffect(() => {
      let todaysDate = (dateToday.toString() + 1).split(' ');
    let currentMonth = '';
    if ((dateToday.getMonth() + 1).toString().length === 1) {
      currentMonth = `0${(dateToday.getMonth() + 1).toString()}`
    }
    else {
      currentMonth = (dateToday.getMonth() + 1).toString()
    }
    let startingDate = `2022-04-01`;
    let endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`
        
    async function getSpendingOvertime() {
            await dispatch(fetchSpendingOvertime({userId: userId, fromDate: startingDate, toDate: endingDate}));
            setDataToChartCategoryPie(null)
            setDataToChartOvertime(spendingOvertime);
        }
        getSpendingOvertime();

    },[dispatch]);

    async function handleOvertime () {
      let todaysDate = (dateToday.toString() + 1).split(' ');
    let currentMonth = '';
    if ((dateToday.getMonth() + 1).toString().length === 1) {
      currentMonth = `0${(dateToday.getMonth() + 1).toString()}`
    }
    else {
      currentMonth = (dateToday.getMonth() + 1).toString()
    }
    let startingDate = `2022-04-01`;
    let endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`
    await dispatch(fetchSpendingOvertime({userId: userId, fromDate: startingDate, toDate: endingDate}));
    setDataToChartCategoryPie(null)
    setDataToChartOvertime(spendingOvertime);
    }

    async function handleCategoryPie () {
      let todaysDate = (dateToday.toString() + 1).split(' ');
    let currentMonth = '';
    if ((dateToday.getMonth() + 1).toString().length === 1) {
      currentMonth = `0${(dateToday.getMonth() + 1).toString()}`
    }
    else {
      currentMonth = (dateToday.getMonth() + 1).toString()
    }
    let startingDate = `${todaysDate[3]}-${currentMonth}-01`;
    let endingDate = `${todaysDate[3]}-${currentMonth}-${todaysDate[2]}`
    await dispatch(fetchSpendingByCategoryPie({userId: userId, fromDate: startingDate, toDate: endingDate}));
    setDataToChartOvertime(null);
    setDataToChartCategoryPie(spendingByCategoryPie);
    }


  return (
    <div className="row">
    <aside
      id="layout-menu"
      class="col-3 layout-menu menu-vertical menu bg-menu-theme"
      data-bg-class="bg-menu-theme"
    >
      <div class="menu-inner-shadow" style={{ display: "none" }}></div>

      <ul class="menu-inner py-1 ps ps--active-y">

        {/* <!-- Layouts --> */}
        <li class="menu-item">
          <div class="menu-link menu-toggle">
            <div data-i18n="Layouts">SPENDING GRAPHS</div>
          </div>

          <ul class="menu-sub">
            <li class="menu-item">
              <button onClick={() => handleOvertime()} class="menu-link">
                <div data-i18n="Without menu">Overtime</div>
              </button>
            </li>
            <li class="menu-item">
              <button onClick={() => handleCategoryPie()} class="menu-link">
                <div data-i18n="Without navbar">By Category</div>
              </button>
            </li>
            <li class="menu-item">
              <button class="menu-link">
                <div data-i18n="Container">By Merchant</div>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </aside>

    <div className="col-7">
   
    <div className="container">
    {dataToChartOvertime && dataToChartOvertime.length !== undefined? 
        <BarChart chartData={spendingOvertime}/>: null}

{dataToChartCategoryPie && dataToChartCategoryPie.length !== undefined ? 
        <PieChart chartData={spendingByCategoryPie}/>: null}
    </div>
    
    </div>
    </div>
  );
};

export default Trends;
