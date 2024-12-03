const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/profile_images');
    fs.promises.mkdir(uploadPath, { recursive: true }).then(() => cb(null, uploadPath)).catch(err => cb(err));
  },
  filename: (req, file, cb) => {
    const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
    cb(null, `${uuidv4()}-${sanitizedFileName}`);
  }
});

// Filtro para validar archivos
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimeType = allowedTypes.test(file.mimetype);
  mimeType ? cb(null, true) : cb(new Error('Solo se permiten imágenes en formato JPEG, PNG o GIF'));
};

// Exportar configuración de multer
module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar tamaño de archivo a 5MB
});
