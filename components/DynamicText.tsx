import React, { useState, forwardRef, useImperativeHandle } from "react";

const DynamicText = (props, ref) => {
  const [value, setValue] = useState("Random Text");

  useImperativeHandle(ref, () => ({
    changeValue: (newValue) => {
      setValue(newValue);
    },
  }))  

  return <h1>{value}</h1>;
};

export default forwardRef(DynamicText);
