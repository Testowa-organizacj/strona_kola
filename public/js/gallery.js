class Gallery {
    constructor() {
        this.section = this.detectSection();
        this.images = [];
        this.currentIndex = 0;
        
        // Poczekaj na załadowanie DOM przed inicjalizacją elementów
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        if (this.initializeElements()) {
            this.setupEventListeners();
            this.init();
        }
    }

    initializeElements() {
        this.galleryGrid = document.getElementById('gallery-grid');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.thumbnailsWrapper = document.getElementById('thumbnails-wrapper');
        this.currentImageSpan = document.getElementById('current-image');
        this.totalImagesSpan = document.getElementById('total-images');

        // Sprawdź czy wszystkie wymagane elementy istnieją
        if (!this.galleryGrid || !this.lightbox || !this.lightboxImg) {
            console.error('Nie znaleziono wymaganych elementów galerii');
            return false;
        }

        // Initially hide the lightbox
        if (this.lightbox) {
            this.lightbox.style.display = 'none';
        }

        return true;
    }

    detectSection() {
        const path = window.location.pathname;
        if (path.includes('/game/')) return 'game';
        if (path.includes('/3d_print/')) return '3d_print';
        if (path.includes('/vr/')) return 'vr';
        return null;
    }

    setupEventListeners() {
        if (!this.lightbox) return;

        // Close button
        const closeBtn = this.lightbox.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }

        // Navigation buttons
        const prevBtn = this.lightbox.querySelector('.prev-btn');
        const nextBtn = this.lightbox.querySelector('.next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateImages('prev'));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateImages('next'));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.style.display === 'none') return;

            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.navigateImages('prev');
            if (e.key === 'ArrowRight') this.navigateImages('next');
        });

        // Prevent scrolling when lightbox is open
        this.lightbox.addEventListener('wheel', (e) => {
            if (this.lightbox.style.display !== 'none') {
                e.preventDefault();
            }
        });
    }

    async init() {
        if (!this.section) {
            console.error('Nie można wykryć sekcji');
            this.showErrorMessage('Nieprawidłowa sekcja');
            return;
        }

        try {
            console.log('Pobieranie obrazów dla sekcji:', this.section);
            const response = await fetch(`/api/gallery-images/${this.section}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.images = await response.json();
            console.log('Pobrane obrazy:', this.images);

            if (this.images && this.images.length > 0) {
                this.renderGallery();
                if (this.totalImagesSpan) {
                    this.totalImagesSpan.textContent = this.images.length;
                }
            } else {
                this.showNoImagesMessage();
            }
        } catch (error) {
            console.error('Error initializing gallery:', error);
            this.showErrorMessage(error.message);
        }
    }

    renderGallery() {
        if (!this.galleryGrid) return;
        
        this.galleryGrid.innerHTML = '';

        this.images.forEach((image, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6 mb-4';

            const imgContainer = document.createElement('div');
            imgContainer.className = 'gallery-img-container';

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.className = 'gallery-img';
            
            imgContainer.addEventListener('click', () => this.openLightbox(index));

            imgContainer.appendChild(img);
            col.appendChild(imgContainer);
            this.galleryGrid.appendChild(col);
        });
    }

    openLightbox(index) {
        if (!this.lightbox || !this.lightboxImg) return;
        
        this.currentIndex = index;
        this.updateLightboxImage();
        this.lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Dodaj klasę do animacji
        this.lightbox.classList.add('active');
    }

    closeLightbox() {
        if (!this.lightbox) return;
        
        this.lightbox.classList.remove('active');
        this.lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Przywróć scrollowanie
    }

    navigateImages(direction) {
        if (!this.images.length) return;
        
        if (direction === 'prev') {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        if (!this.lightboxImg || !this.currentImageSpan) return;
        
        const image = this.images[this.currentIndex];
        if (image) {
            this.lightboxImg.src = image.src;
            this.lightboxImg.alt = image.alt;
            this.currentImageSpan.textContent = this.currentIndex + 1;
        }
    }

    showNoImagesMessage() {
        if (!this.galleryGrid) return;
        
        this.galleryGrid.innerHTML = `
            <div class="col-12 text-center">
                <p>Brak zdjęć w galerii.</p>
            </div>`;
    }

    showErrorMessage(message = 'Wystąpił błąd podczas ładowania galerii') {
        if (!this.galleryGrid) return;
        
        this.galleryGrid.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">${message}. Proszę odświeżyć stronę.</p>
            </div>`;
    }
}

// Inicjalizacja galerii
const gallery = new Gallery();