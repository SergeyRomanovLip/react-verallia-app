import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import DrawSVGLayout from "./layouts/drawSVG/DrawSVGLayout";
import { Incidents } from "./layouts/incidents/Incidents";
import { ModalContext } from "../context/ModalContext";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { Loader } from "./Loader";
import { SubcLabelContainer } from "./layouts/subcontractors/SubcLabelContainer";

export const Map = () => {
  const { showModal } = useContext(ModalContext);
  const { appDispatch, ready } = useContext(AppContext);
  const [wrapperState, setWrapperState] = useState(false);
  const [SVGReady, setSVGReady] = useState(false);
  const { layout } = useParams();
  const inputRef = useRef();

  const handlerSetSVGReady = useCallback(() => {
    setSVGReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      setWrapperState(false);
      appDispatch(["setLayout", layout]);
      let rect = inputRef.current.getBoundingClientRect();
      rect.x = rect.x + window.scrollX;
      rect.y = rect.y + window.scrollY;
      appDispatch(["updateWrapperPosition", rect]);
      setWrapperState(true);
    }
  }, [ready, appDispatch, layout]);

  return ready ? (
    <div ref={inputRef} className="mapWrapper">
      {wrapperState && layout === "incidents" ? (
        <Incidents click={showModal} />
      ) : null}
      {SVGReady && layout === "subcontractors" ? <SubcLabelContainer /> : null}
      {wrapperState && layout === "subcontractors" ? (
        <DrawSVGLayout handlerSetSVGReady={handlerSetSVGReady} />
      ) : null}
    </div>
  ) : (
    <Loader />
  );
};

export default Map;
