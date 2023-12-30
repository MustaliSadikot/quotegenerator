import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar';

function App() {
  const [progress, setProgress] = useState(0)

  const [quote,updatequote] = useState({text:"",author:""})
  const getquotes =async()=>{
    setProgress(30)
    const data = await fetch("https://type.fit/api/quotes");
    setProgress(60)
    const paraseData = await data.json();
    console.log(paraseData);
    let random = Math.floor((Math.random()) * paraseData.length);
    setProgress(90)
    console.log(random);
    updatequote(paraseData[random])
    setProgress(100)
  }
  useEffect(()=>{getquotes()},[])

  const copy =()=>{
    navigator.clipboard.writeText(quote.text)
  }
    
  return (
    <>
    <LoadingBar
        color='#FFFF00'
        progress={progress}
        height={5}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className="container-md bg-light mt-5 rounded-4 mx-auto border border-5 shadow shadow-lg" style={{maxWidth:"600px",width:"96vw"}}>
        <div >
        <h1 className="text-center pt-3">Quote of the day</h1>
        <h3 className="text-center my-4">{quote.text}
        </h3>
        <h4 className="text-end mt-3 me-2">-{quote.author}</h4>
        <hr></hr>
        <div className="d-flex justify-content-between mx-3">
          <button
            type="button"
            className="rounded-circle btn btn-primary mb-3" onClick={copy}><i class="bi bi-clipboard text-light fs-4"></i></button>
            <button
            type="button" className="rounded-pill btn btn-primary mb-3 fs-5 px-3 py-2" onClick={getquotes}>
            New Quote</button>
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
