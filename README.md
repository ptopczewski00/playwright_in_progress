# playwright_in_progress

## Jak włączyć testy?

***Testy oraz formularz należy odpalać z folderu `vue-project` (główny folder projektu)***.

Uruchomienie testów:
- `pnpm startTest <nazwa pliku>` (samo chromium, mozna dawac --ui, --headed itd)
- `pnpm startTestImportant` - dla tagów important
- `pnpm startTestAllThree` - to samo co pierwsze, wszystkie przegladarki (chromium, firefox, webkit)

Uruchomienie formularza:
`pnpm run dev`

### Sprawdzenie środowiska

Przed pierwszym uruchomieniem sprawdź, czy wszystko jest gotowe:


- `node -v`
- `pnpm -v`
- `npx playwright --version`
- `npx playwright install --dry-run`


Jeśli czegoś brakuje (np. `node_modules` albo przeglądarek Playwright), zainstaluj:


- `pnpm install`
- `npx playwright install`


Jeśli brakuje Node.js, pobierz go z: **https://nodejs.org**

### Struktura

Wszystko związane z testami znajduje się w folderze *playwright/*, reszta w
folderze *vue-project/ to rzeczy związane z formularzem*.

## 06.08.26
### Dodanie tagów i komendy na uruchomienie samych tagów, zrobienie porządku (dodanie plikow zwiazanych z testami playwright do folderu *playwright/*
narazie są w pliku *test6.spec.ts*
w folderze *playwright/tests* znajduje sie plik *tagList.txt*, w ktorym 
bede zapisywal i opisywal tagi, na ten moment zostawiam go, tylko tag `@important`
jest narazie przypisany do komendy wyzej

## 05.08.26
### dodanie nowych plikow testowych z wczoraj oraz dzisiaj:
- test3 - nowe testy skupione glownie na dodaniu opisow dla czytelnosci kodu
- test4 - testy dla wczesniejszego problemu z przyciskiem 'wyloguj sie'
- test5 - dodanie kontekstow, symulacji 'dwoch roznych kart'
- test6 - rozlozenie testu na wiecej plikow, dodajac fixtures, objects i dane do innego pliku
- test7 - wygenerowany przez claude jako ciekawostka do analizy w inny dzien


## 03.08.26
### Dodanie pierwszego formularza z prostymi i podstawowymi testami, w najbliższych dniach pojawi się ich więcej 
