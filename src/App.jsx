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
  },
  {
    number: '02',
    type: 'AREA OF INTEREST',
    name: 'Infrastructure Security',
    detail: 'Protecting systems, networks, and services',
    color: 'project-green',
    visual: 'infrastructure',
  },
  {
    number: '03',
    type: 'ONGOING PRACTICE',
    name: 'Continuous Learning',
    detail: 'Exploring security and sharing what I learn',
    color: 'project-lilac',
    visual: 'learning',
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
  if (visual === 'application') {
    return (
      <div className="visual-goodkind">
        <span className="goodkind-sun" />
        <span className="goodkind-word">application<br />security</span>
        <span className="goodkind-caption">SECURE BY DESIGN</span>
      </div>
    );
  }
  if (visual === 'infrastructure') {
    return (
      <div className="visual-common">
        <span className="common-flower">✳</span>
        <span className="common-word">infrastructure<br />security</span>
        <span className="common-caption">Protect the foundation.</span>
      </div>
    );
  }
  return (
    <div className="visual-sunday">
      <span className="sunday-shape" />
      <span className="sunday-word">learn.<br />practice.<br />share.</span>
      <span className="sunday-caption">A continuous practice.</span>
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
        <a className="wordmark" href="#home" onClick={closeMenu}>ta<span>.</span></a>
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
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#journal" onClick={closeMenu}>Journal</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let’s talk <ArrowIcon diagonal /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="availability-dot" /> CYBERSECURITY ENTHUSIAST</p>
            <h1>Curious about security.<br />Focused on a <em>safer</em><br />digital world.</h1>
            <p className="hero-description">I’m Toheeb Adisa. I’m interested in cybersecurity, especially application security and infrastructure security, and I’m building my knowledge one step at a time.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Explore my interests <ArrowIcon /></a>
              <a className="text-link" href="#about">About me <ArrowIcon /></a>
            </div>
            <div className="hero-footnote"><span>APPLICATION SECURITY</span><span>INFRASTRUCTURE SECURITY</span></div>
          </div>
          <div className="hero-art" aria-label="Abstract portrait illustration">
            <div className="art-sun" />
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-plant plant-left"><i /><i /><i /><i /><i /></div>
            <div className="art-plant plant-right"><i /><i /><i /><i /><i /></div>
            <div className="art-vase"><span /></div>
            <div className="art-book book-back" />
            <div className="art-book book-front" />
            <div className="art-stamp">LEARN<br />BUILD<br />SECURE<br /><span>✳</span></div>
            <span className="art-caption">curiosity, with care</span>
            <span className="art-star star-one">✳</span>
            <span className="art-star star-two">✳</span>
          </div>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT I’M INTERESTED IN</p>
              <h2>Security focus areas<span className="heading-period">.</span></h2>
            </div>
            <a className="text-link desktop-link" href="#journal">Read my notes <ArrowIcon /></a>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <a href="#contact" className="project-card" key={project.number}>
                <div className={`project-visual ${project.color}`}><ProjectVisual visual={project.visual} /></div>
                <div className="project-meta"><span>{project.type}</span><span>{project.number}</span></div>
                <div className="project-title"><div><h3>{project.name}</h3><p>{project.detail}</p></div><ArrowIcon diagonal /></div>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-inner section-wrap">
            <div className="about-mark"><span>✳</span><small>TOHEEB ADISA<br />CYBERSECURITY</small></div>
            <div className="about-copy">
              <p className="eyebrow">CYBERSECURITY · APPLICATION SECURITY · INFRASTRUCTURE SECURITY</p>
              <h2>Curious by nature.<br /><em>Security-minded</em> by design.</h2>
              <p>My name is Toheeb Adisa, and I’m passionate about cybersecurity. I’m particularly interested in application security and infrastructure security, and I’m committed to learning how to help make digital systems more secure.</p>
              <a className="text-link" href="#journal">Read what I’m learning <ArrowIcon /></a>
            </div>
            <div className="about-note"><span>✳</span><p>Good security<br />starts with<br />good questions.</p></div>
          </div>
        </section>

        <section className="journal-section section-wrap" id="journal">
          <div className="section-heading journal-heading">
            <div>
              <p className="eyebrow">THINGS I’VE BEEN THINKING ABOUT</p>
              <h2>From the journal<span className="heading-period">.</span></h2>
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
                <p className="eyebrow">CYBERSECURITY & CONTINUOUS LEARNING</p>
                <h2>Building a more<br /><em>secure digital world.</em></h2>
            </div>
              <a className="contact-link" href="#journal">Explore my journal <ArrowIcon diagonal /></a>
            <span className="contact-spark">✳</span>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark footer-mark" href="#home">ta<span>.</span></a>
        <span>© 2026 Toheeb Adisa</span>
        <div><a href="#work">Security interests</a><a href="#journal">Journal</a></div>
      </footer>

      {modalOpen && <PostModal onClose={() => setModalOpen(false)} onPublish={publishPost} />}
      {readingPost && <PostReader post={readingPost} onClose={() => setReadingPost(null)} />}
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}

export default App;
