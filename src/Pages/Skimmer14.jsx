import React from "react";
import ModelContainer from "../Components/ModelContainer";
import { Skifour } from "../Components/skimmer-skiff-fourteen";
import {
  modelParts,
  colorOptions,
  options,
  initialColors,
  initialOptions,
} from "../Constants/Skimmer14";
export default function Skimmer14() {
  return (
    <ModelContainer
      options={options}
      modelParts={modelParts}
      colorOptions={colorOptions}
      initialColors={initialColors}
      initialOptions={initialOptions}
    >
      <Skifour />
    </ModelContainer>
  );
}
