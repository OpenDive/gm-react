import React, { useEffect } from "react";
import useExternalScripts from "./hooks/useExternalScripts";

const BodyComponent = (props) => {
  // Load scripts with id and URL to public folder
  useExternalScripts({
    id: "game_extension",
    url: `html5game/GameExtension.js`,
  });
  useExternalScripts({
    id: "tph",
    url: `html5game/tph_FuncExtension.js`,
  });

  // Execute GameMaker_Init when it is available on window
  useEffect(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      if (window.GameMaker_Init) {
        window.GameMaker_Init();
      }
    }, 1000);
  }, [window.GameMaker_Init]);

  // Retrieve aptos.account on initial render and store it.
  const [address, setAddress] = React.useState(null);

  /**
 * init function
 */
  const init = async() => {
    // connect
    const { address, publicKey } = await window.aptos.connect();
    setAddress(address);
  }
  
  React.useEffect(() => {
    //   init();
  }, []);

  return (
    <div className={props.id + "_class"} id={props.id + "_id"}>
      <canvas id="canvas" width="1366" height="768">
        <p>Your browser doesn't support HTML5 canvas.</p>
      </canvas>
    </div>
  );
};

export default BodyComponent;
