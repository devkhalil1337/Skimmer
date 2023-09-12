import React from "react";
import { Ski16 } from "../Components/skimmerskiffsixteen";
import ModelContainer from "../Components/ModelContainer";
import {
  modelParts,
  colorOptions,
  options,
  initialColors,
  initialOptions,
} from "../Constants/Skimmer16";

export default function Skimmer16() {
  return (
    <ModelContainer
      options={options}
      modelParts={modelParts}
      colorOptions={colorOptions}
      initialColors={initialColors}
      initialOptions={initialOptions}
    >
      <Ski16 />
    </ModelContainer>
  );
}
