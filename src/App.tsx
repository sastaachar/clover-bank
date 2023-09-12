import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Manage } from "./components/manage/Manage";
import {
  AuthType,
  EmbedEvent,
  init,
  LiveboardEmbed,
} from "@thoughtspot/visual-embed-sdk";
const TS_HOST = "https://172.19.168.35:8443";

init({
  thoughtSpotHost: TS_HOST,
  authType: AuthType.None,
});

const Root: React.FC<{ setRef: (libRef: any) => void }> = (props) => {
  useEffect(() => {
    const lib = new LiveboardEmbed("#ts-preRenderFull-embed", {
      liveboardId: "7752fa9e-db22-415e-bf34-e082c4bc41c3",
    }).prerenderFull("test-1");

    props.setRef(lib);
  }, []);

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (time < 10) {
      setTimeout(() => {
        setTime(time + 1);
      }, 1000);
    }
  }, [time]);

  return (
    <>
      Loading screen : {time}
      <div
        className="root"
        style={{ height: "90%", backgroundColor: "pink" }}
      ></div>
      <Link to={"/manage"}>go</Link>
    </>
  );
};

function App() {
  const ref = useRef<LiveboardEmbed | null>(null);

  const setRef = (libRef: LiveboardEmbed | null) => {
    ref.current = libRef;
  };

  return (
    <div className="App">
      hi
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root setRef={setRef} />} />
          <Route path="/manage" element={<Manage libRef={ref} />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
const Test: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const pref = useRef<HTMLDivElement>(null);
  const cref = useRef<HTMLDivElement>(null);

  const pref2 = useRef<HTMLDivElement>(null);
  const cref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Setting root ", pref.current);
    console.log("Setting child", cref.current);

    if (!pref.current || !cref.current) {
      console.log("not defined");
      return;
    }

    observerRef.current = new IntersectionObserver(
      (e) => {
        console.log(e);
      },
      {
        root: pref2.current,
        threshold: 0,
      }
    );

    if (pref2.current) observerRef.current.observe(pref2.current);

    return () => {
      console.log("Removed observer", cref.current);
      if (observerRef.current && pref2.current)
        observerRef.current.unobserve(pref2.current);
    };
  }, []);

  return (
    <div>
      <div id="test-parent" ref={pref}>
        <div id="test-child" ref={cref} />
      </div>
      <div id="test-parent2" ref={pref2}>
        <div id="test-child2" ref={cref2} />
      </div>
    </div>
  );
};

export default App;
