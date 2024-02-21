import axios from 'axios';

const API_URL = 'http://localhost:5000'; // URL do seu backend Flask

export const fetchForms = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar mercadorias', error);
  }
};

export const createForms = async (form) => {
    try {
        const response = await axios.post(`${API_URL}/`, form);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar mercadoria', error);
    }
    };

export const updateForms = async (id, form) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, form);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar mercadoria', error);
    }
    };

export const deleteForms = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar mercadoria', error);
    }
    };

