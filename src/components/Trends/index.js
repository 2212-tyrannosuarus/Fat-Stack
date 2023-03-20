import React, {useEffect, useState} from "react";
import BarChart from "../Bar Chart";
import { useDispatch, useSelector } from "react-redux";
import {fetchSpendingByCategoryPie, fetchSpendingByMerchantPie, fetchSpendingOvertime, selectSpendingByCategoryPie, selectSpendingByMerchantPie, selectSpendingOvertime } from "../../reducers/trendsPageSLice";
import { useParams } from "react-router-dom";
import './Trends.css'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import PieChartCategory from "../PieChartCategory";
import PieChartMerchant from "../PieChartMerchant";


const Trends = () => {

  const {userId} = useParams();
    const dispatch = useDispatch();
    let spendingOvertime = useSelector(selectSpendingOvertime);
    let spendingByCategoryPie = useSelector(selectSpendingByCategoryPie);
    let spendingByMerchantPie = useSelector(selectSpendingByMerchantPie);

    console.log('spending overtime ', spendingOvertime);
    console.log('spending by category ', spendingByCategoryPie);
    console.log('spending by merchant ', spendingByMerchantPie);

    let [dataToChartOvertime, setDataToChartOvertime] = useState([]);
    let [dataToChartCategoryPie, setDataToChartCategoryPie] = useState([]);
    let [dataToChartMerchantPie, setDataToChartMerchantPie] = useState([]);

    console.log('dataToChartMerchantPie ', dataToChartMerchantPie);

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
            setDataToChartCategoryPie(null);
            setDataToChartMerchantPie(null);
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
    setDataToChartMerchantPie(null);
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
    setDataToChartMerchantPie(null);
    setDataToChartCategoryPie(spendingByCategoryPie);
    }

    async function handleMerchantPie () {
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
    await dispatch(fetchSpendingByMerchantPie({userId: userId, fromDate: startingDate, toDate: endingDate}));
    setDataToChartOvertime(null);
    setDataToChartCategoryPie(null);
    setDataToChartMerchantPie(spendingByMerchantPie);
    }


  return (
    <div className="container">
    <div className="row">
    {/* <aside
      id="layout-menu"
      class="col-3 layout-menu menu-vertical menu bg-menu-theme"
      data-bg-class="bg-menu-theme"
    >
      <div class="menu-inner-shadow" style={{ display: "none" }}></div>

      <ul class="menu-inner py-1 ps ps--active-y">

       
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
    </aside> */}


<Accordion className="col-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Spending Graphs</Accordion.Header>
        <Accordion.Body>
        <div className="d-grid gap-2">
        <Button variant="light" onClick={() => handleOvertime()}>Overtime</Button>
        <Button variant="light" onClick={() => handleCategoryPie()} >By Category</Button>
        <Button variant="light" onClick={() => handleMerchantPie()} >By Merchant</Button>
        </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>



  

    <div className="col-7">
   
    <div className="container">
    {dataToChartOvertime && dataToChartOvertime.length !== undefined? 
        <BarChart chartData={spendingOvertime}/>: null}

{dataToChartCategoryPie && dataToChartCategoryPie.length !== undefined ? 
        <PieChartCategory chartData={spendingByCategoryPie}/>: null}

{dataToChartMerchantPie && dataToChartMerchantPie.length !== undefined ? 
        <PieChartMerchant chartData={spendingByMerchantPie}/>: null}
    </div>
    
    </div>
    </div>
    </div>
  );
};

export default Trends;



