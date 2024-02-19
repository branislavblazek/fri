const { getClassRepository } = require('../../repository/classRepository')
const { findSubjectRepository } = require('../../repository/subjectRepository')
const { getTeacherRepository } = require('../../repository/teacherRepository')
const {
  addTimetableBlockRepository,
} = require('../../repository/timetableRepository')

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

  const subjectData = await findSubjectRepository({ subject_name })
  if (!subjectData.length) {
    console.log('📚❌ Subject not found.')
    return
  }
  if (subjectData.length > 1) {
    console.log('📚❌ More than one subject found.')
    return
  }

  const classData = await getClassRepository({ name: class_name })
  if (!classData.length) {
    console.log('🏫❌ Class not found.')
    return
  }
  if (classData.length > 1) {
    console.log('🏫❌ More than one class found.')
    return
  }

  const teacherData = await getTeacherRepository({ name: teacher_name })
  if (!teacherData.length) {
    console.log('👨‍🏫❌ Teacher not found.')
    return
  }
  if (teacherData.length > 1) {
    console.log('👨‍🏫❌ More than one teacher found.')
    return
  }

  const TYPES = ['P', 'L']
  if (!TYPES.includes(type.toUpperCase())) {
    console.log('📅❌ Type must be P or L.')
    return
  }

  const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri']
  if (!DAYS.includes(day.toLowerCase())) {
    console.log('📅❌ Day must be mon, tue, wed, thu or fri.')
    return
  }

  const durationInt = parseInt(duration)
  if (isNaN(durationInt) || durationInt < 1) {
    console.log('📅❌ Duration must be a number.')
    return
  }

  await addTimetableBlockRepository({
    subject_id: subjectData[0].id,
    class_id: classData[0].id,
    teacher_id: teacherData[0].id,
    type_string: type.toUpperCase(),
    day: DAYS.indexOf(day.toLowerCase()),
    hour: parseInt(hour),
    duration: durationInt,
  })
  console.log('📅✅ Timetable added.')
}

module.exports = { addTimetableBlock }
