// Dentro de FormCRUD.tsx

import React, { useState, useEffect } from 'react';
import Form from '../components/Formulario/form';
import { fetchForms, deleteForms, updateForms, createForms } from '../services/apiService';
import './FormCRUD.css';

interface FormsItem {
    id: number;
    name: string;
    quantity: number;
    description: string;
    price: number;
    created_at: string;
    updated_at: string;    
}

interface FormData {
  id?: number;  // Inclua 'id' se necessário
  name: string;
  quantity: number;
  description?: string;
  price?: number;
}

const FormCRUD = () => {
    const [formsList, setFormsList] = useState<FormsItem[]>([]);
    const [editingForms, setEditingForms] = useState<FormData | null>(null);

    useEffect(() => {
        const loadForms = async () => {
            const data = await fetchForms();
            setFormsList(data);
        }; 
        loadForms();
    }, []);

        const handleEdit = async (formsData: FormData) => {
                setEditingForms(formsData);
        }

        const handleDelete = async (formsId: number) => {
                await deleteForms(formsId);
                const data = await fetchForms();
                setFormsList(data);
        }

        const handleSubmit = async (data: FormData) => {
                if (editingForms) {
                        await updateForms(editingForms.id, data);
                } else {
                        await createForms(data);
                }
                const forms = await fetchForms();
                setFormsList(forms);
                setEditingForms(null);
        }

    //Criar uma tabela para exibir os dados do formulário e botões para editar e excluir
    //Essa tabela deve ser renderizada com os dados de 'formsList'
    //Cada linha da tabela deve ter um botão para editar e um botão para excluir o item
    //Ao clicar no botão de editar, o formulário deve ser preenchido com os dados do item selecionado
    //Ao clicar no botão de excluir, o item deve ser excluído do banco de dados
    //O formulário deve ser renderizado com os dados de 'editingForms' e o callback 'handleSubmit'
    //A tabela deve deve aparecer acima do formulário na tela e o formulário deve aparecer abaixo da tabela

    return (
        <div className="form-crud-container">
            <table className="form-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {formsList.map((form) => (
                        <tr key={form.id}>
                            <td>{form.name}</td>
                            <td>{form.quantity}</td>
                            <td>{form.description}</td>
                            <td>{form.price}</td>                        
                            <td><button className="edit-button" onClick={() => handleEdit(form)}>Editar</button></td>
                            <td><button className="delete-button" onClick={() => handleDelete(form.id)}>Excluir</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Form initialData={editingForms} onSubmit={handleSubmit} />
        </div>
    );
}

export default FormCRUD; 


