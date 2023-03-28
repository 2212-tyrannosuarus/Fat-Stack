import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import { Link } from "react-router-dom";

export default function Progress() {
  function animeTechnology() {
    anime({
      targets: ".technology-icon",
      scale: [0.1, 1],
      opacity: [0.1, 1],
      rotate: "2turn",
      duration: 4000,
      loop: true,
    });
  }
  const handleAnimation = () => {
    animeTechnology();
  };

  useEffect(() => {
    handleAnimation();
  }, []);

  return (
    <div id="GameBoyIcon">
      <div className="icon-block">
        <div className="icon technology-icon" id="technology-icon-pic">
          <Link to="/gameroutes">
            {" "}
            <img
              src="https://cdn-icons-png.flaticon.com/512/5038/5038308.png"
              width="100px"
              height="100px"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
}
