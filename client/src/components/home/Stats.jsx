import { CountUp } from "countup.js";
import { useEffect, useRef } from "react";

export default function Stats() {
  const ref = useRef(null);

  useEffect(() => {
    const counter = new CountUp(ref.current, 10000);
    counter.start();
  }, []);

  return <h1 ref={ref}></h1>;
}