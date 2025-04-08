const { execSync } = require('child_process');

/**
 * Funkcja do generowania streszczenia opisu produktu.
 * @param {string} fullDescription - Pełny opis produktu.
 * @returns {string} - Wygenerowane streszczenie.
 */
async function generateShortDescription(fullDescription) {
  try {
    // Sprawdzenie, czy opis produktu jest dostępny
    if (!fullDescription || fullDescription.trim() === '') {
      return 'Brak opisu produktu do podsumowania.';
    }

    // Zaktualizowany prompt
    const prompt = `Podsumuj poniższy opis produktu w języku polskim w jednym lub dwóch zdaniach:\n\n${fullDescription}`;
    const command = `ollama run deepseek-r1 "${prompt.replace(/"/g, '\\"')}"`;
    const response = execSync(command, { encoding: 'utf-8' });

    return response.trim();
  } catch (err) {
    console.error('❌ Błąd podczas generowania streszczenia za pomocą Ollama:', err.message);
    return 'Nie udało się wygenerować streszczenia.';
  }
}

module.exports = generateShortDescription;