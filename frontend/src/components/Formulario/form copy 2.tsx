import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './Form.css';
import generatePdf from '../../utils/generatePdf';
import { FormProps } from 'react-router-dom';

// Definição de tipos para os dados
interface Mercadoria {
  nome: string;
  numeroRegistro: string;
  fabricante: string;
  tipo: string;
  descricao: string;
}

interface EntradaSaida {
  quantidade: number;
  dataHora: string;
  local: string;
  mercadoriaId: number;
}

// Componente Form
const Form: React.FC<FormProps> = ({ onSubmit }) => {
  // Definição de estados para os dados
  const [mercadoria, setMercadoria] = useState<Mercadoria>({
    nome: '',
    numeroRegistro: '',
    fabricante: '',
    tipo: '',
    descricao: '',
  });
  const [entrada, setEntrada] = useState<EntradaSaida>({
    quantidade: 0,
    dataHora: '',
    local: '',
    mercadoriaId: 0,
  });
  const [saida, setSaida] = useState<EntradaSaida>({
    quantidade: 0,
    dataHora: '',
    local: '',
    mercadoriaId: 0,
  });
  const [mercadorias, setMercadorias] = useState<Mercadoria[]>([]);
  const [chartData, setChartData] = useState({
  labels: [], // Esta será a sua escala de eixo x, por exemplo, os meses.
  datasets: [
    {
      label: 'Entradas', // Nome da primeira linha do gráfico
      data: [], // Os dados da primeira linha
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Saídas', // Nome da segunda linha do gráfico
      data: [], // Os dados da segunda linha
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }
  ]
});

  // Função para buscar as mercadorias
  const fetchMercadorias = async () => {
    const response = await fetch('http://localhost:5000/mercadorias');
    const data = await response.json();
    setMercadorias(data);
  };

  // Função para buscar as entradas e saídas
  const fetchEntradaSaida = async () => {
    const response = await fetch('http://localhost:5000/entradas-saidas');
    const data = await response.json();
    const entradas = data.filter((item: EntradaSaida) => item.quantidade > 0);
    const saidas = data.filter((item: EntradaSaida) => item.quantidade < 0);
    const entradasData = entradas.map((item: EntradaSaida) => item.quantidade);
    const entradasLabels = entradas.map((item: EntradaSaida) => item.dataHora);
    const saidasData = saidas.map((item: EntradaSaida) => item.quantidade);
    const saidasLabels = saidas.map((item: EntradaSaida) => item.dataHora);
    setChartData({
      labels: entradasLabels,
      datasets: [
        {
          label: 'Entradas',
          data: entradasData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Saídas',
          data: saidasData,
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    });
  };

  // Função para buscar as mercadorias e as entradas e saídas
  useEffect(() => {
    fetchMercadorias();
    fetchEntradaSaida();
  }, []);

  // Função para gerar o PDF
  const handleGeneratePdf = () => {
    generatePdf(mercadorias);
  };

  // Função para enviar os dados de entrada
  const handleEntradaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/entradas-saidas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tipo de conteúdo
      },
      body: JSON.stringify(entrada), // Corpo da requisição
    });
    if (response.ok) {
      console.log('Entrada registrada com sucesso!');
      fetchMercadorias();
      fetchEntradaSaida();
    } else {
      console.error('Erro ao registrar entrada:', response);
    }
  }

  // Função para enviar os dados de saída
  const handleSaidaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/entradas-saidas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tipo de conteúdo
      },
      body: JSON.stringify(saida), // Corpo da requisição
    });
    if (response.ok) {
      console.log('Saída registrada com sucesso!');
      fetchMercadorias();
      fetchEntradaSaida();
    } else {
      console.error('Erro ao registrar saída:', response);
    }
  }

  // Função para enviar os dados da mercadoria
  const handleMercadoriaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/mercadorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tipo de conteúdo
      },
      body: JSON.stringify(mercadoria), // Corpo da requisição
    });
    if (response.ok) {
      console.log('Mercadoria registrada com sucesso!');
      fetchMercadorias();
    } else {
      console.error('Erro ao registrar mercadoria:', response);
    }
  }

  // Função para excluir uma mercadoria
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/mercadorias/${id}`, {
      method: 'DELETE',
    });
    fetchMercadorias();
  };

  // Função para atualizar uma mercadoria
  const handleUpdate = async (id: number) => {
    await fetch(`http://localhost:5000/mercadorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Tipo de conteúdo
      },
      body: JSON.stringify(mercadoria), // Corpo da requisição
    });
    fetchMercadorias();
  };

  // Função para preencher os campos de entrada
  const handleEntradaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntrada({
      ...entrada,
      [e.target.name]: e.target.value,
    });
  };

  // Função para preencher os campos de saída
  const handleSaidaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaida({
      ...saida,
      [e.target.name]: e.target.value,
    });
  };

  // Função para preencher os campos da mercadoria
  const handleMercadoriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMercadoria({
      ...mercadoria,
      [e.target.name]: e.target.value,
    });
  };

  // Retorno do componente
  return (
    <div className="form">
      <div className="form-header">
        <h1>Registro de Mercadorias</h1>
        <button onClick={handleGeneratePdf}>Gerar PDF</button>
      </div>
      <div className="form-content">
        <div className="form-mercadoria">
          <h2>Mercadoria</h2>
          <form onSubmit={handleMercadoriaSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={mercadoria.nome}
              onChange={handleMercadoriaChange}
            />
            <input
              type="text"
              name="numeroRegistro"
              placeholder="Número de Registro"
              value={mercadoria.numeroRegistro}
              onChange={handleMercadoriaChange}
            />
            <input
              type="text"
              name="fabricante"
              placeholder="Fabricante"
              value={mercadoria.fabricante}
              onChange={handleMercadoriaChange}
            />
            <input
              type="text"
              name="tipo"
              placeholder="Tipo"
              value={mercadoria.tipo}
              onChange={handleMercadoriaChange}
            />
            <input
              type="text"
              name="descricao"
              placeholder="Descrição"
              value={mercadoria.descricao}
              onChange={handleMercadoriaChange}
            />
            <button type="submit">Registrar</button>
          </form>
          <ul>
            {mercadorias.map((item, index) => (
              <li key={index}>
                <span>{item.nome}</span>
                <span>{item.numeroRegistro}</span>
                <span>{item.fabricante}</span>
                <span>{item.tipo}</span>
                <span>{item.descricao}</span>
                <button onClick={() => handleDelete(index)}>Excluir</button>
                <button onClick={() => handleUpdate(index)}>Atualizar</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="form-entrada">
          <h2>Entrada</h2>
          <form onSubmit={handleEntradaSubmit}>
            <input
              type="number"
              name="quantidade"
              placeholder="Quantidade"
              value={entrada.quantidade}
              onChange={handleEntradaChange}
            />
            <input
              type="text"
              name="dataHora"
              placeholder="Data e Hora"
              value={entrada.dataHora}
              onChange={handleEntradaChange}
            />
            <input
              type="text"
              name="local"
              placeholder="Local"
              value={entrada.local}
              onChange={handleEntradaChange}
            />
            <input
              type="number"
              name="mercadoriaId"
              placeholder="ID da Mercadoria"
              value={entrada.mercadoriaId}
              onChange={handleEntradaChange}
            />
            <button type="submit">Registrar</button>
          </form>
        </div>
        <div className="form-saida">
          <h2>Saída</h2>
          <form onSubmit={handleSaidaSubmit}>
            <input
              type="number"
              name="quantidade"
              placeholder="Quantidade"
              value={saida.quantidade}
              onChange={handleSaidaChange}
            />
            <input
              type="text"
              name="dataHora"
              placeholder="Data e Hora"
              value={saida.dataHora}
              onChange={handleSaidaChange}
            />
            <input
              type="text"
              name="local"
              placeholder="Local"
              value={saida.local}
              onChange={handleSaidaChange}
            />
            <input
              type="number"
              name="mercadoriaId"
              placeholder="ID da Mercadoria"
              value={saida.mercadoriaId}
              onChange={handleSaidaChange}
            />
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
      <div className="form-chart">
        <h2>Entradas e Saídas</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default Form;
