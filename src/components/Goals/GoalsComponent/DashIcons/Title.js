import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import "./Title.css";

export default function Title() {
  function AnimeTitle() {
    anime({
      targets: ".home-title-letters",
      translateY: 75,
      delay: anime.stagger(100), // increase delay by 100ms for each elements.
      loop: true,
    });
  }

  useEffect(() => {
    AnimeTitle();
  }, []);

  return (
    <div className="home-title">
      <div className="home-title-letters">【</div>
      <div className="home-title-letters">𝔾</div>
      <div className="home-title-letters">𝕠</div>
      <div className="home-title-letters">𝕒</div>
      <div className="home-title-letters">𝕝</div>
      <div className="home-title-letters">－</div>
      <div className="home-title-letters">ℙ</div>
      <div className="home-title-letters">𝕣</div>
      <div className="home-title-letters">𝕠</div>
      <div className="home-title-letters">𝕘</div>
      <div className="home-title-letters">𝕣</div>
      <div className="home-title-letters">𝕖</div>
      <div className="home-title-letters">𝕤</div>
      <div className="home-title-letters">𝕤</div>
      <div className="home-title-letters">𝕚</div>
      <div className="home-title-letters">𝕠</div>
      <div className="home-title-letters">𝕟</div>
      <div className="home-title-letters">】</div>
    </div>
  );
}
