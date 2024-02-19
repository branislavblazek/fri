#! /usr/bin/env node

const yargs = require('yargs')
const {
  createDatabase,
  dropDatabase,
  addSubject,
  listSubjects,
  editSubject,
  addClass,
  knex,
} = require('./db')
const { addTeacher } = require('./commands/teacher/add-teacher')
const { listTeachers } = require('./commands/teacher/list-teachers')
const { removeTeacher } = require('./commands/teacher/remove-teacher')
const { timetable } = require('./commands/timetable/timetable')
const {
  addTimetableBlock,
} = require('./commands/timetable/add-timetable-block')
const {
  removeTimetableBlock,
} = require('./commands/timetable/remove-timetable-block')
const {
  editTimetableBlock,
} = require('./commands/timetable/edit-timetable-block')

async function main() {
  await yargs(process.argv.slice(2))
    .command('create', 'Create database.', (yargs) => {}, createDatabase)
    .command('drop', 'Drop database.', (yargs) => {}, dropDatabase)
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
      () => {},
      addTeacher
    )
    .command('list-teachers', 'List teachers.', (yargs) => {}, listTeachers)
    .command(
      'remove-teacher <name>',
      'Remove teacher.',
      (yargs) => {
        yargs.positional('name', { type: 'string' })
      },
      removeTeacher
    )
    // TIMETABLE
    .command(
      'add-timetable-block <subject_name> <class_name> <teacher_name> <type> <day> <hour> <duration>',
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
      addTimetableBlock
    )
    .command(
      'remove-timetable-block <id>',
      'Remove timetable block.',
      (yargs) => {
        yargs.positional('id', { type: 'number' })
      },
      removeTimetableBlock
    )
    .command(
      'edit-timetable-block <id>',
      'Edit timetable block.',
      (yargs) => {
        yargs.positional('id', { type: 'number' })
        yargs.option('subject_name', {
          alias: 's',
          describe: 'edit subject name',
          type: 'string',
        })
        yargs.option('class_name', {
          alias: 'c',
          describe: 'edit class name',
          type: 'string',
        })
        yargs.option('teacher_name', {
          alias: 't',
          describe: 'edit teacher name',
          type: 'string',
        })
        yargs.option('type_string', {
          alias: 'y',
          describe: 'edit type',
          type: 'string',
        })
        yargs.option('day', {
          alias: 'd',
          describe: 'edit day',
          type: 'string',
        })
        yargs.option('hour', {
          alias: 'o',
          describe: 'edit hour',
          type: 'number',
        })
        yargs.option('duration', {
          alias: 'u',
          describe: 'edit duration',
          type: 'number',
        })
      },
      editTimetableBlock
    )
    .command(
      'timetable',
      'Show timetable.',
      (yargs) => {
        yargs.option('id', {
          describe: 'edit subject name',
          type: 'boolean',
        })
      },
      timetable
    )
    .strict()
    .demandCommand()
    .help('h').argv

  knex.destroy()
}

main()
