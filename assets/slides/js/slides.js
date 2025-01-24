window.addEventListener('load', function() {
    // Track the active deck and control timeout globally
    let activeDeck = null;
    let controlsTimeout = null;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Define showControls at the top level
    function showControls() {
        if (!activeDeck) return;
        activeDeck.classList.add('show-controls');
        if (controlsTimeout) clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            activeDeck.classList.remove('show-controls');
        }, 3000);
    }

    document.querySelectorAll('.slides-deck').forEach(deck => {
        const slides = Array.from(deck.querySelectorAll('.slide'));
        const prevButton = deck.querySelector('.prev-slide');
        const nextButton = deck.querySelector('.next-slide');
        const progress = deck.querySelector('.slide-progress');
        const fullscreenBtn = deck.querySelector('.fullscreen-toggle');
        const overviewBtn = deck.querySelector('.overview-toggle');
        const overviewCloseBtn = deck.querySelector('.overview-close');
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.style.display = 'none');
            slides[index].style.display = 'block';
            progress.textContent = `${index + 1} / ${slides.length}`;
            prevButton.disabled = index === 0;
            nextButton.disabled = index === slides.length - 1;
        }

        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                showSlide(currentIndex);
            }
        }

        function nextSlide() {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                showSlide(currentIndex);
            }
        }

        function toggleFullscreen() {
            deck.classList.toggle('fullscreen');
            activeDeck = deck;  // Set active deck
            if (deck.classList.contains('fullscreen')) {
                fullscreenBtn.textContent = '⛶';
                fullscreenBtn.title = 'Exit fullscreen';
                showControls();  // Now this will work
            } else {
                fullscreenBtn.textContent = '⛶';
                fullscreenBtn.title = 'Enter fullscreen';
            }
            window.dispatchEvent(new Event('resize'));
        }

        function toggleOverview() {
            deck.classList.toggle('overview-active');
            if (deck.classList.contains('overview-active')) {
                overviewBtn.textContent = '×';
                overviewBtn.title = 'Close overview (O)';
            } else {
                overviewBtn.textContent = '⊞';
                overviewBtn.title = 'Show overview (O)';
            }
        }

        // Event listeners
        deck.addEventListener('mouseenter', () => {
            activeDeck = deck;
        });

        deck.addEventListener('click', () => {
            activeDeck = deck;
            if (deck.classList.contains('fullscreen')) {
                showControls();  // Now this will work
            }
        });

        // Button click handlers
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        overviewBtn.addEventListener('click', toggleOverview);

        // Add click handlers for overview slides
        deck.querySelectorAll('.overview-slide').forEach(slide => {
            slide.addEventListener('click', () => {
                const index = parseInt(slide.dataset.index);
                showSlide(index);
                toggleOverview();
            });
        });

        // Add click handler for overview close button
        overviewCloseBtn.addEventListener('click', toggleOverview);

        // Keyboard navigation - moved to global handler
        showSlide(0);

        if (isMobile) {
            const mobileClose = deck.querySelector('.mobile-close');
            const mobilePrev = deck.querySelector('.mobile-prev');
            const mobileNext = deck.querySelector('.mobile-next');
            const mobileOverview = deck.querySelector('.mobile-overview');

            // Mobile controls
            mobilePrev?.addEventListener('click', (e) => {
                prevSlide();
                showControls();
                e.stopPropagation();
            });

            mobileNext?.addEventListener('click', (e) => {
                nextSlide();
                showControls();
                e.stopPropagation();
            });

            mobileOverview?.addEventListener('click', (e) => {
                toggleOverview();
                showControls();
                e.stopPropagation();
            });

            // Separate mobile close handler - directly exit fullscreen
            mobileClose?.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile close clicked');  // Add debug
                deck.classList.remove('fullscreen');
                fullscreenBtn.textContent = '⛶';
                fullscreenBtn.title = 'Enter fullscreen';
                window.dispatchEvent(new Event('resize'));
            }, true);  // Use capture phase
        }
    });

    // Prevent clicks on slides from stopping keyboard events
    document.querySelectorAll('.slide').forEach(slide => {
        slide.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeDeck?.classList.contains('fullscreen')) {
                showControls();
            }
        });
    });

    // Global keyboard handler
    document.addEventListener('keydown', function(e) {
        if (!activeDeck) return;

        // Only handle keyboard if active deck is visible or in fullscreen
        const rect = activeDeck.getBoundingClientRect();
        const isVisible = (
            activeDeck.classList.contains('fullscreen') || 
            (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth)
        );
        
        if (!isVisible) return;

        const controls = {
            prevSlide: activeDeck.querySelector('.prev-slide'),
            nextSlide: activeDeck.querySelector('.next-slide')
        };

        switch (e.key) {
            case 'ArrowLeft':
            case 'PageUp':
                if (!controls.prevSlide.disabled) {
                    controls.prevSlide.click();
                    showControls();  // Now this will work
                    e.preventDefault();
                }
                break;
            case 'ArrowRight':
            case 'PageDown':
            case ' ': // Space
                if (!controls.nextSlide.disabled) {
                    controls.nextSlide.click();
                    showControls();  // Now this will work
                    e.preventDefault();
                }
                break;
            case 'Escape':
                if (activeDeck.classList.contains('overview-active')) {
                    activeDeck.querySelector('.overview-toggle').click();
                    e.preventDefault();
                } else if (activeDeck.classList.contains('fullscreen')) {
                    if (isMobile) {
                        const mobileClose = activeDeck.querySelector('.mobile-close');
                        if (mobileClose) {
                            mobileClose.click();
                        }
                    } else {
                        activeDeck.querySelector('.fullscreen-toggle').click();
                    }
                    e.preventDefault();
                }
                break;
            case 'o':
            case 'O':
                activeDeck.querySelector('.overview-toggle').click();
                e.preventDefault();
                break;
        }
    });
}); 