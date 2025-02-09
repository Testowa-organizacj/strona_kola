const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Konfiguracja EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Pliki statyczne
app.use(express.static(path.join(__dirname, 'public')));

// Middleware do przekazywania aktywnej ścieżki
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// Strony główne
app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Strona główna'
    });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', {
        title: 'Kontakt'
    });
});

app.get('/realization', (req, res) => {
    res.render('pages/realization', {
        title: 'Wykonanie i użyte technologie'
    });
});

// Sekcje
app.get('/:section/index', (req, res) => {
    const validSections = ['game', '3d_print', 'vr'];
    const section = req.params.section;

    if (!validSections.includes(section)) {
        return res.status(404).send('Not found');
    }

    const indexData = {
        'game': {
            title: 'Sekcja Gier',
            description: 'Tworzymy gry i aplikacje',
            content: [
                {
                    title: 'Aktualności',
                    text: 'Najnowsze informacje...'
                }
            ]
        },
        '3d_print': {
            title: 'Sekcja Druku 3D',
            description: 'Tworzymy modele 3D',
            content: [
                {
                    title: 'Aktualności',
                    text: 'Najnowsze informacje z sekcji druku 3D...'
                }
            ]
        },
        'vr': {
            title: 'Sekcja VR',
            description: 'Tworzymy aplikacje VR',
            content: [
                {
                    title: 'Aktualności',
                    text: 'Najnowsze informacje z sekcji VR...'
                }
            ]
        }
    };

    const data = indexData[section];
    res.render('sections/_templates/index', {
        title: data.title,
        description: data.description,
        content: data.content,
        section: section
    });
});

app.get('/:section/team', (req, res) => {
    const validSections = ['game', '3d_print', 'vr'];
    const section = req.params.section;

    if (!validSections.includes(section)) {
        return res.status(404).send('Not found');
    }

    const teamData = {
        'game': {
            title: 'Sekcji Gier',
            description: 'Poznaj nasz zespół',
            team: [
                {
                    name: 'Ewa Kubera',
                    role: 'Przewodnicząca sekcji Gier',
                    description: 'Pasjonatka gier...',
                    image: 'piter.svg',
                    github: '#',
                    linkedin: '#'
                }
            ]
        },
        '3d_print': {
            title: 'Sekcji Druku 3D',
            description: 'Poznaj nasz zespół',
            team: [
                {
                    name: 'Mateusz Chimkowski',
                    role: 'Prezes dupy',
                    description: 'Pasjonat Loli...',
                    image: 'piter.svg',
                    github: '#',
                    linkedin: '#'
                }
            ]
        },
        'vr': {
            title: 'Sekcji VR',
            description: 'Poznaj nasz zespół',
            team: [
                {
                    name: 'Wojciech Pokoniczeny',
                    role: 'Przewodniczący Komitetu Konfederacji',
                    description: 'Pasjonatka piękna Krzysia Bosaka...',
                    image: 'piter.svg',
                    github: '#',
                    linkedin: '#'
                }
            ]
        }
    };

    const data = teamData[section];
    res.render('sections/_templates/team', {
        title: data.title,
        description: data.description,
        team: data.team,
        section: section
    });
});

app.get('/:section/gallery', (req, res) => {
    const validSections = ['game', '3d_print', 'vr'];
    const section = req.params.section;

    if (!validSections.includes(section)) {
        return res.status(404).send('Not found');
    }

    const galleryData = {
        'game': {
            title: 'Sekcji Gier',
            description: 'Screeny i zdjęcia z naszych projektów'
        },
        '3d_print': {
            title: 'Sekcji Druku 3D',
            description: 'Galeria naszych wydruków'
        },
        'vr': {
            title: 'Sekcji VR',
            description: 'Zdjęcia z projektów VR'
        }
    };

    const data = galleryData[section];
    res.render('sections/_templates/gallery', {
        title: data.title,
        description: data.description,
        section: section
    });
});

app.get('/:section/projects', (req, res) => {
    const validSections = ['game', '3d_print', 'vr'];
    const section = req.params.section;

    if (!validSections.includes(section)) {
        return res.status(404).send('Not found');
    }

    const sectionData = {
        'game': {
            title: 'Sekcji Gier',
            description: 'Nasze najnowsze gry i projekty',
            projects: [
                {
                    title: 'Gra Edukacyjna',
                    description: 'Innowacyjny projekt wykorzystujący technologię gier do nauki.',
                    image: 'project.jpg',
                    features: ['Unity Engine', 'Multiplayer', 'Cross-platform'],
                    link: '#'
                }
            ]
        },
        '3d_print': {
            title: 'Sekcji Druku 3D',
            description: 'Nasze wydruki i modele 3D',
            projects: [
                {
                    title: 'Model Anatomiczny',
                    description: 'Szczegółowy model do celów edukacyjnych.',
                    image: 'project.jpg',
                    features: ['PLA', 'Skala 1:1', 'Ruchome elementy'],
                    link: '#'
                }
            ]
        },
        'vr': {
            title: 'Sekcji VR',
            description: 'Nasze projekty Virtual Reality',
            projects: [
                {
                    title: 'VR Medyczne',
                    description: 'Symulator procedur medycznych w VR.',
                    image: 'project.jpg',
                    features: ['Oculus Quest 2', 'Haptic Feedback', 'Multiplayer'],
                    link: '#'
                }
            ]
        }
    };

    const data = sectionData[section];
    res.render('sections/_templates/projects', {
        title: data.title,
        description: data.description,
        projects: data.projects,
        section: section
    });
});

// API galerii
app.get('/api/gallery-images/:section', async (req, res) => {
    try {
        const {section} = req.params;
        const sectionPaths = {
            'game': path.join(__dirname, 'public', 'img', 'game', 'gallery'),
            '3d_print': path.join(__dirname, 'public', 'img', '3d_print', 'gallery'),
            'vr': path.join(__dirname, 'public', 'img', 'vr', 'gallery')
        };

        if (!sectionPaths[section]) {
            return res.status(404).json({error: 'Nieznana sekcja'});
        }

        const galleryPath = sectionPaths[section];

        try {
            await fs.access(galleryPath);
        } catch {
            return res.json([]);
        }

        const files = await fs.readdir(galleryPath);

        const images = files
            .filter(file => ['.jpg', '.jpeg', '.png', '.svg'].includes(path.extname(file).toLowerCase()))
            .map(file => ({
                src: `/img/${section}/gallery/${file}`,
                alt: path.basename(file, path.extname(file))
            }));

        console.log(`Znalezione obrazy dla sekcji ${section}:`, images);
        res.json(images);
    } catch (error) {
        console.error('Error reading gallery directory:', error);
        res.status(500).json({error: 'Failed to load images', details: error.message});
    }
});

// Obsługa 404
app.use((req, res, next) => {
    res.status(404).render('pages/error', {
        title: '404 - Nie znaleziono',
        error: 'Strona nie została znaleziona'
    });
});

// Obsługa błędów
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/error', {
        title: '500 - Błąd serwera',
        error: 'Wystąpił błąd serwera'
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API galerii dostępne pod: http://localhost:${PORT}/api/gallery-images/:section`);
});