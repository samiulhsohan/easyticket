import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TicketingStack from "./TicketingStack";

interface RoutesProps {
  terms: {
    agreed: boolean;
    message: string;
  };
}

const Routes: React.FC<RoutesProps> = ({ terms }) => {
  return (
    <NavigationContainer>
      <TicketingStack terms={terms} />
    </NavigationContainer>
  );
};

export default Routes;
