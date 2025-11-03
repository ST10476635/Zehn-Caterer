// lightbox.js - Simple Lightbox Implementation
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let images = [];

    // Get all lightbox trigger images
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    
    // Initialize images array
    lightboxTriggers.forEach((trigger, index) => {
        images.push({
            src: trigger.src,
            alt: trigger.alt,
            caption: trigger.getAttribute('data-caption') || trigger.alt
        });
        
        // Add click event to each image
        trigger.addEventListener('click', function() {
            openLightbox(index);
        });
        
        // Add keyboard accessibility
        trigger.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
        
        // Add tabindex for accessibility
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('aria-label', `View larger: ${trigger.alt}`);
    });

    // Open lightbox function
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightbox();
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Set focus for accessibility
        lightboxClose.focus();
    }

    // Close lightbox function
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Update lightbox content
    function updateLightbox() {
        const currentImage = images[currentImageIndex];
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
        lightboxCaption.textContent = currentImage.caption;
        
        // Update ARIA labels for navigation
        lightboxPrev.setAttribute('aria-label', 'Previous image');
        lightboxNext.setAttribute('aria-label', 'Next image');
    }

    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    }

    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    }

    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });

    // Close lightbox when clicking on backdrop
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage(); // Swipe left
            } else {
                prevImage(); // Swipe right
            }
        }
    }
});