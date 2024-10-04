import React from "react";
import BasinHighlights from "./BasinHighlights";
import { HighlightCardProps } from "./HighlightCard";

const highlights: HighlightCardProps[] = [
  { title: "Impacted population", value: "10,79,631" },
  { title: "Impacted households", value: "13,495" },
  { title: "River Basin Area Affected", value: "373", unit: "sq km" },
];

const HighlightComponent: React.FC = () => {
  return <BasinHighlights highlights={highlights}/>;
};

export default HighlightComponent;
