import React from "react";
import * as Svg from "react-native-svg";

export interface NothingFoundIconProps {
  height?: number;
}

const NothingFoundIcon: React.FC<NothingFoundIconProps> = ({ height = 40 }) => {
  const svg = `<svg width="158" height="150" viewBox="0 0 158 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="79" cy="75" r="75" fill="#D5E3FF"/>
  <rect x="6.08398" y="45.1362" width="63.7725" height="15.2695" rx="6" transform="rotate(-29.2249 6.08398 45.1362)" fill="#004DE8"/>
  <rect x="89.9468" y="109.136" width="63.7725" height="15.2695" rx="6" transform="rotate(-29.2249 89.9468 109.136)" fill="#004DE8"/>
  <rect x="49.2856" y="132.033" width="36.4277" height="15.2695" rx="6" transform="rotate(-29.2249 49.2856 132.033)" fill="#004DE8"/>
  <rect x="60.5251" y="48.8884" width="63.7725" height="16.1677" rx="6" transform="rotate(-29.2249 60.5251 48.8884)" fill="#004DE8"/>
  <rect y="83.1481" width="53.5561" height="16.1677" rx="6" transform="rotate(-29.2249 0 83.1481)" fill="#004DE8"/>
  <rect x="39.5251" y="99.8884" width="63.7725" height="15.2695" rx="6" transform="rotate(-29.2249 39.5251 99.8884)" fill="#004DE8"/>
  <rect x="103" y="60.1362" width="54.1016" height="15.2695" rx="6" transform="rotate(-29.2249 103 60.1362)" fill="#004DE8"/>
  </svg>
  `;
  return <Svg.SvgXml xml={svg} width="100%" height={height} />;
};

export default NothingFoundIcon;
