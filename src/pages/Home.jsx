import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import SubjectFilter from '../components/SubjectFilter'
import ResearchCard from '../components/ResearchCard'
import { SUBJECTS } from '../subjects'

// Demo data shown while Firebase is being configured
const DEMO_RESEARCH = [
  {
    id: 'demo1',
    title: 'Deep Learning Approaches for Natural Language Processing',
    authors: ['Jane Smith', 'Carlos Mendez'],
    abstract: 'This paper explores transformer-based architectures for NLP tasks, demonstrating state-of-the-art results on benchmark datasets including GLUE, SuperGLUE, and SQuAD. We present a novel fine-tuning strategy that reduces computational cost by 40%.',
    subjects: ['computer-science'],
    year: 2024,
    journal: 'Journal of Machine Learning Research',
    doi: '10.1234/jmlr.2024.001',
  },
  {
    id: 'demo2',
    title: 'CRISPR-Cas9 Gene Editing in Hereditary Disease Treatment',
    authors: ['Dr. Emily Chen', 'Prof. Kwame Asante'],
    abstract: 'We demonstrate the efficacy of targeted CRISPR-Cas9 editing in correcting pathogenic variants associated with sickle cell disease and beta-thalassemia, with clinical trial data from 45 patients over 18 months.',
    subjects: ['biology', 'medicine'],
    year: 2024,
    journal: 'Nature Medicine',
    doi: '10.1038/nm.2024.089',
  },
  {
    id: 'demo3',
    title: 'Quantum Computing Algorithms for Cryptographic Applications',
    authors: ['Aisha Nkemdi', 'Liam O\'Brien'],
    abstract: 'We present a new family of quantum-resistant cryptographic algorithms optimized for near-term quantum hardware. Our benchmarks show a 3× speedup over existing post-quantum candidates on standard security tasks.',
    subjects: ['computer-science', 'mathematics', 'physics'],
    year: 2023,
    journal: 'IEEE Transactions on Information Theory',
    doi: '10.1109/tit.2023.456',
  },
  {
    id: 'demo4',
    title: 'Climate Change Impacts on Coastal Biodiversity',
    authors: ['Prof. Maria Gonzalez'],
    abstract: 'A 10-year longitudinal study examining species migration patterns and population decline in Pacific coastal ecosystems, correlating temperature rise with measurable biodiversity loss at multiple trophic levels.',
    subjects: ['environmental', 'biology'],
    year: 2023,
    journal: 'Global Change Biology',
    doi: '10.1111/gcb.2023.177',
  },
  {
    id: 'demo5',
    title: 'Behavioral Economics and Public Health Policy',
    authors: ['Dr. Samuel Park', 'Dr. Fatima Al-Rashid'],
    abstract: 'Analyzing nudge theory interventions across six countries, this study evaluates how behavioral economics principles can improve vaccination uptake, dietary habits, and smoking cessation rates in low-income populations.',
    subjects: ['economics', 'social-sciences', 'psychology'],
    year: 2024,
    journal: 'The Lancet Public Health',
    doi: '10.1016/lph.2024.022',
  },
  {
    id: 'demo6',
    title: 'Advances in Solid-State Battery Technology for Electric Vehicles',
    authors: ['Dr. Yuki Tanaka', 'Dr. Priya Sharma'],
    abstract: 'This paper presents breakthrough results in solid-state electrolyte formulations achieving energy densities of 500 Wh/kg, with cycle stability exceeding 2,000 charge-discharge cycles at room temperature.',
    subjects: ['engineering', 'chemistry'],
    year: 2024,
    journal: 'Nature Energy',
    doi: '10.1038/nenergy.2024.055',
  },
]

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [research, setResearch] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingDemo, setUsingDemo] = useState(false)

  useEffect(() => {
    fetchResearch()
  }, [selectedSubject])

  async function fetchResearch() {
    setLoading(true)
    try {
      let q
      if (selectedSubject === 'all') {
        q = query(collection(db, 'research'), orderBy('createdAt', 'desc'))
      } else {
        q = query(
          collection(db, 'research'),
          where('subjects', 'array-contains', selectedSubject),
          orderBy('createdAt', 'desc')
        )
      }
      const snapshot = await getDocs(q)
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      if (docs.length === 0 && selectedSubject === 'all') {
        setResearch(DEMO_RESEARCH)
        setUsingDemo(true)
      } else {
        setResearch(docs)
        setUsingDemo(false)
      }
    } catch {
      setResearch(DEMO_RESEARCH)
      setUsingDemo(true)
    }
    setLoading(false)
  }

  const displayed = research.filter(r => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      r.title?.toLowerCase().includes(q) ||
      r.abstract?.toLowerCase().includes(q) ||
      (Array.isArray(r.authors) ? r.authors.join(' ') : r.authors || '').toLowerCase().includes(q)
    )
  })

  const subjectCounts = {}
  research.forEach(r => {
    (r.subjects || []).forEach(s => {
      subjectCounts[s] = (subjectCounts[s] || 0) + 1
    })
  })

  return (
    <main className="page">
      <section className="hero">
        <h1 className="hero-title">Research Classification Hub</h1>
        <p className="hero-subtitle">
          Discover and explore academic research organized by subject area
        </p>
        <input
          type="search"
          className="search-input"
          placeholder="Search by title, author, or keyword…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </section>

      {usingDemo && (
        <div className="demo-notice">
          Showing sample research. Connect your Firebase project to load real data.
        </div>
      )}

      <section className="stats-row">
        {SUBJECTS.slice(0, 6).map(subject => (
          <button
            key={subject.id}
            className="stat-card"
            style={{ borderColor: subject.color }}
            onClick={() => setSelectedSubject(subject.id)}
          >
            <span className="stat-icon">{subject.icon}</span>
            <span className="stat-label">{subject.label}</span>
            <span className="stat-count" style={{ color: subject.color }}>
              {subjectCounts[subject.id] || 0} papers
            </span>
          </button>
        ))}
      </section>

      <div className="filter-bar">
        <SubjectFilter selected={selectedSubject} onChange={setSelectedSubject} />
      </div>

      <section className="results">
        {loading ? (
          <div className="loading">Loading research…</div>
        ) : displayed.length === 0 ? (
          <div className="empty">No research found for this subject.</div>
        ) : (
          <>
            <p className="results-count">{displayed.length} paper{displayed.length !== 1 ? 's' : ''} found</p>
            <div className="card-grid">
              {displayed.map(r => (
                <ResearchCard key={r.id} research={r} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
