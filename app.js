const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('curso', { curso: '' });
});

app.post('/modulos', (req, res) => {
  const cursoSeleccionado = req.body.curso;
  res.render('modulos', { curso: cursoSeleccionado, modulos: [] });
});

app.post('/pago', (req, res) => {
  const modulosSeleccionados = req.body.modulos || [];
  const cursoSeleccionado = req.body.curso;
  res.render('pago', {
    curso: cursoSeleccionado,
    modulos: modulosSeleccionados,
    formaPago: '',
  });
});

app.post('/detalle', (req, res) => {
  const formaPago = req.body.formaPago;
  const cursoSeleccionado = req.body.curso;
  const modulosSeleccionados = req.body.modulos;
  const listaModulosSeleccionados = modulosSeleccionados.split(',');
  let totalPagar = 0;
  let contador = 0;

  for (let i = 0; i < listaModulosSeleccionados.length; i++) {
    contador++;
  }

  if (cursoSeleccionado === 'Java') {
    totalPagar = contador * 1200;
  } else if (cursoSeleccionado === 'PHP') {
    totalPagar = contador * 800;
  } else if (cursoSeleccionado === '.NET') {
    totalPagar = contador * 1500;
  }

  if (formaPago === 'Efectivo') {
    totalPagar *= 0.9;
  }

  res.render('detalle', {
    curso: cursoSeleccionado,
    modulos: modulosSeleccionados,
    formaPago,
    totalPagar,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
