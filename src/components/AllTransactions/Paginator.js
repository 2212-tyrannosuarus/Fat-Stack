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

const Paginator = (props) => {
  const { handlePageChange, totalPageCount } = props;
  return (
    <>
      <Container>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={totalPageCount}
          pageRangeDisplayed={3}
          onPageChange={(e) => {
            handlePageChange(e);
          }}
          containerClassName={"pagination-container"}
          pageClassName={"pagination-page"}
          pageLinkClassName={"pagination-page-link"}
          previousClassName={"pagination-previous"}
          previousLinkClassName={"pagination-previous-link"}
          nextClassName={"pagination-next"}
          nextLinkClassName={"pagination-next"}
          breakClassName={"pagination-break"}
          breakLinkClassName={"pagination-break-link"}
          activeClassName={"pagination-active"}
        />
      </Container>
    </>
  );
};

export default Paginator;
