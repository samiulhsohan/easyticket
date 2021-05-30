import React from "react";
import * as Svg from "react-native-svg";

export interface NothingFoundIconProps {
  height?: number;
}

const NothingFoundIcon: React.FC<NothingFoundIconProps> = ({ height = 40 }) => {
  const svg = `<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="75" cy="75" r="75" fill="#D5E3FF"/>
  <rect x="43.114" y="50.2994" width="63.7725" height="15.2695" rx="6" fill="#004DE8"/>
  <rect x="43.1138" y="74.5509" width="63.7725" height="16.1677" rx="6" fill="#004DE8"/>
  <rect x="43.1138" y="99.7006" width="63.7725" height="15.2695" rx="6" fill="#004DE8"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M31.4373 136.059V39.521C31.4373 35.5524 34.6544 32.3353 38.6229 32.3353H111.377C115.346 32.3353 118.563 35.5524 118.563 39.521V136.058C117.971 136.482 117.372 136.897 116.767 137.303V39.521C116.767 36.5446 114.354 34.1317 111.377 34.1317H38.6229C35.6465 34.1317 33.2337 36.5446 33.2337 39.521V137.304C32.6286 136.897 32.0297 136.482 31.4373 136.059Z" fill="#004DE8"/>
  </svg>
  `;
  return <Svg.SvgXml xml={svg} width="100%" height={height} />;
};

export default NothingFoundIcon;
