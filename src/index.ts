import app from './app';

// Configuramos el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log('Servidor está corriendo en el puerto ${PORT}');
});