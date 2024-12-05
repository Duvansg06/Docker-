# Usa la imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /API DOCKER

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que se ejecutará la API
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]
