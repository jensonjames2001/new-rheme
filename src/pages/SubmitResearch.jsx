import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { SUBJECTS } from '../subjects'

const INITIAL = {
  title: '',
  authors: '',
  abstract: '',
  subjects: [],
  year: new Date().getFullYear(),
  journal: '',
  doi: '',
}

export default function SubmitResearch() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState(null) // null | 'submitting' | 'success' | 'error'

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function toggleSubject(id) {
    setForm(f => ({
      ...f,
      subjects: f.subjects.includes(id)
        ? f.subjects.filter(s => s !== id)
        : [...f.subjects, id],
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || form.subjects.length === 0) return
    setStatus('submitting')
    try {
      await addDoc(collection(db, 'research'), {
        ...form,
        authors: form.authors.split(',').map(a => a.trim()).filter(Boolean),
        year: Number(form.year),
        createdAt: serverTimestamp(),
      })
      setForm(INITIAL)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <h1 className="hero-title">Submit Research</h1>
        <p className="hero-subtitle">
          Add your research paper and classify it by subject area
        </p>
      </section>

      <div className="form-wrapper">
        <form className="submit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              className="form-input"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter the full research title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Authors</label>
            <input
              className="form-input"
              name="authors"
              value={form.authors}
              onChange={handleChange}
              placeholder="Comma-separated, e.g. Jane Smith, Carlos Mendez"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Year</label>
              <input
                className="form-input"
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                min="1900"
                max="2100"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Journal / Conference</label>
              <input
                className="form-input"
                name="journal"
                value={form.journal}
                onChange={handleChange}
                placeholder="e.g. Nature, IEEE CVPR"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">DOI</label>
            <input
              className="form-input"
              name="doi"
              value={form.doi}
              onChange={handleChange}
              placeholder="e.g. 10.1038/nature12345"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Abstract</label>
            <textarea
              className="form-input form-textarea"
              name="abstract"
              value={form.abstract}
              onChange={handleChange}
              placeholder="Paste the paper abstract here…"
              rows={5}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Subject Classification *</label>
            <p className="form-hint">Select one or more subject areas</p>
            <div className="subject-picker">
              {SUBJECTS.map(subject => {
                const active = form.subjects.includes(subject.id)
                return (
                  <button
                    key={subject.id}
                    type="button"
                    className={`subject-pick-btn ${active ? 'active' : ''}`}
                    style={active ? { background: subject.color, borderColor: subject.color, color: '#fff' } : { borderColor: subject.color, color: subject.color }}
                    onClick={() => toggleSubject(subject.id)}
                  >
                    {subject.icon} {subject.label}
                    {active && <span className="pick-check">✓</span>}
                  </button>
                )
              })}
            </div>
          </div>

          {status === 'success' && (
            <div className="form-success">Research submitted successfully!</div>
          )}
          {status === 'error' && (
            <div className="form-error">Submission failed. Please check your Firebase configuration.</div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={status === 'submitting' || !form.title || form.subjects.length === 0}
          >
            {status === 'submitting' ? 'Submitting…' : 'Submit Research'}
          </button>
        </form>
      </div>
    </main>
  )
}
