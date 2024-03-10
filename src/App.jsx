import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import ContentBox from "./components/Box";
import { Button } from "antd/es/radio";
import { Col, Row } from "antd";
import { axiosGet } from "./api/apiservice";

// WidthProvider for making the layout responsive
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Main component for the draggable grid layout
const DragFromOutsideLayout = () => {
  // State for the compact type, mounting status, and initial layout
  const [compactType, setCompactType] = useState("horizontal");
  const [count,setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [layout, setLayout] = useState([
    { i: "a", x: 0, y: 0, w: 2, h: 12 },
    { i: "c", x: 2, y: 0, w: 4, h: 12 },
    { i: "b", x: 0, y: 1, w: 7, h: 14 },
  ]);

  // Effect hook to set the mounting status
  useEffect(() => {
    setMounted(true);
  }, []);

  // Callback function triggered when an element is dropped onto the grid
  const onDrop = (elemParams) => {
    alert(`Element parameters:\n${JSON.stringify(elemParams, ["x", "y", "w", "h"], 2)}`);
  };
  const getCount  = async()=>{
    const apiResponse = await axiosGet('/count');
    console.log(apiResponse)
    setCount(apiResponse.count);
  }
  return (
    <>
    <Row className="flex justify-center">
    <Row><Col span={12} className="text-2xl">{count}</Col></Row>
    <Row onClick={getCount}><Button className="bg-slate-500">Get Count</Button></Row>
    </Row>
    <div className="flex justify-center items-center">
      {/* Draggable element */}
      <div
        className="droppable-element"
        draggable={true}
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      ></div>
      {/* Responsive grid layout */}
      <ResponsiveReactGridLayout
        rowHeight={30}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layout={layout}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType="vertical"
        preventCollision={!compactType}
        isDroppable={true}
        droppingItem={{ i: "xx", h: 50, w: 250 }}
        className="w-[65%]"
      >
        {/* Map through the layout and render ContentBox for each item */}
        {layout.map((itm, i) => (
          <div key={itm.i} data-grid={itm} className="bg-slate-500 flex items-center justify-center" onMouseDown={(e) => e.stopPropagation()}>
            <div  >
              {/* ContentBox component for rendering and managing content */}
              <ContentBox itm={itm}/>
            </div>
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
    </>
  );
};

export default DragFromOutsideLayout;
