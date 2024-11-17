import { useState } from "react";

const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    replace ? setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]) : setHistory(prev => [...prev, newMode]);
  }

  const back = () => {
    history[history.length - 1] === initial ? setHistory([initial]) : setHistory(prev => [...prev.slice(0, prev.length - 1)]);
  }

  return { mode: history[history.length - 1], transition, back }
}

export default useVisualMode;