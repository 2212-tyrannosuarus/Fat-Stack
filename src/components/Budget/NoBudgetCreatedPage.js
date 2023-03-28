import React from "react";
import {
  Box,
  Text,
  Icon,
  ListIcon,
  ListItem,
  List,
} from "@chakra-ui/react";
import { GiTakeMyMoney } from "react-icons/gi";
import { IconContext } from "react-icons";
import { MdCheckCircle } from "react-icons/md";

const NoBudgetCreated = () => {
  return (
    <div className="col-8">
      <Box
        bg="white"
        rounded="lg"
        overflow="hidden"
        px={6}
        py={12}
        mr={5}
        display="flex"
        flexDirection="column"
        boxShadow="md"
      >
        <div className="row">
          <div className="col-1">
            <IconContext.Provider value={{ color: "#a6a7fe", size: "25px" }}>
              <Icon
                as={GiTakeMyMoney}
                w={10}
                h={10}
                mb={4}
                horizontalAlign="center"
              />
            </IconContext.Provider>
          </div>
          <div className="col-11">
            <Text fontWeight="bold" fontSize="xl" mb={2}>
              You have not yet created a budget
            </Text>

            <Text fontSize="md">
              There are various benefits to creating a budget
            </Text>

            <List spacing={3}>
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
        </div>
      </Box>
    </div>
  );
};

export default NoBudgetCreated;
