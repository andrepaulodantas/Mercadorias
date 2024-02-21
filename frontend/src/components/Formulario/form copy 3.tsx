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
  const [formData, setFormData] = useState<FormData>(
    initialData || {
      name: '',
      quantity: 0,
      description: '',
      price: 0,
    }
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleGeneratePdf = () => {
    generatePdf([formData]);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantidade</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleNumberChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Preço</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleNumberChange}
        />
      </div>
      <button type="submit">Salvar</button>
      <button type="button" onClick={handleGeneratePdf}>
        Gerar PDF
      </button>
    </form>
  );
}

export default Form;


