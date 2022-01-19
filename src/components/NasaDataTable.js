import { useRef, useCallback, memo } from 'react'
import PropTypes from 'prop-types';
import { useVirtual } from 'react-virtual'

function NasaDataTable({ data }) {
  const listRef = useRef();
  const rowVirtualizer = useVirtual({
    size: data.length ? data.length : 0,
    parentRef: listRef,
    estimateSize: useCallback(() => 40, []),
    overscan: 5
  });
  if (data?.length) {
    return (
      <>
        <div
          ref={listRef}
          className="List"
        >
          <div
            style={{
              height: `${rowVirtualizer.totalSize}px`,
              width: "100%",
              position: "relative"
            }}
          >
            <div
              key={-1}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${rowVirtualizer.virtualItems[0].size}px`,
                transform: `translateY(${rowVirtualizer.virtualItems[0].start}px)`,
                backgroundColor: 'blue'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'white',
                }}
              >
                <div style={{ width: 30 }} />
                <div className="tab-element">
                  Neao Name
                </div>
                <div className="tab-element">
                  Min Estimated Diameter (km)
                </div>
                <div className="tab-element">
                  Max Estimated Diameter (km)
                </div>
              </div>
            </div>


            {rowVirtualizer.virtualItems.map(virtualRow => (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: rowVirtualizer.virtualItems[0].size,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ width: 30, textAlign: 'left'}}>
                    {virtualRow.index + 1}.
                  </div>

                  <div className="tab-element">
                    {data[virtualRow.index][0]}.
                  </div>
                  <div className="tab-element">
                    {data[virtualRow.index][1]}
                  </div>
                  <div className="tab-element">
                    {data[virtualRow.index][2]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  return null;
}

NasaDataTable.propTypes = {
  data: PropTypes.object.isRequired
}

export default memo(NasaDataTable);