import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SwitchNeaoData from 'react-switch'

const Switch = ({onChange}) => {
  const [checkedState, setCheckedState] = useState(false)
  useEffect(() => {
    onChange(checkedState)
  }, [checkedState, onChange])

  const onChangeCheck = (checked) => {
    setCheckedState(checked)
  }
  return (
    <SwitchNeaoData
    checked={checkedState}
    onChange={onChangeCheck}
    handleDiameter={28}
    offColor="#000"
    onColor="#fff"
    offHandleColor="#fff"
    onHandleColor="#000"
    height={40}
    width={200}
    borderRadius={6}
    activeBoxShadow="0px 0px 1px 2px #fffc35"
    uncheckedIcon={
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 15,
          color: "#fff",
          paddingRight: 2
        }}
      >
        Bar Chart
      </div>
    }
    checkedIcon={
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 15,
          color: "#000",
          paddingRight: 2
        }}
      >
        Table
      </div>
    }
    className="react-switch"
    id="small-radius-switch"
  />
  );
};

Switch.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default memo(Switch);