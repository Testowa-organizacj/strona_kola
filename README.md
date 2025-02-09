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
npm install express express-ejs-layouts ejs
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
   API galerii dostępne pod: http://localhost:3000/api/gallery-images/:section
   ```
3. Pozostaw to okno terminala otwarte podczas pracy!

## 4. Dodawanie zdjęć
1. Otwórz folder projektu w eksploratorze plików
2. Znajdź odpowiedni folder dla swojej sekcji:
   - Dla sekcji gier: `kolo/public/img/game/gallery`
   - Dla druku 3D: `kolo/public/img/3d_print/gallery`
   - Dla VR: `kolo/public/img/vr/gallery`
3. Po prostu wrzuć tam swoje zdjęcia
4. Odśwież stronę w przeglądarce

## 5. Sprawdzanie czy działa
1. Otwórz przeglądarkę
2. Wejdź na adres odpowiedni dla twojej sekcji:
   - Gry: `http://localhost:3000/game/gallery`
   - Druk 3D: `http://localhost:3000/3d_print/gallery`
   - VR: `http://localhost:3000/vr/gallery`

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
- Nie usuwaj żadnych plików .js, .html, .ejs czy .css
- Serwer musi być uruchomiony żeby cała strona działała
- Po dodaniu zdjęć zawsze odśwież stronę

## Struktury folderów dla przypomnienia:
```
kolo/
│   package-lock.json
│   package.json
│   README.md <-- to czytasz właśnie
│   server.js <-- właściwy serwer
│   server.js.bak <-- backup serwera
│
├───.idea/ <-- tu nie warto patrzeć
│
│
├───public/
│   ├───css/
│   │       bootstrap.min.css <-- lokalny plik stylu bootstrap
│   │       style.css <-- własny styl CSS
│   │
│   ├───img/
│   │   ├───3d_print
│   │   │   ├───gallery/ <-- tu wrzucasz zdjęcia do galeri
│   │   │   │
│   │   │   ├───project/ <-- tu wrzucasz screeny prezentujące projekty
│   │   │   │
│   │   │   └───team/ <-- tu wrzucasz zdj lub avatary człąków teamu
│   │   │
│   │   ├───common/ <-- tu są ikony i loga
│   │   │
│   │   ├───game/
│   │   │   ├───gallery/ <-- tu wrzucasz zdjęcia do galeri
│   │   │   │
│   │   │   ├───project/ <-- tu wrzucasz screeny prezentujące projekty
│   │   │   │
│   │   │   └───team/ <-- tu wrzucasz zdj lub avatary człąków teamu
│   │   │
│   │   └───vr/
│   │       ├───gallery/ <-- tu wrzucasz zdjęcia do galeri
│   │       │
│   │       ├───project/ <-- tu wrzucasz screeny prezentujące projekty
│   │       │
│   │       └───team/ <-- tu wrzucasz zdj lub avatary człąków teamu
│   │
│   └───js/
│           bootstrap.bundle.js <-- lokalny skrypt bootstrap do mobilnego rozwijanego menu
│           gallery.js <-- skrypt galeri
│           map.js <-- skrypt api mapy
│
└───views/
    ├───layouts/
    │       main.ejs <-- layout strony który jest odpowiednio uzupełniany o inne elementy
    │
    ├───pages/
    │       contact.ejs <-- wygląd konaktu
    │       error.ejs <-- wygląd błedu w razie gdyby taki powstał
    │       index.ejs <-- wygląd strony tytułowej
    │       realization.ejs <-- wygląd realizacji i użytych technologii
    │
    ├───partials/
    │       footer.ejs <-- wygląd stopki
    │       head.ejs <-- wygląd header
    │       navbar.ejs <-- wygląd paska nawigacji
    │
    └───sections/
        └───_templates/
                gallery.ejs <-- templatka galerii
                index.ejs <-- templatka strony o sekcji
                projects.ejs <-- templatka projektów
                team.ejs <-- templatka zespołu

```

W razie problemów, skontaktuj się z administratorem projektu!