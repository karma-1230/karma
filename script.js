document.addEventListener('DOMContentLoaded', () => {
    const backgroundAnimation = document.getElementById('background-animation');
    const hiddenNav = document.getElementById('hidden-nav');
    const sections = document.querySelectorAll('section');
    const maze = document.getElementById('maze');
    const mazeResult = document.getElementById('maze-result');
    const truthEye = document.getElementById('truth-eye');
    const eyeMessage = document.getElementById('eye-message');
    const exitMessage = document.getElementById('exit-message');
    const backgroundSound = document.getElementById('background-sound');
    const title = document.getElementById('title');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const menuContent = document.getElementById('menu-content');


    // Background animation: Ink drops
    function createInkDrop() {
        const drop = document.createElement('div');
        drop.classList.add('ink-drop');
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.top = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 3 + 2}s`;
        backgroundAnimation.appendChild(drop);
        setTimeout(() => {
            drop.remove();
        }, 5000);
    }

    setInterval(createInkDrop, 1000);

    // Hidden navigation visibility based on mouse position
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        hiddenNav.style.opacity = x > 0.8 ? '1' : '0';
    });

    // Scroll animations for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Mind Labyrinth (Maze choices)
    maze.addEventListener('click', (e) => {
        if (e.target.classList.contains('maze-option')) {
            const choice = e.target.dataset.choice;
            let result;
            switch (choice) {
                case '1':
                    result = "Your instincts reveal more than you know.";
                    break;
                case '2':
                    result = "Doubt is the path to understanding.";
                    break;
                case '3':
                    result = "The unknown shapes who you are.";
                    break;
            }
            mazeResult.textContent = result;
            mazeResult.style.opacity = '1';
            mazeResult.style.display = 'block';  // Ensure it's set to block before fading in
        }
    });

    // The Eye of Truth animation
    truthEye.addEventListener('click', () => {
        truthEye.style.transform = 'scale(1.2)';
        document.body.style.opacity = '0.5';  // Set opacity on body to simulate fading effect
        setTimeout(() => {
            document.body.style.opacity = '1';  // Restore opacity
            truthEye.style.transform = 'scale(1)';
            eyeMessage.textContent = "You are hiding something from yourself.";
            eyeMessage.style.display = 'block';  // Ensure it's set to block before fading in
            setTimeout(() => {
                eyeMessage.style.opacity = '1';  // Fade in the message
            }, 10);
        }, 1000);
    });

    // Exit message on intent to leave the page
    document.addEventListener('mouseout', (e) => {
        if (e.clientY <= 0) {
            exitMessage.classList.remove('hidden');
            exitMessage.style.zIndex=1000;
            exitMessage.style.opacity = '1';
            setTimeout(() => {
                exitMessage.style.opacity = '0';
                setTimeout(() => {
                    exitMessage.classList.add('hidden');
                    exitMessage.style.zIndex=1;
                }, 500);
            }, 2000);
        }
    });

    // Background sound plays once when the page is clicked
    document.body.addEventListener('click', () => {
        backgroundSound.play().catch(error => console.log('Audio playback failed:', error));
    }, { once: true });

    // Glitch effect on title
    title.addEventListener('mouseover', () => {
        title.classList.add('glitch');
    });

    title.addEventListener('mouseout', () => {
        title.classList.remove('glitch');
    });

    // Cryptic messages at intervals
    const crypticMessages = [
        "Your choices define you.",
        "The truth lies beneath the surface.",
        "Every action has a consequence.",
        "What you seek is seeking you.",
        "The observer affects the observed."
    ];

    function displayCrypticMessage() {
        const messageElement = document.createElement('div');
        messageElement.classList.add('cryptic-flash');
        messageElement.textContent = crypticMessages[Math.floor(Math.random() * crypticMessages.length)];
        document.body.appendChild(messageElement);
        setTimeout(() => {
            messageElement.remove();
        }, 2000);
    }

     // Mobile menu toggle
     menuIcon.addEventListener('click', () => {
        menuContent.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuContent.classList.contains('hidden')) {
            menuContent.classList.add('hidden');
        }
    });

    // Adjust ink drop creation for mobile
    function createInkDrop() {
        const drop = document.createElement('div');
        drop.classList.add('ink-drop');
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.top = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
        backgroundAnimation.appendChild(drop);
        setTimeout(() => {
            drop.remove();
        }, 3000);
    }

    // Adjust interval for mobile
    const isMobile = window.innerWidth <= 768;
    setInterval(createInkDrop, isMobile ? 2000 : 1000);

    // Mobile-specific interactions
    if (isMobile) {
        // Replace hover effects with touch events
        title.addEventListener('touchstart', () => {
            title.classList.add('glitch');
        });

        title.addEventListener('touchend', () => {
            title.classList.remove('glitch');
        });

        // Adjust the Eye of Truth interaction
        truthEye.addEventListener('touchstart', () => {
            truthEye.style.transform = 'scale(1.2)';
            document.body.style.opacity = '0.5';
            setTimeout(() => {
                document.body.style.opacity = '1';
                truthEye.style.transform = 'scale(1)';
                eyeMessage.textContent = "The truth is within your grasp.";
                eyeMessage.style.display = 'block';
                setTimeout(() => {
                    eyeMessage.style.opacity = '1';
                }, 10);
            }, 1000);
        });
    }

    setInterval(displayCrypticMessage, 10000);
});
