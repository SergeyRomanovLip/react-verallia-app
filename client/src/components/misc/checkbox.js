import React, { useEffect, useState } from "react";

function Checkbox({ fun, data, text, checkState }) {
  const [state, setState] = useState(false);
  useEffect(() => {
    if (checkState) {
      setState(checkState);
    }
  }, [checkState]);

  return (
    <label
      onClick={() => {
        state ? setState(false) : setState(true);
        fun(data, state ? false : true);
      }}
      className={state ? "checkbox-checked" : "checkbox"}
    >
      {text}
    </label>
  );
}

export default Checkbox;
