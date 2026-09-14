import fs from 'fs';
import path from 'path';

const clientDir = path.join(process.cwd(), 'dist/client');
const distDir = path.join(process.cwd(), 'dist');

if (fs.existsSync(clientDir)) {
  console.log('Copying static assets from dist/client to dist...');
  
  function copyRecursive(src, dest) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach(child => {
        copyRecursive(path.join(src, child), path.join(dest, child));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  fs.readdirSync(clientDir).forEach(file => {
    copyRecursive(path.join(clientDir, file), path.join(distDir, file));
  });
  console.log('Done copying static assets!');
}
