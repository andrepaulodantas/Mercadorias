import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate(); // Crie a instância de useNavigate

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Campo obrigatório'),
      password: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:5000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Login bem-sucedido:', data);
          navigate('/formlist'); // Redirecione para a rota desejada
        } else {
          console.error('Erro no login:', data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    },
  });
  
  return (
    <div className="login">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Senha"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Entrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
