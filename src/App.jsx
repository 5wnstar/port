import React, { useEffect, useRef, useState } from 'react';

const initialPosts = [
  {
    id: 'application-security-basics',
    category: 'Application Security',
    title: 'Building security into applications from the start',
    excerpt: 'A practical introduction to thinking about security throughout the software development lifecycle.',
    date: 'October 28, 2026',
    readTime: '4 min read',
    content: 'Application security works best when it is part of the development process from the beginning, rather than a final check before release. Start by understanding what the application needs to protect, how users and services interact with it, and where untrusted input enters.\n\nFrom there, use secure defaults, validate inputs at trust boundaries, protect secrets, keep dependencies maintained, and test the controls that matter to your application. Security is an ongoing practice: review changes, learn from findings, and improve the process over time.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85',
  },
  {
    id: 'infrastructure-security-basics',
    category: 'Infrastructure Security',
    title: 'A strong foundation for infrastructure security',
    excerpt: 'Why clear asset visibility, least privilege, and timely updates are useful starting points.',
    date: 'October 14, 2026',
    readTime: '5 min read',
    content: 'It is difficult to protect infrastructure without first understanding what is running, where it is exposed, and who or what can access it. A maintained inventory and sensible network boundaries help create that picture.\n\nLeast-privilege access, secure configuration, reliable patching, and useful monitoring are foundational practices. They do not replace a threat model or a response plan, but they make it easier to reduce avoidable risk and investigate issues when they arise.',
    image:
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1100&q=85',
  },
  {
    id: 'learning-security',
    category: 'Learning',
    title: 'Learning cybersecurity one question at a time',
    excerpt: 'A reminder to build strong fundamentals, practice safely, and document what you learn.',
    date: 'September 30, 2026',
    readTime: '3 min read',
    content: 'Cybersecurity is a broad field, and it can be tempting to jump from one topic to another. A steadier approach is to strengthen the fundamentals, choose a focused question, and practice in systems you own or have explicit permission to use.\n\nKeeping notes on what you tried, what happened, and what you still do not understand makes learning cumulative. Curiosity matters, and so do patience, ethics, and respect for the systems and people involved.',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1100&q=85',
  },
];

const projects = [
  {
    number: '01',
    type: 'AREA OF INTEREST',
    name: 'Application Security',
    detail: 'Building safer software and web applications',
    color: 'project-peach',
    visual: 'application',
    topics: ['Secure development', 'Authentication', 'Threat modeling'],
  },
  {
    number: '02',
    type: 'AREA OF INTEREST',
    name: 'Infrastructure Security',
    detail: 'Protecting systems, networks, and services',
    color: 'project-green',
    visual: 'infrastructure',
    topics: ['Cloud security', 'Hardening', 'Access control'],
  },
  {
    number: '03',
    type: 'ONGOING PRACTICE',
    name: 'Continuous Learning',
    detail: 'Exploring security and sharing what I learn',
    color: 'project-lilac',
    visual: 'learning',
    topics: ['Hands-on labs', 'Research', 'Documentation'],
  },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? 'arrow-icon arrow-diagonal' : 'arrow-icon'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PostCard({ post, index, onRead }) {
  return (
    <article className={`post-card post-card-${index + 1}`}>
      <button className="post-image-link" type="button" onClick={() => onRead(post)} aria-label={`Read ${post.title}`}>
        <img src={post.image} alt="" className="post-image" />
        <span className="image-arrow"><ArrowIcon diagonal /></span>
      </button>
      <div className="post-meta">
        <span>{post.category}</span>
        <span className="meta-dot" aria-hidden="true" />
        <span>{post.date}</span>
      </div>
      <button className="post-title-button" type="button" onClick={() => onRead(post)}>{post.title}</button>
      <p>{post.excerpt}</p>
      <button className="read-post-button" type="button" onClick={() => onRead(post)}>
        {post.readTime || '5 min read'} <ArrowIcon />
      </button>
    </article>
  );
}

function PostReader({ post, onClose }) {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="article-modal" role="dialog" aria-modal="true" aria-labelledby="article-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close article">×</button>
        <img className="article-image" src={post.image} alt="" />
        <div className="article-copy">
          <div className="post-meta"><span>{post.category}</span><span className="meta-dot" /><span>{post.date}</span></div>
          <h2 id="article-title">{post.title}</h2>
          <p className="article-excerpt">{post.excerpt}</p>
          <div className="article-content">{post.content || post.excerpt}</div>
        </div>
      </article>
    </div>
  );
}

