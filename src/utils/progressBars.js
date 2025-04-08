const cliProgress = require('cli-progress');

/**
 * Tworzy pasek postępu i zwraca jego instancję.
 * @param {string} title - Tytuł paska postępu.
 * @param {number} total - Całkowita liczba kroków.
 * @returns {object} - Instancja paska postępu.
 */
function createProgressBar(title, total) {
  const progressBar = new cliProgress.SingleBar(
    { format: `${title} | {bar} | {value}/{total}` },
    cliProgress.Presets.shades_classic
  );
  progressBar.start(total, 0); // Inicjalizujemy pasek postępu
  return progressBar;
}

module.exports = createProgressBar;