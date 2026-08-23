# Tournament Grid

Тёмный сайт-генератор турнирных сеток. Без сервера и базы данных: все турниры хранятся в браузере пользователя (`localStorage`), страница кэшируется Service Worker'ом и работает офлайн.

## Возможности

- Любой пользователь создаёт свой турнир: название, дата, формат, список участников.
- Single и Double Elimination, Bo1 / Bo3 / Bo5.
- Upper / Lower Bracket и Grand Final строятся автоматически, недобор до степени двойки закрывается автопроходами (BYE).
- Счёт вводится в карточке матча: победитель идёт выше, проигравший — в нижнюю сетку.
- Вкладки: Overview, Participants, Final Stage, Matches, Standings, Log.
- Экспорт / импорт всех турниров в JSON — для бэкапа или передачи сетки другому человеку.

## Файлы

| Файл | Назначение |
| --- | --- |
| `index.html` | весь сайт: верстка, тёмная тема, логика сетки |
| `sw.js` | Service Worker: офлайн-кэш |
| `manifest.webmanifest` | PWA-манифест (установка на главный экран) |

## Публикация

Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
Сайт будет доступен по адресу `https://notyeamu.github.io/Tournament-Grid/`.
