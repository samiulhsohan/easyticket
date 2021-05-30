import React from "react";
import * as Svg from "react-native-svg";

export interface LogoProps {
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ height = 40 }) => {
  const svg = `<svg width="76" height="40" viewBox="0 0 76 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
    <path d="M55.2792 5.46793H52.248H49.6398H46.6086H43.9898H25.9419H23.5159H6.37836H3.0312V3.0312H23.0821V0H3.0312H0V3.0312V37.665H3.0312V8.49913H6.37836H20.4793V12.7567H5.46793V30.4726L23.5159 38.4737V8.49913H25.9419V15.7879H35.5657V12.7567H28.9731V8.49913H40.9586V34.6338H28.9731V20.0509H25.9419V37.665H43.9898V31.2277H46.6086V37.665H49.6398V8.49913H52.248V37.665H55.2792V8.49913H72.7487V12.7567H57.732V30.4726L75.7799 38.4737V5.46793H55.2792ZM20.4847 33.8198L8.49913 28.5072V15.7933H20.4847V33.8198ZM46.6086 28.1965H43.9898V8.49913H46.6086V28.1965ZM72.7487 33.8198L60.7631 28.5072V15.7933H72.7487V33.8198Z" fill="#00988A"/>
    <path d="M60.4017 33.1031L59.0461 35.8142L67.4189 40.0006L68.7745 37.2895L60.4017 33.1031Z" fill="#00988A"/>
    </g>
    <defs>
    <clipPath id="clip0">
    <rect width="75.7799" height="40" fill="white"/>
    </clipPath>
    </defs>
  </svg>
  `;
  return <Svg.SvgXml xml={svg} height={height} />;
};

export default Logo;
