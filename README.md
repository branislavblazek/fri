# FRI timetable & todo app

![timetable example after filling data](./assets/example.png)
_timetable example after filling data_

## Motivation

Just another CLI app to store todos and show timetable. Data are stored in SQLite3 DB there in repo. Nothing safe but I wanted to do some server sync without much work.

## Tech stack

- Node.js
  - `yargs` - CLI argument parsing
  - `sqlite3` - database
  - `knes` - wrapper for databae
  - `cli-table3` - visualising table in CLI

## Installtion

1. clone this repo
2. install node.js & npm
3. `npm i -g .`
4. `fri <command>`

## Usage

1. add subjects: `fri add-subject "pravdepodobnosť a štatistika" "PaŠ"` ...
2. add teachers: `fri add-teacher Ida Stankovianska` ...
3. add classes: `fri add-class "AR1A3"` ...
4. create timetable with relation data: `fri add-timetable pravde AR1A3 stanko P thu 8 2` ...
   > Note that during timetable creating you can use just some part of word, not whole word. But it has to be unique across all subjects/teachers. Classes you have to write exact.

## ToDo

- refactor code: move non-db logic from file `db.js` into custom file in `commands` dir
- show which date & time is current
- add command for editing timetable
- implement ToDo's
- implement ToDo's into timetable (show asterisk to subject name if this subject has any active ToDo)
