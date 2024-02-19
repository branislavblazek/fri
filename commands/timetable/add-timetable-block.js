const {
  addTimetableBlockRepository,
} = require('../../repository/timetableRepository')
const {
  getSubjectByName,
  getClassByName,
  getTeacherByName,
  getTimetableBlockType,
  getDayByShortcut,
  getNumber,
} = require('../../validationUtils')

const addTimetableBlock = async ({
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
    return
  }

  const relevantSubject = await getSubjectByName(subject_name)
  if (!relevantSubject) return

  const relevantClass = await getClassByName(class_name)
  if (!relevantClass) return

  const relevantTeacher = await getTeacherByName(teacher_name)
  if (!relevantTeacher) return

  const relevantType = getTimetableBlockType(type)
  if (!relevantType) return

  const relevantDay = getDayByShortcut(day)
  if (!relevantDay) return

  const relevantHour = getNumber(hour)
  if (!relevantHour) return

  const relevantDuration = getNumber(duration)
  if (!relevantDuration) return

  await addTimetableBlockRepository({
    subject_id: relevantSubject.id,
    class_id: relevantClass.id,
    teacher_id: relevantTeacher.id,
    type_string: relevantType,
    day: relevantDay,
    hour: relevantHour,
    duration: relevantDuration,
  })
  console.log('📅✅ Timetable added.')
}

module.exports = { addTimetableBlock }
