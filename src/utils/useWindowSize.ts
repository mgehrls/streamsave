import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({
      width: 0,
      height: 0,
    });

    function debounce(func: () => void) {
      setTimeout(func, 500);
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

export function convertWindowSizeToCardsPerRow(size:WindowSize){
    switch (true) {
      case size.width > 960:
        return 5;
      case size.width > 860:
        return 4.5;
      case size.width > 760:
        return 4;
      case size.width > 685:
        return 3.5;
      case size.width > 590:
        return 3;
      case size.width > 510:
        return 2.5;
      case size.width > 400:
        return 2;
      default:
        return 1.5;
    
  
}
}