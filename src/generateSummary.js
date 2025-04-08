const { execSync } = require('child_process');

/**
 * Function to generate a summary of a product description in Polish.
 * @param {string} fullDescription - Full product description.
 * @returns {string} - Generated summary.
 */
async function generateShortDescription(fullDescription) {
  try {
    if (!fullDescription || fullDescription.trim() === '') {
      return 'Brak opisu produktu do podsumowania.';
    }

    const prompt = `Podsumuj poniższy opis produktu w języku polskim w dwóch zwięzłych zdaniach. Skup się na najważniejszych cechach produktu:\n\n${fullDescription}`;
    const command = `ollama run llama2 "${prompt.replace(/"/g, '\\"')}"`;
    const response = execSync(command, { encoding: 'utf-8' });

    return response.trim();
  } catch (err) {
    console.error('❌ Błąd podczas generowania streszczenia za pomocą Llama2:', err.message);
    return 'Nie udało się wygenerować streszczenia.';
  }
}

module.exports = generateShortDescription;