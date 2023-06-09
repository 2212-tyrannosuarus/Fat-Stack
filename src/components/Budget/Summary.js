import React from "react";
import "./Budget.css";
import {
  Box,
  Text,
  Icon,
  Flex,
  ListIcon,
  ListItem,
  List,
} from "@chakra-ui/react";
import { GiTakeMyMoney } from "react-icons/gi";
import { IconContext } from "react-icons";
import { MdCheckCircle } from "react-icons/md";

const Summary = (props) => {
  const { income, spending, other } = props;

  let totalExpenses = 0;
  let goals = 0;
  if (spending !== undefined) {
    let spendingArr = spending.flat();

    for (let i = 0; i < spendingArr.length - 1; i++) {
      totalExpenses += parseInt(spendingArr[i].transactionAmount);
    }
  }

  if (other !== undefined) {
    let otherArr = other.flat();

    for (let i = 0; i < otherArr.length - 1; i++) {
      if (otherArr[i].subCategoryName === "Goals") {
        goals = otherArr[i].transactionAmount;
      } else {
        totalExpenses += parseInt(otherArr[i].transactionAmount);
      }
    }
  }

  return (
    <>
      {income[0] !== undefined &&
      income[0].length &&
      spending[0] !== undefined &&
      spending[0].length &&
      other !== undefined ? (
        <>
          <div className="col-md-12 col-lg-12 order-2 mb-4">
            <div className="card h-100">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="card-title m-0 me-2">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="p-0 m-0">
                  <li className="d-flex mb-2 pb-1">
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        {/* <small class="text-muted d-block mb-1">Paypal</small> */}
                        <h6 className="mb-0">Total Income</h6>
                      </div>
                      <div className="user-progress d-flex align-items-center gap-1">
                        <h6 className="mb-0">
                          + ${parseInt(income.flat()[0].transactionAmount)}
                        </h6>{" "}
                        {/* <span class="text-muted">USD</span> */}
                      </div>
                    </div>
                  </li>

                  <li className="d-flex mb-2 pb-1">
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        {/* <small class="text-muted d-block mb-1">Paypal</small> */}
                        <h6 className="mb-0">Total Expenses</h6>
                      </div>
                      <div className="user-progress d-flex align-items-center gap-1">
                        <h6 className="mb-0">- ${parseInt(totalExpenses)}</h6>{" "}
                        {/* <span class="text-muted">USD</span> */}
                      </div>
                    </div>
                  </li>

                  {goals > 0 ? (
                    <li className="d-flex mb-2 pb-1">
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          {/* <small class="text-muted d-block mb-1">Paypal</small> */}
                          <h6 className="mb-0">Goals</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">- ${parseInt(goals)}</h6>{" "}
                          {/* <span class="text-muted">USD</span> */}
                        </div>
                      </div>
                    </li>
                  ) : null}
                  <hr />
                  <li className="d-flex mb-2 pb-1 mt-2">
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        {/* <small class="text-muted d-block mb-1">Paypal</small> */}
                        <h6 className="mb-0">Leftover</h6>
                      </div>
                      <div className="user-progress d-flex align-items-center gap-1">
                        <h6 className="mb-0">
                          {parseInt(income.flat()[0].transactionAmount) -
                            parseInt(totalExpenses) -
                            parseInt(goals) >
                          0
                            ? `$${
                                parseInt(income.flat()[0].transactionAmount) -
                                parseInt(totalExpenses) -
                                parseInt(goals)
                              }`
                            : `-$${
                                parseInt(totalExpenses) +
                                parseInt(goals) -
                                parseInt(income.flat()[0].transactionAmount)
                              }`}
                        </h6>{" "}
                        {/* <span class="text-muted">USD</span> */}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Box
            bg="white"
            rounded="lg"
            overflow="hidden"
            px={3}
            py={4}
            display="flex"
            flexDirection="column"
            boxShadow="md"
          >
            {/* <div className="row"> */}
            <div className="col-12" align="center">
              <IconContext.Provider value={{ color: "#a6a7fe", size: "25px" }}>
                <Icon
                  as={GiTakeMyMoney}
                  w={10}
                  h={10}
                  mb={4}
                />
              </IconContext.Provider>
            </div>
            <div className="col-12" align="center">
              <Text fontWeight="bold" fontSize="xl" mb={2}>
                You're on the right track!
              </Text>

              <Text fontSize="md">
                There are various benefits to creating a budget
              </Text>

              <List spacing={3} align="left">
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />A budget can
                  help you save money.
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />A budget can
                  help you pay off debt.
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />A budget can
                  help you reach your financial goals.
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />A budget can
                  help you stay on track.
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />A budget can
                  help reduce stress.
                </ListItem>
              </List>
            </div>
            {/* </div> */}
          </Box>
        </>
      ) : null}
    </>
  );
};

export default Summary;
