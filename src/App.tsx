import React from "react";
import "./App.css";
import { useRef, useState } from "react";

function App() {
  const sentence =
    "which give who but so must same be stand even line since first public great any at we she about public want very be good up hold come think place course person late small around present give open more world we";
  const typingRef = useRef<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [typed, setTyped] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const indexRef = useRef<number>(0);
  const wpmRef = useRef<number>(0);
  const wrongLengthRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  console.log(typed);
  

  const handleKeyDown = (e: any) => {
    if (e.key === "Backspace") {
      const currentTypedLength = e.target.value.length;
      if (currentTypedLength > indexRef.current) {
        handleChange("Backspace");
      } else {
        e.preventDefault();
      }
    }
  };


  const handleChange = (e: any) => {
    if(e ==="Backspace"){
      return
    }
    const currentChar = e.target.value[e.target.value.length - 1];
    const expectedChar = sentence[indexRef.current];

    if (e.target.value.length === 1) {
      startTimeRef.current = Date.now();
      const timer = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);

      setTimeout(() => {
        typingRef.current = false;
        clearInterval(timer);
      }, 30000);
    }

    setTyped(e.target.value);


    if (expectedChar === currentChar) {
      setIsCorrect(false);
      wrongLengthRef.current = 0;
      indexRef.current += 1;


      const timeElapsedInMinutes = (Date.now() - startTimeRef.current) / (1000 * 60);
      wpmRef.current = Math.floor((indexRef.current / 5) / timeElapsedInMinutes);
    } else {
      setIsCorrect(true);
      wrongLengthRef.current = e.target.value.length;
    }
  };

  return (
    <>
      <div className="">
        <h1>{time}</h1>
        <p id="sentence" className="font-semibold text-3xl">

            <span className="">{sentence.slice(0, indexRef.current)}</span>
            
            {isCorrect && (
              <span className="text-red-500">
                {sentence.slice(indexRef.current, wrongLengthRef.current)}
              </span>
            )}

            {isCorrect ? (
              <span className="text-slate-500 opacity-60">
                {sentence.slice(wrongLengthRef.current)}
              </span>
            ) : (
              <span className="text-slate-500 opacity-60">
                {sentence.slice(indexRef.current)}
              </span>
            )}
        </p>

        <form>
          {typingRef.current && (
            <input
              type="text"
              id="typed"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className="opacity-0"
              autoComplete={"off"}
            />
          )}
        </form>
        <h1 className="font-bold text-9xl text-orange-500">
          {Math.floor(wpmRef.current)}
        </h1>
        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
          className="border border-black mt-10 mb-10"
        >
          RESTART
        </button>
      </div>
    </>
  );
}

export default App;
