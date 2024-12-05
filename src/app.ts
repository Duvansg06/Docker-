// Importamos Express y el archivo de rutas de usuarios
import express from 'express';
import userRoutes from './routes/user';

const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Usamos las rutas de usuarios
app.use('/api/users', userRoutes);

const startServer = (PORT: any) => { 
    app.listen(PORT, () => { 
        console.log(`Servidor está corriendo en el puerto: ${PORT}`);
     }).on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Puerto ${PORT} en uso, intentando con el siguiente...`);
        startServer(PORT + 1); } 
        else { console.error(err);
        } 
    }); 
};

// Configuramos el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
startServer(PORT);

// // Iniciamos el servidor
// app.listen(PORT, () => {
//     console.log(`Servidor está corriendo en el puerto ${PORT}`);
// });

export default app;