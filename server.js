require('dotenv').config();
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const sanitize = require('express-mongo-sanitize');

const app = express();

// Podstawowe zabezpieczenia
app.use(helmet());
app.disable('x-powered-by');

// Dodatkowe zabezpieczenia XSS przez helmet
app.use(helmet.xssFilter());
app.use(helmet.noSniff());

// CSP
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", 'https:'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    }
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minut
    max: 100 // limit requestów na windowMs
});
app.use('/api/', limiter);

// CORS
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
    methods: ['GET'],
    credentials: true
}));

// Parsowanie body i limitowanie rozmiaru
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Sanityzacja danych
app.use(sanitize());

// Konfiguracja EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Pliki statyczne
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d', // Cache na 1 dzień
    etag: true
}));

// Font Awesome
app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));

// Middleware do przekazywania aktywnej ścieżki
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// Stałe i konfiguracja
const VALID_SECTIONS = ['game', '3d_print', 'vr'];
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.svg']);

// Walidacja sekcji
const validateSection = (section) => {
    const sanitizedSection = section.toLowerCase().trim();
    return VALID_SECTIONS.includes(sanitizedSection) ? sanitizedSection : null;
};

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
    const section = validateSection(req.params.section);
    if (!section) {
        return res.status(404).render('pages/error', {
            title: '404 - Nie znaleziono',
            error: 'Nieprawidłowa sekcja'
        });
    }

    const indexData = {
        'game': {
            title: 'Sekcja Gier',
            description: 'Tworzymy gry i aplikacje',
            content: [
                {
                    title: 'Coś tu będzie',
                    text: `Nie wiem jak tu tworzyć akapity.
Chyba tak`
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
    const section = validateSection(req.params.section);
    if (!section) {
        return res.status(404).render('pages/error', {
            title: '404 - Nie znaleziono',
            error: 'Nieprawidłowa sekcja'
        });
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
                    image: 'project.jpg',
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
                    image: 'project.jpg',
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
                    image: 'project.jpg  ',
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
    const section = validateSection(req.params.section);
    if (!section) {
        return res.status(404).render('pages/error', {
            title: '404 - Nie znaleziono',
            error: 'Nieprawidłowa sekcja'
        });
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
    const section = validateSection(req.params.section);
    if (!section) {
        return res.status(404).render('pages/error', {
            title: '404 - Nie znaleziono',
            error: 'Nieprawidłowa sekcja'
        });
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

// API galerii z zabezpieczeniami
app.get('/api/gallery-images/:section', async (req, res) => {
    try {
        const section = validateSection(req.params.section);
        if (!section) {
            return res.status(404).json({ error: 'Nieznana sekcja' });
        }

        // Sanityzacja ścieżki
        const safeSectionPath = path.normalize(section).replace(/^(\.\.(\/|\\|$))+/, '');
        const galleryPath = path.join(__dirname, 'public', 'img', safeSectionPath, 'gallery');

        try {
            await fs.access(galleryPath);
        } catch {
            return res.json([]);
        }

        const files = await fs.readdir(galleryPath);
        const images = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ALLOWED_EXTENSIONS.has(ext);
            })
            .map(file => ({
                src: `/img/${safeSectionPath}/gallery/${file}`,
                alt: path.basename(file, path.extname(file))
            }));

        if (process.env.NODE_ENV === 'development') {
            console.log(`Znalezione obrazy dla sekcji ${section}:`, images);
        }
        
        res.json(images);
    } catch (error) {
        console.error('Gallery error:', error);
        res.status(500).json({ error: 'Wystąpił błąd podczas ładowania galerii' });
    }
});

// Obsługa 404
app.use((req, res) => {
    res.status(404).render('pages/error', {
        title: '404 - Nie znaleziono',
        error: 'Strona nie została znaleziona'
    });
});

// Obsługa błędów
app.use((err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
    
    res.status(err.status || 500).render('pages/error', {
        title: '500 - Błąd serwera',
        error: process.env.NODE_ENV === 'production' 
            ? 'Wystąpił błąd serwera' 
            : err.message
    });
});

// Konfiguracja serwera
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
    if (NODE_ENV === 'development') {
        console.log(`Server running on port ${PORT}`);
        console.log(`API galerii dostępne pod: http://localhost:${PORT}/api/gallery-images/:section`);
    }
});