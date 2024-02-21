import React from 'react';
import Cabecalho from '../Cabecalho/cabecalho';
import './TelaInicial.css'; 


const TelaInicial: React.FC = () => {
  return (
    <div className="tela-inicial">
      <Cabecalho />
      <div className="carrossel">
        <img src={`${process.env.PUBLIC_URL}/assets/Tecnologia.jpg`} alt="Empresa 1" />
        <img src={`${process.env.PUBLIC_URL}/assets/tecnologia.jpg`} alt="Empresa 1" />
        <img src={`${process.env.PUBLIC_URL}/assets/Tecnologia.jpg`} alt="Empresa 1" />
        <img src={`${process.env.PUBLIC_URL}/assets/tecnologia.jpg`} alt="Empresa 1" />
      </div>
      <footer className="rodape">
        <p>&copy; 2024 Nome da Empresa. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default TelaInicial;
