// Script para gerar ícones do app em diferentes tamanhos
// Este script pode ser executado para gerar os ícones necessários do PWA

const fs = require('fs');
const path = require('path');

// SVG otimizado da logo FitPerformance
const logoSVG = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#3B82F6"/>
  <circle cx="256" cy="256" r="200" fill="#1E40AF"/>
  <path d="M180 200h152v24h-152zm0 48h152v24h-152zm0 48h152v24h-152z" fill="white"/>
  <circle cx="256" cy="180" r="40" fill="white"/>
  <rect x="216" y="320" width="80" height="60" rx="8" fill="white"/>
</svg>`;

// Função para salvar o SVG
function generateSVGIcon() {
  const publicPath = path.join(__dirname, '../../public');
  fs.writeFileSync(path.join(publicPath, 'icon.svg'), logoSVG);
  console.log('✅ Ícone SVG gerado com sucesso!');
}

// Para gerar ícones PNG, você precisaria usar uma biblioteca como sharp
// npm install sharp
// const sharp = require('sharp');

// async function generatePNGIcons() {
//   const sizes = [16, 32, 192, 512];
//   
//   for (const size of sizes) {
//     await sharp(Buffer.from(logoSVG))
//       .resize(size, size)
//       .png()
//       .toFile(`public/logo${size}.png`);
//   }
//   console.log('✅ Ícones PNG gerados com sucesso!');
// }

module.exports = { generateSVGIcon }; 