const fs = require('fs');
const path = require('path');

// Create necessary directories
const dirs = [
    'app/images',
    'app/images/courses',
    'app/images/instructors',
    'app/images/products'
];

dirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
});

// Create placeholder files for required images
const placeholderImages = [
    'app/images/logo.png',
    'app/images/courses/game-setup.jpg',
    'app/images/courses/membership.jpg',
    'app/images/courses/basics.jpg',
    'app/images/instructors/rally-racoon.jpg',
    'app/images/products/racket1.jpg',
    'app/images/products/bag1.jpg'
];

placeholderImages.forEach(imgPath => {
    const fullPath = path.join(__dirname, imgPath);
    if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, '');
    }
});

console.log('Post-install setup completed successfully');