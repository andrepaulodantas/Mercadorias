import React from "react";
import './Cabecalho.css'; // Importar o CSS

class Cabecalho extends React.Component {
  render() {
    return (
      <nav className="cabecalho">
        <ul className="menu">
          <li><a href="/">Início</a></li>
          <li><a href="/quem-somos">Quem Somos</a></li>
          <li><a href="/contato">Contato</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
    );
  }
}

export default Cabecalho;
