import React, { useEffect } from "react";
import { AuthType, LiveboardEmbed, init } from "@thoughtspot/visual-embed-sdk";
import { Link } from "react-router-dom";

export const Manage: React.FC<{
  libRef: React.MutableRefObject<LiveboardEmbed | null>;
}> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  const libEmbed = props.libRef.current;

  useEffect(() => {
    if (libEmbed) {
      libEmbed
        .updatePreRenderedView({
          top: "20px",
          left: "0px",
          width: "100%",
          height: "800px",
        })
        .showPreRendered();
    }
    return () => {
      if (libEmbed) libEmbed.hidePreRendered();
    };
  }, []);
  return (
    <>
      <Link to={"/"}>back</Link>
      <div className="lib-werapper"></div>
      <div ref={divRef} id="ts-preRenderFull-embed"></div>
    </>
  );
};
