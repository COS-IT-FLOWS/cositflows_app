import React, { FunctionComponent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Minimize from "@mui/icons-material/Minimize";
import CheckBox  from "@mui/icons-material/CheckBoxRounded";

export type LayerWidgetType = {
  className?: string;
};

const LayerWidget: FunctionComponent<LayerWidgetType> = ({ className = "" }) => {
  return (
    <div className={`w-[316px] h-[620px] text-left text-base text-white font-inter ${className}`} >
      <div className="relative w-[316px] h-[312px]">
        <div className="rounded-11xl bg-gray-400 w-full h-full">

        <div className="flex items-center justify-between p-4">
              <span className="leading-[22px] ml-4">Map Layers and Data</span>
          <div className="flex items-center gap-1">
            <Minimize
            className=" text-white cursor-pointer" 
            style={{ transform: 'translateY(-6px)', width:'20px', height:'20px' }}
            onClick={()=> console.log("Minimize clicked")}
            />
            <CloseIcon 
            className="text-white cursor-pointer" 
            style={{ width:'20px', height:'20px'}}
            onClick={() => console.log("Close button clicked")}/>
          </div>
        </div>

        <div className="absolute top-[48px] left-[30px] w-[260px] h-[242px] text-xs">
          <div className="absolute top-[0px] left-[4px] w-[232.5px] h-[206px]">
            <div className="absolute top-[162px] left-[16px] w-[216.5px] flex flex-row items-center justify-between text-sm">
              <div className="flex flex-col items-start justify-start">
                <div className="w-24 flex flex-col items-start justify-start gap-[5px]">
                  <div className="self-stretch relative leading-[22px] capitalize font-semibold flex items-center h-[17px] shrink-0">
                    IMD Grid Data
                  </div>
                  <div className="w-[95.6px] relative h-[22px]">
                    <div className="w-full top-[0%] left-[0%] leading-[22px] capitalize font-semibold flex items-center">
                      Satellite Data
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <AddIcon className="w-[10px] h-[13px] text-white" />
                <AddIcon className="w-[10px] h-[13px] text-white" />
              </div>
            </div>
            <div className="absolute top-[34px] left-[16px] w-[199px] h-[132px]">
              <div className="absolute top-[5px] left-[179px] w-5 flex flex-col items-start justify-start gap-2.5">
                <div className="self-stretch relative h-2.5">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-81xl bg-lightgray-100" />
                  <div className="absolute h-[77%] w-2/5 top-[12%] right-[54.5%] bottom-[11%] left-[5.5%] shadow-[0px_5px_10px_rgba(0,_0,_0,_0.05)] rounded-[50%] bg-white" />
                </div>
                <div className="self-stretch relative h-2.5">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-81xl bg-lightgray-100" />
                  <div className="absolute h-[77%] w-2/5 top-[12%] right-[54.5%] bottom-[11%] left-[5.5%] shadow-[0px_5px_10px_rgba(0,_0,_0,_0.05)] rounded-[50%] bg-white" />
                </div>
                <div className="self-stretch relative h-2.5">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-81xl bg-lightgray-100" />
                  <div className="absolute h-[77%] w-2/5 top-[12%] right-[54.5%] bottom-[11%] left-[5.5%] shadow-[0px_5px_10px_rgba(0,_0,_0,_0.05)] rounded-[50%] bg-white" />
                </div>
                <div className="self-stretch relative h-2.5">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-81xl bg-lightgray-100" />
                  <div className="absolute h-[77%] w-2/5 top-[12%] right-[54.5%] bottom-[11%] left-[5.5%] shadow-[0px_5px_10px_rgba(0,_0,_0,_0.05)] rounded-[50%] bg-white" />
                </div>
                <div className="self-stretch relative h-2.5">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-81xl bg-lightgray-100" />
                  <div className="absolute h-[77%] w-2/5 top-[12%] right-[54.5%] bottom-[11%] left-[5.5%] shadow-[0px_5px_10px_rgba(0,_0,_0,_0.05)] rounded-[50%] bg-white" />
                </div>
                <div className="self-stretch relative h-2.5">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-81xl bg-lightgray-100" />
                  <div className="absolute h-[77%] w-2/5 top-[12%] right-[54.5%] bottom-[11%] left-[5.5%] shadow-[0px_5px_10px_rgba(0,_0,_0,_0.05)] rounded-[50%] bg-white" />
                </div>
              </div>
              <div className="absolute top-[0px] left-[0px] h-[132px] flex flex-col items-start justify-start">
                <div className="relative leading-[22px] font-semibold">
                  Rainfall gauges
                </div>
                <div className="relative leading-[22px] font-semibold mt-[-2px]">
                  Reservoir/Dam level
                </div>
                <div className="relative leading-[22px] font-semibold mt-[-2px]">
                  Groundwater level
                </div>
                <div className="relative leading-[22px] font-semibold mt-[-2px]">
                  River water level
                </div>
                <div className="relative leading-[22px] font-semibold mt-[-2px]">
                  Tidal level
                </div>
                <div className="relative leading-[22px] font-semibold mt-[-2px]">
                  Regulators
                </div>
              </div>
            </div>
            <div className="absolute top-[0px] left-[0px] leading-[22px] capitalize font-semibold text-center flex items-center justify-center w-[50px] h-[23px]">{`Manual `}</div>
          </div>
          <div className="absolute top-[0px] left-[66px] leading-[22px] capitalize font-semibold text-center flex items-center justify-center w-[58px] h-[23px]">
            Real time
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LayerWidget;