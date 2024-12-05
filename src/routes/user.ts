// Importamos Express, bcryptjs y jsonwebtoken
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

// Simulamos una base de datos en memoria
const users: { username: string, password: string }[] = [];

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Verificamos si el usuario ya existe
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).send({ message: 'Usuario ya registrado!' });
    }

    // Hasheamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardamos el nuevo usuario en la base de datos
    const user = { username, password: hashedPassword };
    users.push(user);

    res.status(201).send({ message: 'Usuario registrado exitosamente!' });
});

// Ruta para loggear un usuario
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Buscamos el usuario en la base de datos
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).send({ message: 'Usuario no encontrado!' });
    }

    // Verificamos la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send({ message: 'Contraseña incorrecta!' });
    }

    // Generamos un token JWT
    const token = jwt.sign({ username: user.username }, 'secretKey', { expiresIn: '1h' });

    res.status(200).send({ message: 'Login exitoso!', token });
});

export default router;
