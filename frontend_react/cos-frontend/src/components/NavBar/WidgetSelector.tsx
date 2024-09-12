import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface WidgetSelectorProps {
  setVisibleAlerts: (visible: boolean) => void;
  setVisibleLayers: (visible: boolean) => void;
  setVisibleLegend: (visible: boolean) => void;
}

const WidgetSelector: React.FC<WidgetSelectorProps> = ({
  setVisibleAlerts,
  setVisibleLayers,
  setVisibleLegend,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectWidget = (widget: "alerts" | "layers" | "legend") => {
    switch (widget) {
      case "alerts":
        setVisibleAlerts(true);
        break;
      case "layers":
        setVisibleLayers(true);
        break;
      case "legend":
        setVisibleLegend(true);
        break;
    }
    handleClose();
  };


  return (
    <div>
      <div className="flex justify-center w-[100px] bg-teal-100 bg-opacity-80 rounded-full">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <span 
           style={{ textTransform: 'capitalize' }}
           className="text-white basis-auto font-inter">
            Widgets
          </span>
        </Button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleSelectWidget('alerts')} >Alerts</MenuItem>
        <MenuItem onClick={() => handleSelectWidget('layers')} >Map Layers</MenuItem>
        <MenuItem onClick={() => handleSelectWidget('legend')} >Legend</MenuItem>
      </Menu>
    </div>
  );
};

export default WidgetSelector;
