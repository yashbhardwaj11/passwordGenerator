import { useCallback, useEffect, useRef, useState } from "react"

const App = () => {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("")

  const copyPasswordToClipBoard = useCallback(
    () => {
      passwordRef.current?.select();
      // passwordRef.current?.setSelectionRange(0,3) help to select the text in range
      window.navigator.clipboard.writeText(Password);
    },
    [Password],
  )
  

  //use to cache the items that are called again and again
  //use callback is used for optimisation and the elements send in array are those which need to be cache
  const passwordGenerator = useCallback(
    () => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(numberAllowed) str += "0123456789"
      if(charAllowed) str += "!@#$%^&*+=+[]{}~"
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char);
      }
      console.log(pass)
      setPassword(pass);
    },
    [length,charAllowed,numberAllowed,setPassword],
  )

  //in this the elements in array means change on any of these 
  //element in array will call the useEffect function
  useEffect(() => {
    passwordGenerator()
  }, [length,charAllowed,numberAllowed,passwordGenerator])
  
  //useRef hook
  const passwordRef = useRef(null);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center ">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 my-3">
        <input
        value={Password}
        placeholder="Password"
        type="text"
        className="outline-none w-full py-1 px-3"
        readOnly
        ref={passwordRef}
         />
         <button
         onClick={copyPasswordToClipBoard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          Copy
         </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
          min={6}
          max={100}
          type="range"
          value={length}
          className="cursor-pointer"
          onChange={(obj) => setLength(obj.target.value)}
          />
          <label>Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
          type="checkbox"/>
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          defaultChecked={charAllowed}
          id="charAllowed"
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
          type="checkbox"/>
          <label htmlFor="charAllowed">Charecters</label>
        </div>
      </div>
    </div>
  )
}

export default App
