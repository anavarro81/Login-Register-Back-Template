const fs = require('fs');
const path = require('path');

// Función para crear carpetas si no existen
const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Carpeta creada: ${folderPath}`);
  }
};

// Función principal para crear la estructura
const createProjectStructure = (baseDir) => {
  // Definir las rutas
  const srcDir = path.join(baseDir, 'src');
  const folders = ['controllers', 'models', 'routes', 'services'];

  // Crear la carpeta src y sus subcarpetas
  createFolderIfNotExists(srcDir);
  folders.forEach(folder => createFolderIfNotExists(path.join(srcDir, folder)));

  // Crear el archivo index.js fuera de la carpeta src
  const indexFilePath = path.join(baseDir, 'index.js');
  if (!fs.existsSync(indexFilePath)) {
    fs.writeFileSync(indexFilePath, '// Punto de entrada de la aplicación\n');
    console.log(`Archivo creado: ${indexFilePath}`);
  }
};

// Directorio base donde quieres crear la estructura
const baseDir = process.argv[2] || __dirname; // Se puede pasar un argumento o usar el directorio actual

createProjectStructure(baseDir);
