import { useState } from 'react'
import './App.css'

function App() {
  const name = "Lorenzo";
  const code = "JavaScript";
  const [nome, definirNome] = useState("")

  return (
    <>
      <h2 id=''>Hello World!!! Em {code}!!!</h2>
      <h1 id=''>Bem-vindo, {name}</h1>
      <div className="hero">
        <input
          className="input"
          onChange={(evento) => definirNome(evento.target.value)}
        />
      </div>
      <p id='center'>Olá, {nome}</p>

      <h4 className='footer'>Feito por: {name}</h4>
    </>
  );
}

export default App
