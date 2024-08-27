import React from "react";
import AlertCard from "./AlertCard";

const MyComponent: React.FC = () => {
  {
    const handleClick =()=>
    console.log("Overlay!")
  }
  
  function handleClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <AlertCard
      alertType="Lightning"
      intensity="High intensity"
      date="17 July"
      time="9:50 PM"
      location="Vellikulangara, Chowka, Kodassery"
      validUntil="Valid till 18 July, 9:50PM"
      issuedBy="KSDMA"
      onClick={handleClick}
    />
  );
};

export default MyComponent;
