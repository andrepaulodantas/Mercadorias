import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './Form.css'; 
import generatePdf from '../../utils/generatePdf';


interface FormData {
  id?: number;
  name: string;
  quantity: number;
  description?: string;
  price?: number;

}

interface FormProps {
  initialData?: FormData | null | undefined;
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', quantity: 0, description: '', price: 0 });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        quantity: initialData.quantity,
        description: initialData.description ?? '', // Ensure description is always a string
        price: initialData.price ?? 0, // Ensure price is always a number
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Dados enviados com sucesso!');
      } else {
        console.error('Falha ao enviar dados');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleClear = () => {
    setFormData({ name: '', quantity: 0, description: '', price: 0 });
  }

  const handleGeneratePdf = () => {
    generatePdf([formData]);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="name">Nome:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantidade:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrição:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="price">Preço:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </div>
      <button type="submit" className="submit-button">Cadastrar</button>
      <button type="button" onClick={handleClear}>Limpar Tela</button>
      <button type="button" onClick={handleGeneratePdf}>Gerar PDF</button>
    </form>
  ); 
}


export default Form;
