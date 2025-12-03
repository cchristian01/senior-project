import {React, useRef, useEffect, useState} from 'react'
import Footer from '../Components/Footer'
import SubjectCard from '../Components/SubjectCard'
import {Link, useParams} from 'react-router-dom'

const GamePage = () => {
    const game1 = "MathRun";
    const iframeRef = useRef(null)
    const {subjName} = useParams();

 

   const sendToUnity = (data) => {
    iframeRef.current?.contentWindow.postMessage(
      { type: "UNITY_INIT", payload: data },
      "*"
    );
  };
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Called when iframe loads Unity
    const handleLoad = () => {
      sendToUnity({subject: subjName});
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);

  }, [subjName]);

  return (
    <>
     <div className='bg-yellow-400'>
            <h1 className='font-bold text-4xl my-8'>Games</h1>
        </div>

        <hr />
    
      <iframe
        ref={iframeRef}
        src="/unity/index.html"
        width="100%"
        height="600"
        style={{ border: "none", marginTop: "20px" }}
      />
    <Footer />
    </>
  )
}

export default GamePage