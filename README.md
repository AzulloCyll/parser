# Grabber

Grabber to aplikacja do scrapowania produktów z wybranej strony internetowej (np. `kontri.pl`). Aplikacja pobiera dane o produktach, takie jak nazwa, obraz, opis, generuje streszczenia opisów oraz zapisuje wyniki w pliku HTML. Dodatkowo wyświetla pasek postępu w terminalu, aby informować o postępie przetwarzania.

---

## **Funkcjonalności**
- Scrapowanie danych o produktach (nazwa, obraz, opis).
- Generowanie streszczeń opisów produktów w formie podpunktów.
- Tworzenie pliku HTML z listą produktów.
- Wyświetlanie paska postępu w terminalu.
- Obsługa błędów podczas pobierania danych.
- Automatyczne tworzenie folderu `outputs` do zapisu wyników.

---

## **Wymagania**
- Node.js (wersja 14 lub nowsza)
- NPM (Node Package Manager)
- Zainstalowana aplikacja **Ollama** do obsługi modeli językowych (np. `llama2`, `mistral`).

---

## **Instalacja**

1. **Sklonuj repozytorium**:
   ```bash
   git clone https://github.com/your-repo/grabber.git
   cd grabber
   ```

2. **Zainstaluj zależności**:
   ```bash
   npm install
   ```

3. **Zainstaluj dodatkowe zależności**:
   - `cli-progress`: Do obsługi paska postępu.
   ```bash
   npm install cli-progress
   ```

4. **Zainstaluj Ollama i pobierz model językowy**:
   - Pobierz Ollama z [https://ollama.com](https://ollama.com) i zainstaluj go.
   - Pobierz model, np. `llama2`:
     ```bash
     ollama pull llama2
     ```

---

## **Uruchamianie aplikacji**

1. **Uruchom scraper**:
   ```bash
   npm start
   ```

2. **Wynik**:
   - Wygenerowany plik HTML znajdziesz w folderze `outputs/produkty.html`.
   - Pasek postępu będzie widoczny w terminalu podczas działania aplikacji.

---

## **Struktura projektu**
```
grabber/
├── outputs/                    # Folder na wygenerowane pliki
│   └── produkty.html           # Wygenerowany plik HTML z produktami
├── src/                        # Główne źródła aplikacji
│   ├── scraper.js              # Główny plik uruchamiający scraper
│   ├── fetchDescription.js     # Funkcja do pobierania opisów produktów
│   ├── generateHTML.js         # Funkcja do generowania pliku HTML
│   ├── generateSummary.js      # Funkcja do generowania streszczeń
│   ├── utils/                  # Narzędzia pomocnicze
│   │   ├── createOutputDir.js  # Funkcja do tworzenia folderu outputs
│   │   └── progressBar.js      # Funkcja do obsługi paska postępu
├── styles/                     # Pliki CSS
│   └── styles.css              # Stylizacja wygenerowanego HTML
├── package.json                # Plik konfiguracji projektu Node.js
└── README.md                   # Dokumentacja projektu
```

---

## **Pliki i moduły**

### **1. `scraper.js`**
Główny plik aplikacji, który:
- Pobiera dane o produktach z wybranej strony.
- Wywołuje funkcje do pobierania opisów, generowania streszczeń i tworzenia pliku HTML.
- Wyświetla pasek postępu w terminalu.

### **2. `fetchDescription.js`**
Funkcja do pobierania opisów produktów z ich stron szczegółowych.

### **3. `generateHTML.js`**
Funkcja do generowania pliku HTML z listą produktów.

### **4. `generateSummary.js`**
Funkcja do generowania streszczeń opisów produktów w formie podpunktów.

### **5. `utils/createOutputDir.js`**
Funkcja do tworzenia folderu `outputs`, jeśli nie istnieje.

### **6. `utils/progressBar.js**
Funkcja do obsługi paska postępu w terminalu.

---

## **Stylizacja**
Plik `styles/styles.css` zawiera stylizację dla wygenerowanego pliku HTML. Możesz dostosować style według własnych potrzeb.

Przykład stylizacji:
```css
body {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
}

.product {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
}
```

---

## **Przykład wygenerowanego HTML**
Przykład struktury wygenerowanego pliku `produkty.html`:
```html
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Produkty z Kontri.pl</title>
  <link rel="stylesheet" href="../styles/styles.css">
</head>
<body>
  <h1>Produkty z Kontri.pl</h1>
  <div class="product">
    <div class="product-link">
      <a href="https://example.com/product1" target="_blank">
        <img src="https://example.com/image1.jpg" alt="Produkt 1">
        <h3>Produkt 1</h3>
      </a>
    </div>
    <div class="product-description">
      <div class="original-description">
        Pełny opis produktu.
      </div>
    </div>
    <div class="product-summary">
      <p><strong>Streszczenie:</strong></p>
      <p>- Wykonany z wysokiej jakości materiałów,<br>
         - Zapewnia doskonałe podtrzymanie biustu,<br>
         - Idealny dla kobiet ceniących komfort i elegancję.</p>
    </div>
  </div>
</body>
</html>
```

---

## **Obsługa błędów**
- Jeśli wystąpi błąd podczas pobierania danych, zostanie on zalogowany w terminalu:
  ```bash
  ❌ Błąd podczas pobierania: <opis błędu>
  ```

---

## **Dalszy rozwój**
- Dodanie obsługi większej liczby stron (paginacja).
- Fine-tuning modelu językowego do generowania streszczeń w języku polskim.
- Dodanie możliwości zapisu wyników w innych formatach (np. JSON, CSV).
- Rozszerzenie obsługi o inne strony internetowe.

---

## **Autor**
- **Imię i nazwisko**: [Twoje imię]
- **Kontakt**: [Twój e-mail]