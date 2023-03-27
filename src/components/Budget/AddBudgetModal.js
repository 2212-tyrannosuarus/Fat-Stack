import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import { Button, Stack } from "@chakra-ui/react";
import BarChartForModal from "../BarChartForModal";
import { BsCheckCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";


function AddBudgetModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let {
    subCategoryName,
    handleSubmitAddBudget,
    addBudgetAmount,
    setAddBudgetAmount,
    categoriesForAddBudget,
    setSubCategoryName,
    handleOvertimeSubcategory,
    chartData,
    average,
    setAverage,
  } = props;

  let categoriesForAddBudgetArr = [];

  let subCategoriesArr = [];
  let categoriesArr = [];

  if (
    categoriesForAddBudget !== undefined &&
    categoriesForAddBudget.length !== 0
  ) {
    categoriesForAddBudgetArr = categoriesForAddBudget.flat().slice(-1)[0][
      "rows"
    ];

    for (let i = 0; i < categoriesForAddBudgetArr.length; i++) {
      if (!categoriesArr.includes(categoriesForAddBudgetArr[i].categoryName)) {
        categoriesArr.push(categoriesForAddBudgetArr[i].categoryName);
      }
    }

    for (let i = 0; i < categoriesArr.length; i++) {
      subCategoriesArr[i] = [];
    }

    for (let i = 0; i < categoriesArr.length; i++) {
      for (let j = 0; j < categoriesForAddBudgetArr.length; j++) {
        if (categoriesForAddBudgetArr[j].categoryName === categoriesArr[i]) {
          if (!subCategoriesArr[i].length) {
            subCategoriesArr[i] = [
              categoriesForAddBudgetArr[j].subCategoryName,
            ];
          } else {
            subCategoriesArr[i].push(
              categoriesForAddBudgetArr[j].subCategoryName
            );
          }
        }
      }
    }

    categoriesArr.push(subCategoriesArr);
  }

  return (
    <>
      {categoriesForAddBudget && categoriesForAddBudget.length ? (
        <>
          <button
            class="btn btn-sm btn-outline-primary col-2 ml-0"
            onClick={onOpen}
          >
            + Add Budget
          </button>

          <Modal onClose={onClose} isOpen={isOpen} isCentered id="mymodal">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add a budget</ModalHeader>
              <ModalCloseButton />
              <form
                id="update-budget-form"
                onSubmit={(evt) =>
                  handleSubmitAddBudget(evt, subCategoryName, addBudgetAmount)
                }
                className="column"
              >
                <ModalBody>
                  <div className="row">
                    <div className="col-6">
                      <h4 className="mb-3 mt-4">Choose a sub category </h4>
                      <Select
                        name="sub-categories"
                        id="subCategory"
                        onChange={(evt) => {
                          setSubCategoryName(evt.target.value);
                          handleOvertimeSubcategory(evt.target.value);
                        }}
                      >
                        {categoriesArr && categoriesArr.length
                          ? categoriesArr.map((category, index1) => {
                              if (index1 !== categoriesArr.length - 1) {
                                return (
                                  <optgroup label={category}>
                                    {categoriesArr[
                                      categoriesArr.length - 1
                                    ].map((subCategoryArr, index2) => {
                                      return (
                                        <>
                                          {index1 === index2
                                            ? subCategoryArr.map(
                                                (subCategory) => {
                                                  return (
                                                    <option value={subCategory}>
                                                      {subCategory}
                                                    </option>
                                                  );
                                                }
                                              )
                                            : null}
                                        </>
                                      );
                                    })}
                                  </optgroup>
                                );
                              }
                            })
                          : "Loading sub categories"}
                      </Select>

                      <h4 className="mb-2 mt-4">
                        What is the budget amount ?{" "}
                      </h4>
                      <input
                        type="text"
                        class="form-control"
                        id="defaultFormControlInput"
                        placeholder="0"
                        value={addBudgetAmount}
                        onChange={(evt) => setAddBudgetAmount(evt.target.value)}
                      />

                      {addBudgetAmount && subCategoryName ? (
                        <Card variant="filled" className="mt-4">
                          <CardBody className="row">
                            <div className="col-1">
                            <IconContext.Provider
                              value={{ color: "#72dc3a", size: "25px" }}
                            >
                              <BsCheckCircleFill />
                            </IconContext.Provider>
                            </div>
                            <div className="col-11">
                            <Text>
                              {`We'll set a budget of $${addBudgetAmount} each month for`}{" "}
                              <strong>{subCategoryName}</strong>{" "}
                              {` that starts over at the 
                            beginning of every month.`}
                            </Text>
                            </div>
                          </CardBody>
                        </Card>
                      ) : null}

                      <Stack
                        direction="row"
                        spacing={0}
                        className="edit-budget col-2 mt-2"
                      ></Stack>
                    </div>
                    <div className="col-6">
                      <BarChartForModal
                        chartData={chartData}
                        average={average}
                        setAverage={setAverage}
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Stack direction="row" spacing={4}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                      type="submit"
                      onClick={onClose}
                      colorScheme="purple"
                      variant="solid"
                    >
                      Save
                    </Button>
                  </Stack>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </>
      ) : (
        "Loading categories"
      )}
    </>
  );
}

export default AddBudgetModal;
