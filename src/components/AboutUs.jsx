import { Leaf, Heart, Sun, Sprout } from 'lucide-react';

const values = [
  {
    icon: Sprout,
    title: 'Plants with purpose',
    text: 'We choose beautiful, dependable plants that help make everyday spaces feel more alive.',
  },
  {
    icon: Sun,
    title: 'Care made simple',
    text: 'Clear guidance and beginner-friendly picks help you grow confidence along with your plants.',
  },
  {
    icon: Heart,
    title: 'A little more green',
    text: 'We believe a thoughtful plant can make a room feel warmer, calmer, and more personal.',
  },
];

export default function AboutUs() {
  return (
    <main className="about-page page-shell">
      <section className="about-hero">
        <div className="about-copy">
          <span className="eyebrow">
            <Leaf size={15} /> ROOTED IN GOOD THINGS
          </span>
          <h1>Welcome to Paradise Nursery</h1>
          <p className="tagline" style={{ fontStyle: 'italic', fontWeight: 600, color: 'var(--color-primary, #1e453e)' }}>
            Where green meets serenity
          </p>
          <p>
            At Paradise Nursery, we are passionate about bringing nature closer to you.
            Our mission is to provide a wide range of high-quality plants that not only enhance
            the beauty of your surroundings but also contribute to a healthier and more
            sustainable lifestyle.
          </p>
          <p>
            From air-purifying plants to aromatic fragrant varieties, we have something
            for every plant enthusiast. Whether you are bringing home your very first plant
            or adding to a well-loved indoor jungle, we are here to help you find a plant
            that fits your space and your life.
          </p>
        </div>
        <div className="about-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=85"
            alt="A collection of healthy green houseplants"
          />
          <div className="image-note">
            <span>GROW AT YOUR OWN PACE</span>
            <strong>Good things take roots.</strong>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="section-heading">
          <span className="eyebrow">WHAT WE BELIEVE</span>
          <h2>Good plants. Good energy.</h2>
          <p>Thoughtful choices for happier spaces, one leaf at a time.</p>
        </div>
        <div className="values-grid">
          {values.map(({ icon: Icon, title, text }) => (
            <article className="value-card" key={title}>
              <span className="value-icon">
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
