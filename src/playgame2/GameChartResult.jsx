import * as React from "react";
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  Inject,
  PointersDirective,
  PointerDirective,
  RangesDirective,
  RangeDirective,
  GaugeTooltip,
  Annotations,
  AnnotationsDirective,
  AnnotationDirective,
} from "@syncfusion/ej2-react-circulargauge";
import "../Assets/CSS/Game2/Game2Result.css"; // Custom styles

import { useRef } from "react";
const GameChartResult = ({ score ,levelNumber}) => {
  console.log("score value is now :", score ,levelNumber);
  
  let gauge = useRef(null);
  const onChartLoad = (args) => {
    document.getElementById("tooltip-container").setAttribute("title", "");
  };
  const load = (args) => {};
  return (
    <main className="pichart-result">
      <div className="control-pane">
        <div className="control-section row">
          <div className="col-lg-12">
            <CircularGaugeComponent
              background="transparent"
              loaded={onChartLoad.bind(this)}
              id="tooltip-container"
              ref={gauge}
              enablePointerDrag={true}
              load={load.bind(this)}
              tooltip={{
                enable: false,
                type: ["Range", "Pointer"],
                format: "Current Value:  {value}",
                enableAnimation: false,
                textStyle: { size: "13px", fontFamily: "inherit" },
              }}
            >
              <Inject services={[GaugeTooltip, Annotations]} />
              <AxesDirective>
                <AxisDirective
                  startAngle={240}
                  endAngle={120}
                  radius="90%"
                  minimum={0}
                  maximum={100}
                  majorTicks={{ height: 0 }}
                  lineStyle={{ width: 0 }}
                  minorTicks={{ width: 0 }}
                  labelStyle={{
                    font: { fontFamily: "inherit" },
                    useRangeColor: false,
                    hiddenLabel: "All", // Hide all labels
                  }}
                >
                  <PointersDirective>
                    <PointerDirective value={score} radius="60%"  />
                   
                    
                  </PointersDirective>
                  <RangesDirective>
                    <RangeDirective
                      start={0}
                      end={20}
                      radius="102%"
                      color="#FC3D3D"
                      startWidth={40}
                      endWidth={40}
                    />
                    <RangeDirective
                      start={21}
                      end={40}
                      radius="102%"
                      color="#FC4C02"
                      startWidth={40}
                      endWidth={40}
                    />
                    <RangeDirective
                      start={41}
                      end={60}
                      radius="102%"
                      color="#FDD60D"
                      startWidth={40}
                      endWidth={40}
                    />
                    <RangeDirective
                      start={61}
                      end={80}
                      radius="102%"
                      color="#3FCD05"
                      startWidth={40}
                      endWidth={40}
                    />
                    <RangeDirective
                      start={81}
                      end={100}
                      radius="102%"
                      color="#01B43C"
                      startWidth={40}
                      endWidth={40}
                    />
                  </RangesDirective>
                  <AnnotationsDirective>
                    <AnnotationDirective
                      content="<div style='font-size:14px; color:#1f1f1f;'>POOR</div>"
                      angle={270}
                      radius="65%"
                    />
                    <AnnotationDirective
                      content="<div style='font-size:14px; color:#1f1f1f;'>FAIR</div>"
                      angle={305}
                      radius="65%"
                    />
                    <AnnotationDirective
                      content="<div style='font-size:14px; color:#1f1f1f;'>GOOD</div>"
                      angle={0}
                      radius="65%"
                    />
                    <AnnotationDirective
                      content="<div style='font-size:14px; color:#1f1f1f;'>VERY GOOD</div>"
                      angle={55}
                      radius="65%"
                    />
                    <AnnotationDirective
                      content="<div style='font-size:14px; color:#1f1f1f;'>HIGH</div>"
                      angle={90}
                      radius="65%"
                    />
                  </AnnotationsDirective>
                </AxisDirective>
              </AxesDirective>
            </CircularGaugeComponent>
          </div>
        </div>
      </div>
    </main>
  );
};
export default GameChartResult;