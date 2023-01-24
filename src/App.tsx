import { useState } from "react"
import { Button } from "react-bootstrap"
import Values from "values.js";


function App() {
  const [colorName, setColorName] = useState('')
  const [list, setList] = useState([])
  const [error, setError] = useState(false)

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      const colors: any = new Values(`${colorName}`).all(10);
      setList(colors)
    } catch (error) {
      setError(true)
    }
  }
  console.log({list})
  return (
    <>
    <h1>Color Pallete</h1>
    <br/>
    <form>
      <input
        style={{
          borderColor: `${error ? "red" : ""}`
        }}
        type="color"
        name="color"
        placeholder="#ff21cd"
        onChange={(e: any) => setColorName(e.target.value)}
      />
      <Button variant={"success"} onClick={handleSubmit}>Generate</Button>
    </form>

    {list.map((item: any, index: number) => {
      const {rgb, weight, type} = item;
      const hexColor = `#${item.hex}`
      return <div 
      key={index}
      style={{
        height: "200px",
        width: "200px",
        backgroundColor: `${hexColor}`
      }}
      onClick={() => navigator.clipboard.writeText(`${hexColor}`)}
      >
       <p
       style={{
         color: `${ index > 10 ? "white" : ""}`
       }}
       >{`${hexColor}`}</p> 
       <p
        style={{
          color: `${ index > 10 ? "white" : ""}`
        }}
       >{`${weight}%`}</p>
    </div>
    })}
    </>
  )
}

export default App
