import { useState, useEffect } from 'react';

interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({
      width: undefined,
      height: undefined,
    });

    function debounce(func: () => void) {
      setTimeout(func, 1000);
      };

  
    useEffect(() => {
      // only runs on client not server
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener to ensure resize triggers state update
      window.addEventListener("resize", () => debounce(handleResize));
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", () => debounce(handleResize));
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }