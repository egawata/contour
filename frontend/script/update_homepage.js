const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '..', 'package.json');
const homepage = process.argv[2];

if (!homepage) {
    console.error("Usage: node update_homepage.js <homepage-url>");
    process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(filepath, 'utf8'));
packageJson.homepage = homepage;

fs.writeFileSync(filepath, JSON.stringify(packageJson, null, 2));
console.log(`Updated homepage to ${homepage}`);
