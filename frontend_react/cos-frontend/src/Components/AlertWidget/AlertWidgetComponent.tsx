import React from "react";
import AlertWidget from "./AlertWidget";

const MyComponent: React.FC = () => {
  const alerts = [
    {   
        alertType: "Lightning",
        intensity: "High Intensity",
        date: "17 July",
        time: "9:50PM",
        location: "Vellikulangara, Chowka, Kodassery",
        validUntil: "Valid till 18 July, 9:50PM",
        issuedBy: "KSDMA",
      },
      {
        alertType: "Lightning",
        intensity: "High Intensity",
        date: "17 July",
        time: "9:50PM",
        location: "Vellikulangara, Chowka, Kodassery",
        validUntil: "Valid till 18 July, 9:50PM",
        issuedBy: "KSDMA",
      },
      {
        alertType: "Lightning",
        intensity: "High Intensity",
        date: "17 July",
        time: "9:50PM",
        location: "Vellikulangara, Chowka, Kodassery",
        validUntil: "Valid till 18 July, 9:50PM",
        issuedBy: "KSDMA",
      },
      {
        alertType: "Lightning",
        intensity: "High Intensity",
        date: "17 July",
        time: "9:50PM",
        location: "Vellikulangara, Chowka, Kodassery",
        validUntil: "Valid till 18 July, 9:50PM",
        issuedBy: "KSDMA",
      },
      {
        alertType: "Lightning",
        intensity: "High Intensity",
        date: "17 July",
        time: "9:50PM",
        location: "Vellikulangara, Chowka, Kodassery",
        validUntil: "Valid till 18 July, 9:50PM",
        issuedBy: "KSDMA",
      },
  ];
    return (
    <AlertWidget
        location="Chalakudy" alerts={alerts}
    />
  );
};

export default MyComponent;