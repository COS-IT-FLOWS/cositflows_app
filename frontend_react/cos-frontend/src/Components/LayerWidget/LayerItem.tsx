import React from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface LayerItemProps {
  label: string;
}

const LayerItem: React.FC<LayerItemProps> = ({ label }) => (
  <div className="flex gap-1 items-center">
     <CheckBoxIcon
     style={{width:"18px", height:"18px"}}
     className="text-zinc"/>
    <div className="self-stretch my-auto">{label}</div>
  </div>
);

export default LayerItem;
