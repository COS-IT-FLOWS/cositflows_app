import React from "react";
import AlertCard from "./AlertCard";

const MyComponent: React.FC = () => {
  return (
    <AlertCard
      alertType="Lightning"
      intensity="High intensity"
      date="17 July"
      time="9:50 PM"
      location="Vellikulangara, Chowka, Kodassery"
      validUntil="Valid till 18 July, 9:50PM"
      issuedBy="KSDMA"
    />
  );
};

export default MyComponent;
