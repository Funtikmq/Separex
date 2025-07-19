import { useRef } from "react";
import Header from "../Header.jsx";
import Constructor from "./constructor/Constructor.jsx";
import NavigationBar from "./navigation/NavigationBar.jsx";
import { useDoorsLogic } from "./hooks/useDoorsLogic.js";

function Configurator() {
  const doorLogic = useDoorsLogic();
  const doorFrameRef = useRef(null);

  return (
    <>
      <Header />
      <main className="mainLayout">
        <NavigationBar {...doorLogic} doorFrameRef={doorFrameRef} />
        <Constructor {...doorLogic} doorFrameRef={doorFrameRef} />
      </main>
    </>
  );
}

export default Configurator;
