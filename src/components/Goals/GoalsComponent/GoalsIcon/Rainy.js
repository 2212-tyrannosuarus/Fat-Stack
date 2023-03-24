import React from "react";
import { Icon } from "@chakra-ui/react";
import { FiCloudRain } from "react-icons/fi";
import { AiOutlineCar } from "react-icons/ai";
import { BiHomeSmile } from "react-icons/bi";
import { GiMuscleUp } from "react-icons/gi";
import { MdOutlineElderly } from "react-icons/md";
import { IoHomeOutline, IoSchoolOutline } from "react-icons/io";
import { GiStairsGoal } from "react-icons/gi";
import { TbPlaneInflight, TbSchool } from "react-icons/tb";
import "./goalicon.css";

export default function Rainy({ name }) {
  return (
    <div className="goalboxicons">
      <Icon
        as={
          name === "Crush a Loan"
            ? GiMuscleUp
            : name === "Save for a Rainy Day"
            ? FiCloudRain
            : name === "Prepare for Retirement"
            ? MdOutlineElderly
            : name === "Buy a Home"
            ? BiHomeSmile
            : name === "Buy a Car"
            ? AiOutlineCar
            : name === "Save for College"
            ? TbSchool
            : name === "Take a Trip"
            ? TbPlaneInflight
            : GiStairsGoal
        }
        boxSize="2em"
        color="teal"
        className="goalboxiconbabies"
      />
      <p id="search-label">{name}</p>
    </div>
  );
}
