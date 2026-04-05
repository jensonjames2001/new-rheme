import { getSubject } from '../subjects'

export default function SubjectBadge({ subjectId }) {
  const subject = getSubject(subjectId)
  return (
    <span
      className="subject-badge"
      style={{ background: subject.color + '20', color: subject.color, borderColor: subject.color + '60' }}
    >
      {subject.icon} {subject.label}
    </span>
  )
}
