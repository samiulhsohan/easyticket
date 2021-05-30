import React from "react";
import * as Svg from "react-native-svg";

export interface DurationDividerProps {
  height?: number;
  variant?: "left" | "right";
}

const DurationDivider: React.FC<DurationDividerProps> = ({
  height = 5,
  variant = "left",
}) => {
  const svgLeft = `<svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="2.5" cy="2.5" r="2.5" fill="#C4C4C4"/>
  <rect x="3" y="2" width="12" height="1" fill="#C4C4C4"/>
  </svg>     
  `;

  const svgRight = `<svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12.5" cy="2.5" r="2.5" transform="rotate(180 12.5 2.5)" fill="#C4C4C4"/>
  <rect x="12" y="3" width="12" height="1" transform="rotate(180 12 3)" fill="#C4C4C4"/>
  </svg>
  `;

  return variant === "left" ? (
    <Svg.SvgXml xml={svgLeft} height={height} />
  ) : (
    <Svg.SvgXml xml={svgRight} height={height} />
  );
};

export default DurationDivider;
