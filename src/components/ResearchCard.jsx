import SubjectBadge from './SubjectBadge'

export default function ResearchCard({ research }) {
  const { title, authors, abstract, subjects, year, journal, doi } = research

  return (
    <article className="research-card">
      <div className="card-subjects">
        {(subjects || []).map(s => (
          <SubjectBadge key={s} subjectId={s} />
        ))}
      </div>
      <h3 className="card-title">{title}</h3>
      {authors && (
        <p className="card-authors">
          {Array.isArray(authors) ? authors.join(', ') : authors}
        </p>
      )}
      <div className="card-meta">
        {year && <span className="meta-item">📅 {year}</span>}
        {journal && <span className="meta-item">📰 {journal}</span>}
      </div>
      {abstract && (
        <p className="card-abstract">{abstract.length > 300 ? abstract.slice(0, 300) + '…' : abstract}</p>
      )}
      {doi && (
        <a
          className="card-doi"
          href={`https://doi.org/${doi}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          DOI: {doi} ↗
        </a>
      )}
    </article>
  )
}