function ProjectVisual({ visual }) {
  return (
    <span className={`focus-glyph focus-glyph-${visual}`} aria-hidden="true">
      {visual === 'application' ? '{ }' : visual === 'infrastructure' ? '⌘' : '↗'}
    </span>
  );
}

function TerminalPanel() {
  return (
    <div className="terminal-panel" aria-label="Cybersecurity interests terminal-style illustration">
      <div className="terminal-topbar">
        <div className="terminal-lights"><i /><i /><i /></div>
        <span>toheeb@security: ~</span>
        <span className="terminal-menu">···</span>
      </div>
      <div className="terminal-content">
        <p className="terminal-line"><span className="terminal-prompt">➜</span> whoami</p>
        <p className="terminal-output">Toheeb Adisa</p>
        <p className="terminal-line"><span className="terminal-prompt">➜</span> cat interests.txt</p>
        <div className="terminal-output terminal-list">
          <span><i>01</i> Application security</span>
          <span><i>02</i> Infrastructure security</span>
          <span><i>03</i> Continuous learning</span>
        </div>
        <p className="terminal-line terminal-last"><span className="terminal-prompt">➜</span> <span className="terminal-cursor" /></p>
      </div>
      <div className="terminal-footer"><span><i /> OPEN TO LEARNING</span><span>SECURITY · CURIOSITY · CARE</span></div>
      <span className="terminal-deco terminal-deco-one">0x01</span>
      <span className="terminal-deco terminal-deco-two">SECURE BY DESIGN</span>
    </div>
  );
}

