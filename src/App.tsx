import './App.css'
import React from "react";
import { VirtualList, VirtualListProxy } from './VirtualList';
import { VirtualGrid } from './VirtualGrid';
import { useVariableSizeItemOffsetMapping } from './useVariableSizeItemOffsetMapping';
import { useFixedSizeItemOffsetMapping } from './useFixedSizeItemOffsetMapping';

const Row = ({ index, isScrolling, style }: { index: number, isScrolling?: boolean, style: any }) => (
  <div className={ index == 0 ? "header" : ( isScrolling ? "cellScroll" : "cell") } style={style}>
    { (index == 0) ? "Header" : "Item " + index }
  </div>
);

const Cell = ({ rowIndex, columnIndex, isScrolling, style }: { rowIndex: number, columnIndex: number, isScrolling?: boolean, style: any }) => (
  <div className={ rowIndex == 0 ? "header" : ( isScrolling ? "cellScroll" : "cell") } style={style}>
    { (rowIndex == 0) ? `${columnIndex}` : `${rowIndex}:${columnIndex}` }
  </div>
);

function App() {
  var mapping = useVariableSizeItemOffsetMapping(30, [50]);
  var columnMapping = useFixedSizeItemOffsetMapping(100);
  const ref = React.createRef<VirtualListProxy>();

  return (
    <div className="app-container">
      <label>
        ScrollToItem: 
        <input
          type={"number"}
          height={200}
          onChange={(event) => {
            const value = parseInt(event.target?.value);
            ref.current?.scrollToItem(value)
          }}
        />
      </label>

      <VirtualList
        ref={ref}
        height={240}
        itemCount={100}
        itemOffsetMapping={mapping}
        useIsScrolling={true}
        width={600}>
        {Row}
      </VirtualList>

      <VirtualGrid
        ref={ref}
        height={240}
        rowCount={100}
        rowOffsetMapping={mapping}
        columnCount={100}
        columnOffsetMapping={columnMapping}
        useIsScrolling={true}
        width={600}>
        {Cell}
      </VirtualGrid>
    </div>
  )
}

export default App
