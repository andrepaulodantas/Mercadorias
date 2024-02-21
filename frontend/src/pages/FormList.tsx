import React, { useEffect, useState } from 'react';
import { fetchForms, deleteForms } from '../services/apiService';
import generatePdf from '../utils/generatePdf';
import './FormList.css';

interface FormsData {
  id: number;
  name: string;
  quantity: number;
  description: string;
  price: number;
}

// Remove the unused variable assignment for 'FormList'
const FormList: React.FC = () => {
  const [forms, setForms] = useState<FormsData[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchForms().then((data) => setForms(data));
  }, []);

  const handleDelete = async (id: number) => {
    await deleteForms(id);
    setForms(forms.filter((form) => form.id !== id));
  };

  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleGeneratePdf = () => {
    console.log(filteredForms);
    generatePdf(filteredForms);
  };

  return (
    <div className="form-list">
      <div className="form-list-header">
        <input
          type="text"
          placeholder="Pesquisar"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={handleGeneratePdf}>Gerar PDF</button>
      </div>
      <ul>
        {filteredForms.map((form) => (
          <li key={form.id}>
            <span>{form.name}</span>
            <span>{form.quantity}</span>
            <span>{form.description}</span>
            <span>{form.price}</span>
            <button onClick={() => handleDelete(form.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
