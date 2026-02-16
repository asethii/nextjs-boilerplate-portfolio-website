'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

const TubesCursorContent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);
  const listenersRef = useRef<{ mousemove?: (e: MouseEvent) => void; click?: () => void }>({});

  useEffect(() => {
    if (!canvasRef.current) return;

    const loadTubesCursor = async () => {
      try {
        // Dynamically import to ensure it only runs on client
        const TubesModule = await import('threejs-components/build/cursors/tubes1.min.js');
        const TubesCursor = TubesModule.default;
        
        if (!canvasRef.current) return;
        
        appRef.current = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ['#f967fb', '#53bc28', '#6958d5'],
            lights: {
              intensity: 200,
              colors: ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5']
            }
          },
          clearColor: 0x000000,
          alpha: true
        });

        // Add a small delay to ensure library is fully initialized
        await new Promise(resolve => setTimeout(resolve, 100));

        // Track mouse movement for the cursor animation
        const handleMouseMove = (event: MouseEvent) => {
          if (appRef.current && appRef.current.position) {
            appRef.current.position.x = event.clientX;
            appRef.current.position.y = event.clientY;
          }
        };

        const handleColorChange = () => {
          if (appRef.current?.tubes?.setColors) {
            const colors = randomColors(3);
            const lightsColors = randomColors(4);
            appRef.current.tubes.setColors(colors);
            appRef.current.tubes.setLightsColors(lightsColors);
          }
        };

        // Store listeners for cleanup
        listenersRef.current.mousemove = handleMouseMove;
        listenersRef.current.click = handleColorChange;

        document.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('click', handleColorChange);

      } catch (error) {
        console.error('Failed to load TubesCursor:', error);
      }
    };

    loadTubesCursor();

    return () => {
      // Clean up listeners
      if (listenersRef.current.mousemove) {
        document.removeEventListener('mousemove', listenersRef.current.mousemove);
      }
      if (listenersRef.current.click) {
        document.body.removeEventListener('click', listenersRef.current.click);
      }
    };
  }, []);

  const randomColors = (count: number) => {
    return new Array(count)
      .fill(0)
      .map(() => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  };

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'transparent', mixBlendMode: 'screen' }} />;
};

export default dynamic(() => Promise.resolve(TubesCursorContent), {
  ssr: false,
  loading: () => null
});
