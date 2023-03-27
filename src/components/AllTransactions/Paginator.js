import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./AllTransactions.css";

import {
  Box,
  Container,
  Flex,
  List,
  ListItem,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";

const radiusOfClickablePagesDisplayed = 2;
const arrayToMapOverForPageNumbers = Array(radiusOfClickablePagesDisplayed);

const Paginator = (props) => {
  const { handlePageChange, totalPageCount, currentPage, setCurrentPage } =
    props;

  return (
    <>
      <Container>
        <Flex direction={"row"}>
          <Button
            _hover={{ bg: "purple.100" }}
            as="button"
            id="first"
            onClick={() => setCurrentPage(1)}
          >
            First
          </Button>
          <Button
            _hover={{ bg: "purple.100" }}
            id="previous"
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            Previous
          </Button>
          {[2, 1].map((pageDiff, idx) => {
            if (currentPage - pageDiff > 0) {
              return (
                <Button
                  _hover={{ bg: "purple.100" }}
                  key={idx}
                  onClick={() => {
                    setCurrentPage(currentPage - pageDiff);
                    console.log("current page", currentPage);
                  }}
                >
                  {currentPage - pageDiff}
                </Button>
              );
            }
          })}
          <Box
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            px="8px"
            fontSize="2em"
            fontWeight="semibold"
            borderRadius="25px"
            bg="gray.100"
            borderColor="#ccd0d5"
            color="#4b4f56"
            _focus={{
              boxShadow:
                "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
            }}
          >
            {currentPage}
          </Box>

          {[1, 2].map((pageDiff, idx) => {
            if (currentPage + pageDiff < totalPageCount) {
              return (
                <Button
                  _hover={{ bg: "purple.100" }}
                  key={idx}
                  onClick={() => {
                    setCurrentPage(currentPage + pageDiff);
                    console.log("current page", currentPage);
                  }}
                >
                  {currentPage + pageDiff}
                </Button>
              );
            }
          })}
          <Button
            _hover={{ bg: "purple.100" }}
            id="next"
            onClick={() => {
              if (currentPage < totalPageCount) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            Next
          </Button>
          <Button
            _hover={{ bg: "purple.100" }}
            id="last"
            onClick={() => setCurrentPage(totalPageCount)}
          >
            Last
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default Paginator;
