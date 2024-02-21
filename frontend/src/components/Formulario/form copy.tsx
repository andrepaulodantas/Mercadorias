import React, { useState, useEffect } from 'react';

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
  const [formData, setFormData] = useState<FormData>({ name: '', quantity: 0, description: '', price: 0 });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
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

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
      <input type="text" name="description" value={formData.description} onChange={handleChange} />
      <input type="number" name="price" value={formData.price} onChange={handleChange} />
      <button type="submit">Salvar</button>
    </form>
  );
}

export default Form;
