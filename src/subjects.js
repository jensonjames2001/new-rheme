export const SUBJECTS = [
  { id: 'computer-science', label: 'Computer Science', color: '#3B82F6', icon: '💻' },
  { id: 'engineering', label: 'Engineering', color: '#F59E0B', icon: '⚙️' },
  { id: 'mathematics', label: 'Mathematics', color: '#8B5CF6', icon: '∑' },
  { id: 'physics', label: 'Physics', color: '#06B6D4', icon: '⚛️' },
  { id: 'chemistry', label: 'Chemistry', color: '#10B981', icon: '🧪' },
  { id: 'biology', label: 'Biology & Life Sciences', color: '#84CC16', icon: '🧬' },
  { id: 'medicine', label: 'Medicine & Health', color: '#EF4444', icon: '🏥' },
  { id: 'environmental', label: 'Environmental Science', color: '#22C55E', icon: '🌱' },
  { id: 'social-sciences', label: 'Social Sciences', color: '#F97316', icon: '👥' },
  { id: 'economics', label: 'Economics & Finance', color: '#EAB308', icon: '📈' },
  { id: 'humanities', label: 'Humanities & Arts', color: '#EC4899', icon: '📚' },
  { id: 'psychology', label: 'Psychology', color: '#A855F7', icon: '🧠' },
  { id: 'law', label: 'Law', color: '#64748B', icon: '⚖️' },
  { id: 'education', label: 'Education', color: '#14B8A6', icon: '🎓' },
  { id: 'other', label: 'Other', color: '#9CA3AF', icon: '📄' },
]

export function getSubject(id) {
  return SUBJECTS.find(s => s.id === id) || SUBJECTS[SUBJECTS.length - 1]
}