function PostModal({ onClose, onPublish }) {
  const [form, setForm] = useState({ title: '', category: 'Cybersecurity', excerpt: '', content: '', image: '' });
  const [error, setError] = useState('');
  const fileInput = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file to use as your cover.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Please choose an image smaller than 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setForm((current) => ({ ...current, image: reader.result }));
        setError('');
      }
    };
    reader.onerror = () => setError('The image could not be read. Please try another file.');
    reader.readAsDataURL(file);
  }

  function submitPost(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      setError('Add a title, short introduction, and post content before publishing.');
      return;
    }
    onPublish({
      ...form,
      id: `post-${Date.now()}`,
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      image:
        form.image ||
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1100&q=85',
      date: new Intl.DateTimeFormat('en', { month: 'long', day: '2-digit', year: 'numeric' }).format(new Date()),
      readTime: `${Math.max(1, Math.ceil(form.content.trim().split(/\s+/).length / 200))} min read`,
    });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="post-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close post editor">×</button>
        <span className="eyebrow">YOUR JOURNAL</span>
        <h2 id="modal-title">Write a new post</h2>
        <p className="modal-intro">Share something you have been thinking about.</p>
        <form className="post-form" onSubmit={submitPost}>
          <label>
            Post title
            <input name="title" value={form.title} onChange={updateField} placeholder="A thought worth sharing" maxLength="90" />
          </label>
          <div className="form-row">
            <label>
              Category
              <select name="category" value={form.category} onChange={updateField}>
                <option>Cybersecurity</option>
                <option>Application Security</option>
                <option>Infrastructure Security</option>
                <option>Learning</option>
              </select>
            </label>
            <div className="label-group">
              <span className="field-label">Cover image</span>
              <input ref={fileInput} className="file-input" type="file" accept="image/*" onChange={handleImage} />
              <button className="upload-button" type="button" onClick={() => fileInput.current?.click()}>
                {form.image ? 'Image added ✓' : 'Choose an image'}
              </button>
            </div>
          </div>
          <label>
            Short introduction
            <textarea name="excerpt" value={form.excerpt} onChange={updateField} placeholder="A sentence or two to draw readers in" rows="2" maxLength="180" />
          </label>
          <label>
            Your post
            <textarea name="content" value={form.content} onChange={updateField} placeholder="Start writing here..." rows="5" />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-dark publish-button" type="submit">Publish post <ArrowIcon /></button>
          <p className="storage-note">Posts are saved in this browser on this device.</p>
        </form>
      </section>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [readingPost, setReadingPost] = useState(null);
  const [posts, setPosts] = useState(() => {
    try {
      const saved = window.localStorage.getItem('alex-portfolio-posts');
      return saved ? JSON.parse(saved) : initialPosts;
    } catch (error) {
      console.error('Unable to load saved posts:', error);
      return initialPosts;
    }
  });
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem('alex-portfolio-posts', JSON.stringify(posts));
    } catch (error) {
      console.error('Unable to save posts:', error);
      setToast('Could not save your post. Try a smaller cover image.');
    }
  }, [posts]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 4500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function publishPost(post) {
    setPosts((current) => [post, ...current]);
    setModalOpen(false);
    setToast('Your post has been published.');
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu}><span className="prompt-mark">&gt;</span> toheeb<span className="wordmark-dot">_</span></a>
        <button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
        <nav id="primary-navigation" className={`main-nav${menuOpen ? ' nav-open' : ''}`}>
          <a href="#work" onClick={closeMenu}><span>01</span> Focus</a>
          <a href="#about" onClick={closeMenu}><span>02</span> About</a>
          <a href="#journal" onClick={closeMenu}><span>03</span> Journal</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Get in touch <ArrowIcon diagonal /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="availability-dot" /> CYBERSECURITY ENTHUSIAST <span className="eyebrow-divider">/</span> APPLICATION & INFRASTRUCTURE SECURITY</p>
            <h1>Securing what<br />we <em>build</em> and<br />what we <em>run.</em></h1>
            <p className="hero-description">I’m Toheeb Adisa — curious about how digital systems work, where they can be strengthened, and how to make security part of the process.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Explore my focus <ArrowIcon /></a>
              <a className="text-link" href="#about">A bit about me <ArrowIcon /></a>
            </div>
            <div className="hero-footnote"><span><i /> PRACTICE WITH PERMISSION</span><span>ALWAYS LEARNING</span><span>SECURITY WITH PURPOSE</span></div>
          </div>
          <TerminalPanel />
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / WHAT I’M EXPLORING</p>
              <h2>Areas of focus<span className="heading-period">.</span></h2>
            </div>
            <a className="text-link desktop-link" href="#journal">See my field notes <ArrowIcon /></a>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className={`project-visual ${project.color}`}>
                  <span className="project-index">/{project.number}</span>
                  <ProjectVisual visual={project.visual} />
                  <span className="project-visual-label">FOCUS AREA</span>
                </div>
                <div className="project-meta"><span>{project.type}</span><span>{project.number}</span></div>
                <div className="project-title"><div><h3>{project.name}</h3><p>{project.detail}</p></div></div>
                <ul className="focus-topics">{project.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-inner section-wrap">
            <div className="about-mark"><span>&lt;/&gt;</span><small>TOHEEB ADISA<br />SECURITY ENTHUSIAST</small></div>
            <div className="about-copy">
              <p className="eyebrow">02 / A LITTLE ABOUT ME</p>
              <h2>Curiosity is my<br /><em>starting point.</em></h2>
              <p>My name is Toheeb Adisa, and I’m passionate about cybersecurity. I’m particularly interested in application security and infrastructure security. I enjoy learning how systems work, thinking through how they can be protected, and sharing useful notes along the way.</p>
              <a className="text-link" href="#journal">Read my learning notes <ArrowIcon /></a>
            </div>
            <div className="about-note"><span>✳</span><p>Good security<br />starts with<br />good questions.</p></div>
          </div>
        </section>

        <section className="journal-section section-wrap" id="journal">
          <div className="section-heading journal-heading">
            <div>
              <p className="eyebrow">03 / NOTES FROM THE LEARNING PROCESS</p>
              <h2>Field notes<span className="heading-period">.</span></h2>
            </div>
            <button type="button" className="button button-outline write-button" onClick={() => setModalOpen(true)}>
              <span className="plus-icon">+</span> Write a post
            </button>
          </div>
          <div className="post-grid">
            {posts.slice(0, 3).map((post, index) => <PostCard key={post.id} post={post} index={index} onRead={setReadingPost} />)}
          </div>
          {posts.length > 3 && (
            <details className="more-posts">
              <summary>See all {posts.length} posts <ArrowIcon /></summary>
              <div className="post-grid extra-post-grid">
                {posts.slice(3).map((post, index) => <PostCard key={post.id} post={post} index={index} onRead={setReadingPost} />)}
              </div>
            </details>
          )}
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner section-wrap">
            <div>
                <p className="eyebrow">HAVE A QUESTION OR WANT TO CONNECT?</p>
                <h2>Security is a<br /><em>team sport.</em></h2>
            </div>
                <a className="contact-link" href="#journal">Start with my notes <ArrowIcon diagonal /></a>
            <span className="contact-spark">✳</span>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark footer-mark" href="#home"><span className="prompt-mark">&gt;</span> toheeb<span className="wordmark-dot">_</span></a>
        <span>© 2026 Toheeb Adisa <span className="footer-note">· Built with curiosity and care.</span></span>
        <div><a href="#work">Focus</a><a href="#journal">Field notes</a></div>
      </footer>

      {modalOpen && <PostModal onClose={() => setModalOpen(false)} onPublish={publishPost} />}
      {readingPost && <PostReader post={readingPost} onClose={() => setReadingPost(null)} />}
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}

export default App;
