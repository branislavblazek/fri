const {
  getTimetableBlockRepository,
  editTimetableBlockRepository,
} = require('../../repository/timetableRepository')
const {
  getSubjectByName,
  getNumber,
  getDayByShortcut,
  getTimetableBlockType,
  getTeacherByName,
  getClassByName,
} = require('../../validationUtils')

const editTimetableBlock = async ({
  id,
  subject_name,
  class_name,
  teacher_name,
  type_string,
  day,
  hour,
  duration,
}) => {
  const exists = await getTimetableBlockRepository({ id })
  if (exists.length === 0) {
    console.log('📅❌ Timetable block not found.')
    return
  }

  const change = {}

  if (subject_name) {
    const relevantSubject = await getSubjectByName(subject_name)
    if (!relevantSubject) return
    change.subject_id = relevantSubject.id
  }

  if (class_name) {
    const relevantClass = await getClassByName(class_name)
    if (!relevantClass) return
    change.class_id = relevantClass.id
  }

  if (teacher_name) {
    const relevantTeacher = await getTeacherByName(teacher_name)
    if (!relevantTeacher) return
    change.teacher_id = relevantTeacher.id
  }

  if (type_string) {
    const relevantType = getTimetableBlockType(type_string)
    if (!relevantType) return
    change.type = relevantType
  }

  if (day) {
    const relevantDay = getDayByShortcut(day)
    if (relevantDay === null) return
    change.day = relevantDay
  }

  if (hour) {
    const relevantHour = getNumber(hour)
    if (!relevantHour) return
    change.hour = relevantHour
  }

  if (duration) {
    const relevantDuration = getNumber(duration)
    if (!relevantDuration) return
    change.duration = relevantDuration
  }

  // if no change
  if (Object.keys(change).length === 0) {
    console.log('📅❌ No changes.')
    return
  }

  await editTimetableBlockRepository({ id, ...change })
  console.log('📅✅ Timetable block edited.')
}

module.exports = { editTimetableBlock }
