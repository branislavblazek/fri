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

  knex.destroy()
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

  knex.destroy()
}

const hotfix = async () => {
  await knex('timetable').where('duration', 3).update({ duration: 1 })
  knex.destroy()
  console.log('🔥✅ Hotfix applied.')
}

const addSubject = async ({ name, shortcut }) => {
  await knex('subject').insert({ name, shortcut })
  console.log(`📚✅ Subject ${name} added.`)
  knex.destroy()
}

const listSubjects = async () => {
  const subjects = await knex('subject').select()
  console.log('Subjects:')
  console.log(subjects)
  knex.destroy()
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
  knex.destroy()
}

const addClass = async ({ name }) => {
  await knex('class').insert({ name })
  console.log(`🏫✅ Class ${name} added.`)
  knex.destroy()
}

const addTeacher = async ({ first_name, last_name }) => {
  await knex('teacher').insert({ first_name, last_name })
  console.log(`👨‍🏫✅ Teacher ${first_name} ${last_name} added.`)
  knex.destroy()
}

const addTimetable = async ({
  subject_name,
  class_name,
  teacher_name,
  type,
  day,
  hour,
  duration,
}) => {
  if (
    !subject_name ||
    !class_name ||
    !teacher_name ||
    !type ||
    !day ||
    !hour ||
    !duration
  ) {
    console.log('📅❌ Missing data.')
    knex.destroy()
    return
  }

  const subjectData = await knex('subject').where(
    'search_name',
    'like',
    `%${subject_name.toLowerCase()}%`
  )

  if (!subjectData.length) {
    console.log('📚❌ Subject not found.')
    knex.destroy()
    return
  }

  if (subjectData.length > 1) {
    console.log('📚❌ More than one subject found.')
    knex.destroy()
    return
  }

  const classData = await knex('class').where('name', class_name)

  if (!classData.length) {
    console.log('🏫❌ Class not found.')
    knex.destroy()
    return
  }

  if (classData.length > 1) {
    console.log('🏫❌ More than one class found.')
    knex.destroy()
    return
  }

  const teacherData = await knex('teacher').where(
    'search_name',
    'like',
    `%${teacher_name.toLowerCase()}%`
  )

  if (!teacherData.length) {
    console.log('👨‍🏫❌ Teacher not found.')
    knex.destroy()
    return
  }

  if (teacherData.length > 1) {
    console.log('👨‍🏫❌ More than one teacher found.')
    knex.destroy()
    return
  }

  const TYPES = ['P', 'L']
  if (!TYPES.includes(type.toUpperCase())) {
    console.log('📅❌ Type must be P or L.')
    knex.destroy()
    return
  }

  const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri']
  if (!DAYS.includes(day.toLowerCase())) {
    console.log('📅❌ Day must be mon, tue, wed, thu or fri.')
    knex.destroy()
    return
  }

  const durationInt = parseInt(duration)
  if (isNaN(durationInt) || durationInt < 1) {
    console.log('📅❌ Duration must be a number.')
    knex.destroy()
    return
  }

  await knex('timetable').insert({
    subject_id: subjectData[0].id,
    class_id: classData[0].id,
    teacher_id: teacherData[0].id,
    type: type.toUpperCase(),
    day: DAYS.indexOf(day.toLowerCase()),
    hour: parseInt(hour),
    duration: durationInt,
  })

  console.log('📅✅ Timetable added.')
  knex.destroy()
}

const getTimetable = async () => {
  const timetable = await knex('timetable')
    .join('subject', 'timetable.subject_id', 'subject.id')
    .join('class', 'timetable.class_id', 'class.id')
    .join('teacher', 'timetable.teacher_id', 'teacher.id')
    .select(
      'subject.name as subject',
      'subject.shortcut as subject_shortcut',
      'class.name as class',
      'teacher.first_name as teacher_first_name',
      'teacher.last_name as teacher_last_name',
      'timetable.type',
      'timetable.day',
      'timetable.hour',
      'timetable.duration'
    )
    .orderBy('timetable.day', 'asc')
    .orderBy('timetable.hour', 'asc')

  knex.destroy()
  return timetable
}

module.exports = {
  knex,
  createDatabase,
  dropDatabase,
  hotfix,
  addSubject,
  listSubjects,
  editSubject,
  addClass,
  addTeacher,
  addTimetable,
  getTimetable,
}
