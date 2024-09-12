import React, { useState } from "react";
import AlertWidget, {Alert} from "./AlertWidget";
import AlertOverlay from "./AlertCard/Overlay/OverlayCard";

interface AlertWidget{
  visibleAlerts: boolean;
  OnClose: () => void;
}

const MyComponent: React.FC<AlertWidget> = ({visibleAlerts, OnClose}) => {
  const [selectedAlert,setSelectedAlert]=useState<Alert | null>(null);
  const [showOverlay, setShowOverlay]= useState(false);

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

  const handleCardClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
  };

    return (
    <div className="relative">
      {visibleAlerts && (
        <AlertWidget
            location="Chalakudy" 
            alerts={alerts}
            onAlertClick={handleCardClick}
            onClose={OnClose}
        />
      )}

        {showOverlay && selectedAlert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <AlertOverlay
                    alertType={selectedAlert.alertType}
                    date={selectedAlert.date}
                    time={selectedAlert.time}
                    issuer={selectedAlert.issuedBy}
                    location={selectedAlert.location}
                    intensity={selectedAlert.intensity}
                    validUntil={selectedAlert.validUntil}
                    onClose={handleOverlayClose}
                />
            </div>
        )}
    </div>
  );
};

export default MyComponent;