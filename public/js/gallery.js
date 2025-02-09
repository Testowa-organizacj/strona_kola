class Gallery {
    constructor() {
        // Initialize DOM elements
        this.galleryGrid = document.getElementById('gallery-grid');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.thumbnailsWrapper = document.getElementById('thumbnails-wrapper');
        this.currentImageSpan = document.getElementById('current-image');
        this.totalImagesSpan = document.getElementById('total-images');

        this.images = [];
        this.currentIndex = 0;
        this.section = this.detectSection();

        // Initially hide the lightbox
        if (this.lightbox) {
            this.lightbox.style.display = 'none';
        }

        this.setupEventListeners();
    }

    detectSection() {
        const path = window.location.pathname;
        if (path.includes('/game/')) return 'game';
        if (path.includes('/3d_print/')) return '3d_print';
        if (path.includes('/vr/')) return 'vr';
        return 'unknown';
    }

    setupEventListeners() {
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
    }

    async init() {
        try {
            const response = await fetch(`/api/gallery-images/${this.section}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.images = await response.json();

            if (this.images.length > 0) {
                this.renderGallery();
                this.totalImagesSpan.textContent = this.images.length;
            } else {
                this.showNoImagesMessage();
            }
        } catch (error) {
            console.error('Error initializing gallery:', error);
            this.showErrorMessage();
        }
    }

    renderGallery() {
        this.galleryGrid.innerHTML = '';

        this.images.forEach((image, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6';

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.className = 'img-fluid gallery-img';
            img.addEventListener('click', () => this.openLightbox(index));

            col.appendChild(img);
            this.galleryGrid.appendChild(col);
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightboxImage();
        this.lightbox.style.display = 'flex';
    }

    closeLightbox() {
        this.lightbox.style.display = 'none';
    }

    navigateImages(direction) {
        if (direction === 'prev') {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        const image = this.images[this.currentIndex];
        this.lightboxImg.src = image.src;
        this.lightboxImg.alt = image.alt;
        this.currentImageSpan.textContent = this.currentIndex + 1;
    }

    showNoImagesMessage() {
        this.galleryGrid.innerHTML = `
            <div class="col-12 text-center">
                <p>Brak zdjęć w galerii.</p>
            </div>`;
    }

    showErrorMessage() {
        this.galleryGrid.innerHTML = `
            <div class="col-12 text-center">
                <p>Wystąpił błąd podczas ładowania galerii. Proszę odświeżyć stronę.</p>
            </div>`;
    }
}

// Initialize gallery after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new Gallery();
    gallery.init();
});