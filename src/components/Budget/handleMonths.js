
// function handleThisMonth (currMonth) {
//     // alert("hi");
    
//     let selectedMonthDivs = document.querySelectorAll('.selected-month');
//     selectedMonthDivs.forEach(div => {
//         div.classList.remove("selected-month");
//     })
//     let thisMonthDiv = document.querySelector(`#${currMonth}`);
//     thisMonthDiv.classList.add("selected-month");
//   }

//   function handleLastMonth (MONTHS, indexOfCurrMonth) {
//     // alert("hi");
//     let selectedMonthDivs = document.querySelectorAll('.selected-month');
//     selectedMonthDivs.forEach(div => {
//         div.classList.remove("selected-month");
//     })
//     let lastMonth = ""
//     if (indexOfCurrMonth === 0) {
//         lastMonth = MONTHS[MONTHS.length - 1];
//     }
//     else {
//         lastMonth = MONTHS[indexOfCurrMonth - 1];
//     }
//     let lastMonthDiv = document.querySelector(`#${lastMonth}`);
//     lastMonthDiv.classList.add("selected-month");
//   }

  function handleLastThreeMonths (MONTHS, indexOfCurrMonth) {
    let selectedMonthDivs = document.querySelectorAll('.selected-month');
    selectedMonthDivs.forEach(div => {
        div.classList.remove("selected-month");
    })
    let lastThreeMonths = [];
    if (indexOfCurrMonth <= 2) {
        for (let i = indexOfCurrMonth - 1; i >= 0; i--) {
            lastThreeMonths.push(MONTHS[i])
        }
        if (lastThreeMonths.length === 2) {
            lastThreeMonths.push(MONTHS[MONTHS.length - 1]);
        }
        else if (lastThreeMonths.length === 1) {
            for (let j = MONTHS.length - 1; j >= MONTHS.length - 2; j--) {
                lastThreeMonths.push(MONTHS[j]);
            }
        }
        else if (lastThreeMonths.length === 0) {
            for (let j = MONTHS.length - 1; j >= MONTHS.length - 3; j--) {
                lastThreeMonths.push(MONTHS[j]);
            }
        }
        console.log('last three months ', lastThreeMonths);
    }
    else {
        for (let i = indexOfCurrMonth - 1; i >= indexOfCurrMonth - 3; i--) {
            lastThreeMonths.push(MONTHS[i]);
            console.log('last three months ', lastThreeMonths);
        }
    }

    for (let i = 0; i < lastThreeMonths.length; i++) {
        let divToSelect = document.querySelector(`#${lastThreeMonths[i]}`);
        divToSelect.classList.add("selected-month");
    }

  }

  module.exports = {handleLastThreeMonths}