const { execSync } = require('child_process');

function generateImage(prompt, outputPath) {
  try {
    const command = `python scripts/txt2img.py --prompt "${prompt}" --plms --ckpt models/Stable-diffusion/model.ckpt --outdir ${outputPath}`;
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Obraz został wygenerowany i zapisany w: ${outputPath}`);
  } catch (err) {
    console.error('❌ Błąd podczas generowania obrazu:', err.message);
  }
}

module.exports = generateImage;