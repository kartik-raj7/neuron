import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import ContentBox from "./components/Box";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DragFromOutsideLayout = () => {
  const [compactType, setCompactType] = useState("horizontal");
  const [mounted, setMounted] = useState(false);
  const [layout, setLayout] = useState([
    { i: "a", x: 0, y: 0, w: 2, h: 12 },
    { i: "c", x: 2, y: 0, w: 4, h: 12 },
    { i: "b", x: 0, y: 1, w: 7, h: 14 },
  ]);
  useEffect(() => {
    setMounted(true);
  }, []);

  const onDrop = (elemParams) => {
    alert(`Element parameters:\n${JSON.stringify(elemParams, ["x", "y", "w", "h"], 2)}`);
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className="droppable-element"
        draggable={true}
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      ></div>
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
        {layout.map((itm, i) => (
          <div key={itm.i} data-grid={itm} className="bg-slate-500 flex items-center justify-center" onMouseDown={(e) => e.stopPropagation()}>
            <div  >
           <ContentBox itm={itm}/>
            </div>
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default DragFromOutsideLayout;
