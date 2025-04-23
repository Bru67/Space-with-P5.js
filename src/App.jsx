import React, { useRef, useEffect } from 'react';
import p5 from 'p5/lib/p5';
import { sketch } from './sketch'; 

function App() {
  const p5ContainerRef = useRef(); 

  useEffect(() => {
    new p5(sketch, p5ContainerRef.current);
    
    return () => {
      if (p5ContainerRef.current) {
        p5ContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={p5ContainerRef} />;
}

export default App;