import { SUBJECTS } from '../subjects'

export default function SubjectFilter({ selected, onChange }) {
  return (
    <div className="subject-filter">
      <button
        className={`subject-chip ${selected === 'all' ? 'active' : ''}`}
        onClick={() => onChange('all')}
      >
        All Subjects
      </button>
      {SUBJECTS.map(subject => (
        <button
          key={subject.id}
          className={`subject-chip ${selected === subject.id ? 'active' : ''}`}
          style={selected === subject.id ? { background: subject.color, borderColor: subject.color, color: '#fff' } : { borderColor: subject.color, color: subject.color }}
          onClick={() => onChange(subject.id)}
        >
          <span>{subject.icon}</span>
          {subject.label}
        </button>
      ))}
    </div>
  )
}
