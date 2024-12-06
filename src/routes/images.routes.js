const express = require('express');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const multer = require('../../config/multerConfig'); // Importar configuración de multer
const { v4: uuidv4 } = require('uuid'); // Para generar nombres únicos

const router = express.Router();

// Ruta para recibir la imagen, convertirla a WebP y guardarla
router.post('/upload', multer.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se recibió ningún archivo' });
    }

    const filePath = req.file.path;
    const outputFilePath = path.join(
      path.dirname(filePath),
      `${uuidv4()}.webp`
    );

    // Convertir la imagen a formato WebP usando sharp
    await sharp(filePath)
      .webp()
      .toFile(outputFilePath);

    // Eliminar el archivo original después de convertirlo
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: 'Imagen subida y convertida con éxito',
      file: outputFilePath.replace(/\\/g, '/'), // Normalizar rutas para todos los sistemas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la imagen', error: error.message });
  }
});

module.exports = router;
