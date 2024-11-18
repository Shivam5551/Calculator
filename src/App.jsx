import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('0');

  const row1 = ['CE', '/', '*', "-"];
  const row2 = ['7', '8', '9'];
  const row3 = ['4', '5', '6'];
  const row4 = ['1', '2', '3'];
  const symbols = ['/', '*', '-', '.', '+'];

  useEffect(()=> {
    const handleKeyInput = (e) => {
      if (
          row1.includes(e.key) ||
          row2.includes(e.key) ||
          row3.includes(e.key) ||
          row4.includes(e.key) || 
          symbols.includes(e.key) || 
          e.key === 'Enter' || 
          e.key === 'Delete' || 
          e.key === '0'
      ){
        var key = e.key === 'Delete' ? 'CE' : e.key;
        // console.log(`input is ${input} and key is ${key}`);
        operation(key);
        return;
      }
    }
    document.addEventListener("keydown", handleKeyInput);
    return () => document.removeEventListener("keydown", handleKeyInput);
  }, [input]);

  const operation = (val) => {
    if (val === 'CE') {
      setInput('0');
    } 
    else if (symbols.includes(val)) {
      if(input === '0' && val !== '.') {
        setInput(val);
        return;
      }
      if (symbols.includes(input[input.length - 1]) && val !== '.') {
        setInput((prevInput) => prevInput.slice(0, prevInput.length - 1) + val);
      } else {
        setInput((prevInput) => prevInput + val);
      }
    } 
    else if (val === "Enter") {
      try {
        const answer = eval(input);        
        if(answer === Infinity || answer === -Infinity)
        {
          setInput("Can't Divide by zero!");
        }
        else if (answer === Error) {
          setInput("Error")
        }
        else {
          setInput(String(answer));
        }
      } catch (error) {
        // console.log(error);
        setInput('Error');
      }
    } else {
      if(input === '0' && val !== '.') {
        setInput(val);
      }
      else {
        setInput((prevInput) => prevInput + val);
      }
    }
  }

  const value = (e) => {
    const val = e.target.innerText;
    operation(val);
    
  };

  return (
    <div className='items-center h-screen w-full flex justify-center'>
      <div id='container' className='h-fit w-fit rounded-3xl shadow-2xl shadow-zinc-900 border-double border-orange-500 border-4 bg-slate-800 text-white p-4'>
        <div id='input' className=' text-end overflow-hidden text-lg font-semibold w-50 h-12 rounded-lg border-2 border-slate-200 shadow-xl flex justify-end p-2'>{input}</div>
        <div className='grid grid-cols-4 w-full gap-2 mt-5 mb-2'>
          {row1.map((e, index) => {
            return (<button key={index} onClick={value} className='items-center col-span-1 text-center  bg-blue-600 hover:bg-blue-800 rounded-lg font-semibold text-lg text-white'> {e} </button>)
          })}
        </div>
        <div className='grid grid-cols-4 w-full'>
          <div className='col-span-3 grid-rows-2'>
            <div className='row-span-1 grid grid-cols-3 gap-2'>
            {row2.map((e, index) => {
              return (<button key={index} onClick={value} className='items-center col-span-1 text-center  bg-blue-600 hover:bg-blue-800 rounded-lg font-semibold text-lg text-white'> {e} </button>)
            })}
          </div>
          <div className='row-span-1 grid my-2 grid-cols-3 gap-2'> 
            {row3.map((e, index) => {
                return (<button key={index} onClick={value} className='items-center col-span-1 text-center  bg-blue-600 hover:bg-blue-800 rounded-lg font-semibold text-lg text-white'> {e} </button>)
              })}
          </div>
          </div>
          <div className='col-span-1 row-span-2 grid m-2 mr-0 mt-0'>
            <button onClick={value} className='items-center col-span-1 text-center  bg-blue-600 hover:bg-blue-800 rounded-lg font-semibold text-lg text-white'>+</button>
          </div>
        </div>
        <div className='grid grid-cols-4 w-full'>
          <div className='col-span-3 grid-rows-2'>
            <div className='row-span-1 grid grid-cols-3 gap-2'>
              {row4.map((e, index) => {
                return (<button key={index} onClick={value} className='items-center col-span-1 text-center  bg-blue-600 hover:bg-blue-800 rounded-lg font-semibold text-lg text-white'> {e} </button>)
              })}
          </div>
          <div className='row-span-1 grid my-2 grid-cols-3 gap-2'> 
              <button onClick={value} className='items-center col-span-2 text-center  bg-blue-600 hover:bg-blue-800 rounded-lg font-semibold text-lg text-white'> 0 </button>
              <button onClick={value} className='items-center col-span-1 text-center  bg-blue-600 rounded-lg  hover:bg-blue-800 font-semibold text-lg text-white'> . </button>
          </div>
          </div>
          <div className='col-span-1 row-span-2 grid m-2 mr-0 mt-0'>
            <button onClick={value} className='items-center  overflow-hidden col-span-1 text-center p-1 bg-blue-600 hover:bg-blue-800 rounded-lg font-semibold text-md text-white'>Enter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
