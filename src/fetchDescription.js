const axios = require('axios');
const cheerio = require('cheerio');

async function fetchProductDescription(productUrl) {
  try {
    const { data: html } = await axios.get(productUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
      },
    });

    const $ = cheerio.load(html);
    const description = $('.projector_longdescription_sub').html();

    return description
      ? `<div class="projector_longdescription_sub">${description}</div>`
      : '<div class="projector_longdescription_sub">Opis niedostępny</div>';
  } catch (err) {
    console.error(`❌ Błąd podczas pobierania opisu dla ${productUrl}:`, err.message);
    return '<div class="projector_longdescription_sub">Opis niedostępny</div>';
  }
}

module.exports = fetchProductDescription;