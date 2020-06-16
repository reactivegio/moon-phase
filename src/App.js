import React, { useEffect, useState } from "react";
import { getMoonPhaseByDate } from "./utils/moonPhase";
import "./App.css";

function App() {
  const [moonPhaseClass, setMoonPhaseClass] = useState("moonContainer");
  const [descPhase, setDescPhase] = useState(null);
  const [radius, setRadius] = useState(null);
  const [outerBG, setOuterBG] = useState(null);
  const [innerBG, setInnerinnerBG] = useState(null);
  const [innerHeight, setInnerHeight] = useState(null);
  const [innerWidth, setInnerWidth] = useState(null);
  const [innerLeft, setInnerLeft] = useState(null);
  const [innerTop, setInnerTop] = useState(null);
  const [innerBoxShadow, setInnerBoxShadow] = useState(null);

  useEffect(() => {
    const today = new Date();
    getMoonPhaseByDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).then((res) => {
      let descPhase = "";
      switch (res.actualPhase) {
        case 0:
          descPhase = "NEW MOON";
          break;
        case 1:
        case 2:
        case 3:
          descPhase = "WAXING CRESCENT MOON";
          break;
        case 4:
        case 5:
        case 6:
          descPhase = "QUATER MOON";
          break;
        case 7:
        case 8:
        case 9:
          descPhase = "WAXING GIBBOUS MOON";
          break;
        case 10:
          descPhase = "FULL MOON";
          break;
        case 11:
        case 12:
        case 13:
          descPhase = "WANING GIBBOUS MOON";
          break;
        case 14:
        case 15:
        case 16:
          descPhase = "LAST QUARTER MOON";
          break;
        case 17:
        case 18:
        case 19:
          descPhase = "WANING CRESCENT MOON";
          break;
        default:
          break;
      }

      setDescPhase(descPhase);

      let innerColor = "";
      let outerColor;
      let percentagePhase = res.percentage;
      if (percentagePhase < 0.5) {
        if (res.isWaxing) {
          outerColor = "rgb(225, 225, 225)";
          innerColor = "rgb(70, 70, 70)";
          percentagePhase *= -1;
        }
        if (!res.isWaxing) {
          outerColor = "rgb(70, 70, 70)";
          innerColor = "rgb(225, 225, 225)";
          percentagePhase *= -1;
        }
      } else {
        percentagePhase = 1 - percentagePhase;
        outerColor = "rgb(70, 70, 70)";
        innerColor = "rgb(225, 225, 225)";
        if (!res.isWaxing) {
          outerColor = "rgb(225, 225, 225)";
          innerColor = "rgb(70, 70, 70)";
          // percentagePhase *= -1;
        }
      }
      let outerDiameter = 100;
      let semiPhase = percentagePhase * 2;
      let innerRadius,
        absPhase = Math.abs(semiPhase),
        n = ((1 - absPhase) * outerDiameter) / 2 || 0.01;
      innerRadius = n / 2 + (outerDiameter * outerDiameter) / (8 * n);
      let innerDiameter = innerRadius * 2;
      let innerOffset =
        semiPhase > 0
          ? outerDiameter / 2 - n
          : -2 * innerRadius + outerDiameter / 2 + n;

      setMoonPhaseClass(res.isWaxing ? "waxing" : "waning");

      let blurredDiameter = innerDiameter - 10;
      let blurredOffset = innerOffset + 10 / 2;
      setInnerinnerBG(innerColor);
      setOuterBG(outerColor);
      setRadius(`${blurredDiameter / 2}px`);
      setInnerHeight(`${blurredDiameter}px`);
      setInnerWidth(`${blurredDiameter}px`);
      setInnerLeft(`${blurredOffset}px`);
      setInnerTop(`${(100 - blurredDiameter) / 2}px`);
      setInnerBoxShadow(`0px 0px 10px 10px ${innerColor}`);
    });
  });

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div style={{ flex: "0 0 calc(33% - 10px)", marginRight: "20px" }}>
          <div
            className={"moonContainer " + moonPhaseClass}
            style={{ backgroundColor: outerBG }}
          >
            <div
              className={"innerMoon " + moonPhaseClass}
              style={{
                borderRadius: radius,
                height: innerHeight,
                width: innerWidth,
                left: innerLeft,
                top: innerTop,
                boxShadow: innerBoxShadow,
                backgroundColor: innerBG,
              }}
            />
            <span className="crater crater--1"></span>
            <span className="crater crater--2"></span>
            <span className="crater crater--3"></span>
          </div>

          <div className="widgetHorizontal">
            <div className="widgetCentered">{descPhase}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
