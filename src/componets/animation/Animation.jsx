
import React from "react";


const Animation = () => {
  return (
    <div className="process-flow">
      {/* Step 1 */}
      <div className="step">
        <img src="/path/to/image1.png" alt="Step 1" />
        <p>Raw Material Verifying</p>
      </div>

      {/* Connector 1 */}
      <div className="connector">
        <div className="dot"></div>
        <div className="line"></div>
      </div>

      {/* Step 2 */}
      <div className="step">
        <img src="/path/to/image2.png" alt="Step 2" />
        <p>Processing The Raw Material</p>
      </div>

      {/* Connector 2 */}
      <div className="connector">
        <div className="dot"></div>
        <div className="line"></div>
      </div>

      {/* Step 3 */}
      <div className="step">
        <img src="/path/to/image3.png" alt="Step 3" />
        <p>Quality Assurance</p>
      </div>

      {/* Connector 3 */}
      <div className="connector">
        <div className="dot"></div>
        <div className="line"></div>
      </div>

      {/* Step 4 */}
      <div className="step">
        <img src="/path/to/image4.png" alt="Step 4" />
        <p>Ready to Delivered</p>
      </div>
    </div>
  );
};

export default Animation;
