const { knex } = require('../db')

const addTimetableBlockRepository = async ({
  subject_id,
  class_id,
  teacher_id,
  type_string,
  day,
  hour,
  duration,
}) => {
  await knex('timetable').insert({
    subject_id,
    class_id,
    teacher_id,
    type: type_string,
    day,
    hour,
    duration,
  })
}

const getTimetableBlockRepository = async ({ id }) => {
  const block = await knex('timetable').where('id', id).select()
  return block
}

const removeTimetableBlockRepository = async ({ id }) => {
  await knex('timetable').where('id', id).del()
}

const getTimetableRepository = async () => {
  const timetable = await knex('timetable')
    .join('subject', 'timetable.subject_id', 'subject.id')
    .join('class', 'timetable.class_id', 'class.id')
    .join('teacher', 'timetable.teacher_id', 'teacher.id')
    .select(
      'timetable.id',
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

  return timetable
}

const editTimetableBlockRepository = async ({
  id,
  subject_id,
  class_id,
  teacher_id,
  type_string,
  day,
  hour,
  duration,
}) => {
  const change = {}
  if (subject_id) change.subject_id = subject_id
  if (class_id) change.class_id = class_id
  if (teacher_id) change.teacher_id = teacher_id
  if (type_string) change.type = type_string
  if (day >= 0) change.day = day
  if (hour) change.hour = hour
  if (duration) change.duration = duration

  await knex('timetable').where('id', id).update(change)
}

module.exports = {
  addTimetableBlockRepository,
  getTimetableRepository,
  getTimetableBlockRepository,
  removeTimetableBlockRepository,
  editTimetableBlockRepository,
}
