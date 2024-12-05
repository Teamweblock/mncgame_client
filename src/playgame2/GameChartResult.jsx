

import React, { useRef } from "react";
import ReactDOM from "react-dom";
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  Inject,
  PointersDirective,
  PointerDirective,
  RangesDirective,
  RangeDirective,
  Annotations,
  GaugeTheme,
  Legend,
} from "@syncfusion/ej2-react-circulargauge";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

// Import Syncfusion styles
import "@syncfusion/ej2-base/styles/material.css"; // Base styles
import "@syncfusion/ej2-buttons/styles/material.css"; // Buttons styles
import "@syncfusion/ej2-dropdowns/styles/material.css"; // Dropdown styles
import GaugeComponent from "react-gauge-component";

const GameChartResult = ({score, levelNumber}) => {
  console.log("score", score);
  return (
    <div>
    

<GaugeComponent
  value={score}
  type="radial"
  labels={{
    tickLabels: {
      type: "inner",
      ticks: [
        { value: 20 },
        { value: 40 },
        { value: 60 },
        { value: 80 },
        { value: 100 }
      ]
    }
  }}
  arc={{
    colorArray: ['#FC3D3D','#FC4C02',"#FDD60D","#3FCD05","#01B43C"],
    subArcs: [{limit: 20}, {limit: 40}, {limit:60}, {limit:80}, {limit:100}],
    
    padding: 0.02,
    width: 0.3
  }}
  pointer={{
    elastic: true,
    animationDelay: 0
  }}
/>
    </div>
  );
};

export default GameChartResult;



