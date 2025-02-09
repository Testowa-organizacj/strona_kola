# Instrukcja obsługi galerii zdjęć - dla początkujących

## 1. Wymagania wstępne
- Musisz mieć Node.js zainstalowany na komputerze
- Musisz mieć dostęp do projektu (folder `kolo`)

## 2. Pierwsze uruchomienie
1. Otwórz terminal (CMD lub PowerShell w Windows)
2. Przejdź do głównego folderu projektu:
```bash
cd ścieżka/do/folderu/kolo
```
3. Zainstaluj potrzebne pakiety:
```bash
npm init -y
npm install express
```

## 3. Uruchamianie serwera
1. Za każdym razem gdy chcesz pracować z galerią:
   - Otwórz terminal
   - Przejdź do folderu projektu (`cd ścieżka/do/folderu/kolo`)
   - Uruchom serwer komendą:
   ```bash
   node server.js
   ```
2. Jeśli wszystko działa, zobaczysz komunikat:
   ```
   Server running on port 3000
   ```
3. Pozostaw to okno terminala otwarte podczas pracy!

## 4. Dodawanie zdjęć
1. Otwórz folder projektu w eksploratorze plików
2. Znajdź odpowiedni folder dla swojej sekcji:
   - Dla sekcji gier: `kolo/game/img/gallery/`
   - Dla druku 3D: `kolo/3d_print/img/gallery/`
   - Dla VR: `kolo/vr/img/gallery/`
3. Po prostu wrzuć tam swoje zdjęcia
4. Odśwież stronę w przeglądarce

## 5. Sprawdzanie czy działa
1. Otwórz przeglądarkę
2. Wejdź na adres odpowiedni dla twojej sekcji:
   - Gry: `http://localhost:3000/game/game_gallery.html`
   - Druk 3D: `http://localhost:3000/3d_print/3d_print_gallery.html`
   - VR: `http://localhost:3000/vr/vr_gallery.html`

## Rozwiązywanie problemów

### Jeśli galeria nie działa:
1. Sprawdź czy serwer działa (terminal powinien pokazywać `Server running on port 3000`)
2. Jeśli nie, uruchom go ponownie (`node server.js`)

### Jeśli zdjęcia się nie wyświetlają:
1. Sprawdź czy są w odpowiednim folderze
2. Sprawdź czy mają prawidłowe rozszerzenie (.jpg, .jpeg, .png lub .svg)
3. Odśwież stronę przytrzymując CTRL+F5

### Jeśli strona w ogóle się nie ładuje:
1. Sprawdź czy adres w przeglądarce jest prawidłowy
2. Sprawdź czy serwer działa
3. Spróbuj zamknąć i otworzyć przeglądarkę

## Ważne uwagi:
- Nie zmieniaj nazw folderów
- Nie usuwaj żadnych plików .js, .html czy .css
- Serwer musi być uruchomiony, żeby galeria działała
- Po dodaniu zdjęć zawsze odśwież stronę

## Struktury folderów dla przypomnienia:
```
kolo/
├── js/
│   └── gallery.js    <-- Nie ruszać tego pliku!
├── game/
│   └── img/
│       └── gallery/  <-- Tu wrzucasz zdjęcia dla sekcji gier
├── 3d_print/
│   └── img/
│       └── gallery/  <-- Tu wrzucasz zdjęcia dla sekcji druku 3D
└── vr/
    └── img/
        └── gallery/  <-- Tu wrzucasz zdjęcia dla sekcji VR
```

W razie problemów, skontaktuj się z administratorem projektu!