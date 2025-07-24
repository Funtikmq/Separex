import { useRef } from "react";
import Header from "../Header.jsx";
import Constructor from "./constructor/Constructor.jsx";
import NavigationBar from "./navigation/NavigationBar.jsx";
import { useDoorsContext } from "../../context/DoorsContext.jsx";

function Configurator() {
  const doorLogic = useDoorsContext();
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
