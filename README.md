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

1. init DB: `fri create`
2. add subjects: `fri add-subject "pravdepodobnosť a štatistika" "PaŠ"` ...
3. add teachers: `fri add-teacher Ida Stankovianska` ...
4. add classes: `fri add-class "AR1A3"` ...
5. create timetable with relation data: `fri add-timetable-block pravde AR1A3 stanko P thu 8 2` ...
   > Note that during timetable creating you can use just some part of word, not whole word. But it has to be unique across all subjects/teachers. Classes you have to write exact.

## Docs

### fri create

Required command to init database. This will create all neccessary tables.

### fri drop

Drop database. This will delete all data!

### fri list-subjects

Print every subject stored in database.

### fri add-subject <name> <shortcut>

Add school subject to database. Param <name> is full name of subject. Param <shortcut> is it's shortcut. This is used in timetable.

To enter name with more than one word, use "".
e.g.:

`fri add-subject "Modelovanie a Simulacia" "MaS"`

`fri add-subject Matematika Mat`

### fri edit-subject <id>

Edit subject values by it's ID. This ID can be retrieved from `fri list-subjects`

options:

--name "new name" / -n "new name"

--shortcut "NS" / -s "NS"

### fri add-class <name>

Add class to database. Required is just name of class. Can be used without ""
e.q.
`fri add-class RA056`

### fri add-teacher <first_name> <last_name>

Add teacher. First param is first name, than last name. Can be with accent. Program will trim accent and save copy.

### fri list-teachers

List all teachers with IDs.

### fri remove-teacher <teacher\*name> / ID\_<teacher_id>

Remove teacher by his name. Name is case-insensitive and accent-insensitive. But it has to be unique across all teachers

e.q. `fri remove-teacher peter`
Or if there's no chance to enter unique name, it's possible to enter teacher's id with #.

e.q. `fri remove-teacher #12`

When there's teacher with #12 and for example #112, then teacher with exact ID will be deleted (#12).

### fri add-timetable-block <subject*name> <class_name> <teacher_name> <type*> <day*> <hour*> <duration\_>

Add timetable block into timetable. This command is mix of all data stored in database.

<subject_name> - specify subject by unique name, can be even 2 letters if it will be unique

<class_name> - this have to be exact

<teacher_name> - specify teacher by unique name

<type\_> - P (prednaska) or L (laboratorne cvicenie)

<day\_> - day of week: mon/tue/wed/thu/fri

<hour\_> - at which hour this block starts

<duration\_> - how much this block will take

### fri timetable

Show timetable based on data.

## ToDo

- refactor code: move non-db logic from file `db.js` into custom file in `commands` dir
- show which date & time is current
- add command for editing timetable
- implement ToDo's
- implement ToDo's into timetable (show asterisk to subject name if this subject has any active ToDo)
