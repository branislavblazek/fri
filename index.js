#! /usr/bin/env node

const yargs = require('yargs')
const {
  createDatabase,
  dropDatabase,
  hotfix,
  addSubject,
  listSubjects,
  editSubject,
  addClass,
  addTeacher,
  addTimetable,
} = require('./db')
const { timetable } = require('./commands/timetable')

const argv = yargs(process.argv.slice(2))
  .command('create', 'Create database.', (yargs) => {}, createDatabase)
  .command('drop', 'Drop database.', (yargs) => {}, dropDatabase)
  .command('hotfix', 'Apply hotfix.', (yargs) => {}, hotfix)
  // SUBJECTS
  .command('list-subjects', 'List subjects.', (yargs) => {}, listSubjects)
  .command(
    'add-subject <name> <shortcut>',
    'Add subject.',
    (yargs) => {
      yargs.positional('name', { type: 'string' })
      yargs.positional('shortcut', { type: 'string' })
    },
    addSubject
  )
  .command(
    'edit-subject <id>',
    'Edit subject.',
    (yargs) => {
      yargs.option('name', {
        alias: 'n',
        describe: 'edit subject name',
        type: 'string',
      })
      yargs.option('shortcut', {
        alias: 's',
        describe: 'edit subject shortcut',
        type: 'string',
      })
    },
    editSubject
  )
  // CLASSES
  .command('add-class <name>', 'Add class.', (yargs) => {}, addClass)
  // TEACHERS
  .command(
    'add-teacher <first_name> <last_name>',
    'Add teacher.',
    (yargs) => {},
    addTeacher
  )
  // TIMETABLE
  .command(
    'add-timetable <subject_name> <class_name> <teacher_name> <type> <day> <hour> <duration>',
    'Add timetable.',
    (yargs) => {
      yargs.positional('subject_name', { type: 'string' })
      yargs.positional('class_name', { type: 'string' })
      yargs.positional('teacher_name', { type: 'string' })
      yargs.positional('type', { type: 'string' })
      yargs.positional('day', { type: 'string' })
      yargs.positional('hour', { type: 'number' })
      yargs.positional('duration', { type: 'number' })
    },
    addTimetable
  )
  .command('timetable', 'Show timetable.', (yargs) => {}, timetable)
  .strict()
  .demandCommand()
  .help('h').argv
