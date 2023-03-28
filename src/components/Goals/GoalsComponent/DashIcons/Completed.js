import React, { useEffect } from "react";
import "./Completed.css";
import anime from "animejs/lib/anime.es.js";
import { Link, Routes, Route } from "react-router-dom";

export default function Completed() {
  let PATH = {
    chickIcon: ".chick-icon",
  };

  let chickJumpAnimation;

  const jumpKeyframes = {
    scaleY: [
      { value: 0.75, duration: 170 },
      { value: 1, duration: 170, delay: 120 },
    ],
    translateY: [
      { value: -20, duration: 170, delay: 170 },
      { value: 0, duration: 170, delay: 220 },
    ],
  };

  const _revealVert = (bottomY, easing, delay) => ({
    translateY: [bottomY, 0],
    opacity: [0, 1],
    easing: easing,
    delay: anime.stagger(delay),
  });

  const chickIconAnimation = anime({
    targets: `${PATH.chickIcon}`,
    ..._revealVert(25, "easeOutElastic", 100),

    complete: function () {
      const chick = document.querySelector(PATH.chickIcon);
      chick.style.transformOrigin = "center bottom";

      chickJumpAnimation = anime({
        targets: `${PATH.chickIcon}`,
        ...jumpKeyframes,
        loop: true,
        easing: "linear",
      });
    },
  });

  return (
    <div id="GameBoyIcon">
      <div className="icon-block">
        <div className="icon chick-icon" id="gameboy-icon-pic">
          <Link to="/michelle">
            {" "}
            <img
              src="https://cdn-icons-png.flaticon.com/512/1535/1535019.png"
              width="100px"
              height="100px"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
}
