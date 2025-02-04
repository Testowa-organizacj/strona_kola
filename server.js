const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

// Serwowanie plików statycznych
app.use(express.static(path.join(__dirname)));

// Endpoint do pobierania listy obrazów dla konkretnej sekcji
app.get('/api/gallery-images/:section', async (req, res) => {
    try {
        const { section } = req.params;

        // Mapowanie sekcji na odpowiednie ścieżki
        const sectionPaths = {
            'game': path.join(__dirname, 'game', 'img', 'gallery'),
            '3d_print': path.join(__dirname, '3d_print', 'img', 'gallery'),
            'vr': path.join(__dirname, 'vr', 'img', 'gallery')
        };

        // Sprawdź czy sekcja jest prawidłowa
        if (!sectionPaths[section]) {
            return res.status(404).json({ error: 'Nieznana sekcja' });
        }

        const galleryPath = sectionPaths[section];

        // Sprawdź czy katalog istnieje
        try {
            await fs.access(galleryPath);
        } catch {
            return res.json([]); // Zwróć pustą tablicę jeśli katalog nie istnieje
        }

        const files = await fs.readdir(galleryPath);

        const images = files
            .filter(file => ['.jpg', '.jpeg', '.png', '.svg'].includes(path.extname(file).toLowerCase()))
            .map(file => ({
                src: `/${section}/img/gallery/${file}`,
                alt: path.basename(file, path.extname(file))
            }));

        console.log(`Znalezione obrazy dla sekcji ${section}:`, images);
        res.json(images);
    } catch (error) {
        console.error('Error reading gallery directory:', error);
        res.status(500).json({ error: 'Failed to load images', details: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API galerii dostępne pod: http://localhost:${PORT}/api/gallery-images/:section`);
});