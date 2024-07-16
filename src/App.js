
import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import ColorPicker from './ColorPicker.jsx';
function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current;
    // Set internal resolution to double of what you want for high-DPI screens
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Set display size to half of the viewport
    canvas.style.width = `${window.innerWidth / 2}px`;
    canvas.style.height = `${window.innerHeight / 2}px`;
  
    const context = canvas.getContext('2d');
    context.scale(2, 2); // Adjust scale if you're changing the resolution
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing) {
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div>
      <canvas className='canvas'
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        ref={canvasRef}
      />
      <button onClick={clearCanvas} className='clearButton'>Clear</button>
      <ColorPicker />
    </div>
  );
}

export default App;
