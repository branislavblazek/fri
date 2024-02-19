const { resolve } = require('path')
const absolutePath = resolve(__dirname, './database.sqlite3')
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: absolutePath,
  },
  useNullAsDefault: true,
})

const dropDatabase = async () => {
  await knex.schema
    .dropTableIfExists('subject')
    .dropTableIfExists('class')
    .dropTableIfExists('teacher')
    .dropTableIfExists('timetable')
    .dropTableIfExists('todo')
}

const createDatabase = async () => {
  await knex.schema
    .createTable('subject', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('shortcut')
      table.string('search_name')
    })
    .createTable('class', (table) => {
      table.increments('id').primary()
      table.string('name')
    })
    .createTable('teacher', (table) => {
      table.increments('id').primary()
      table.string('first_name')
      table.string('last_name')
      table.string('search_name')
    })
    .createTable('timetable', (table) => {
      table.increments('id').primary()
      table.integer('subject_id').references('subject.id')
      table.integer('class_id').references('class.id')
      table.integer('teacher_id').references('teacher.id')
      table.string('type')
      table.integer('day')
      table.integer('hour')
      table.integer('duration')
      table.integer('comment')
    })
    .createTable('todo', (table) => {
      table.increments('id').primary()
      table.integer('subject_id').references('subject.id')
      table.string('name')
      table.string('description')
      table.date('deadline')
    })
}

const addSubject = async ({ name, shortcut }) => {
  await knex('subject').insert({ name, shortcut })
  console.log(`📚✅ Subject ${name} added.`)
}

const listSubjects = async () => {
  const subjects = await knex('subject').select()
  console.log('Subjects:')
  console.log(subjects)
}

const editSubject = async ({ id, name, shortcut }) => {
  if (!name && !shortcut) {
    console.log('📚❌ No changes requested.')
    return
  }

  const changes = {}
  if (name) changes.name = name
  if (shortcut) changes.shortcut = shortcut

  await knex('subject').where('id', id).update(changes)
  console.log(`📚✅ Subject ${name} edited.`)
}

const addClass = async ({ name }) => {
  await knex('class').insert({ name })
  console.log(`🏫✅ Class ${name} added.`)
}

module.exports = {
  knex,
  createDatabase,
  dropDatabase,
  addSubject,
  listSubjects,
  editSubject,
  addClass,
}
