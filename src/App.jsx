import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ArrowRight, Leaf, Menu, ShoppingBag, X } from 'lucide-react';
import AboutUs from './components/AboutUs.jsx';
import ProductList from './components/ProductList.jsx';
import CartItem from './components/CartItem.jsx';
import { selectCartCount } from './features/cart/CartSlice.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);

  const navigate = (nextPage) => {
    setPage(nextPage);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <div className="announcement-bar">
        A little green goes a long way <span>✳</span> Free delivery on every order
      </div>
      <header className="site-header">
        <button
          className="brand"
          onClick={() => navigate('home')}
          aria-label="Paradise Nursery home"
        >
          <span className="brand-mark">
            <Leaf size={23} strokeWidth={1.7} />
          </span>
          <span className="brand-text">
            paradise<span>nursery</span>
          </span>
        </button>
        <button
          className="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
        <nav
          className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`}
          aria-label="Main navigation"
        >
          <button
            className={page === 'home' ? 'nav-active' : ''}
            onClick={() => navigate('home')}
          >
            Home
          </button>
          <button
            className={page === 'shop' ? 'nav-active' : ''}
            onClick={() => navigate('shop')}
          >
            Plants
          </button>
          <button
            className={page === 'about' ? 'nav-active' : ''}
            onClick={() => navigate('about')}
          >
            About Us
          </button>
        </nav>
        <button
          className="header-cart"
          onClick={() => navigate('cart')}
          aria-label={`Shopping cart, ${cartCount} items`}
        >
          <ShoppingBag size={19} />
          <span>Cart</span>
          <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      {page === 'home' && (
        <main>
          <section className="home-hero">
            <div className="hero-content">
              <span className="eyebrow hero-eyebrow">
                <span className="eyebrow-dot" /> WELCOME TO PARADISE NURSERY
              </span>
              <h1>
                Where green<br />meets <em>serenity.</em>
              </h1>
              <p>
                At Paradise Nursery, we are passionate about bringing nature closer to you.
                Explore our curated collection of indoor, air-purifying, and low-maintenance
                houseplants to transform your living space.
              </p>
              <div className="hero-actions">
                <button
                  className="primary-button"
                  id="get-started-btn"
                  onClick={() => navigate('shop')}
                >
                  Get Started <ArrowRight size={17} />
                </button>
                <button
                  className="secondary-link"
                  onClick={() => navigate('about')}
                >
                  About Us
                </button>
              </div>
              <div className="hero-proof">
                <span className="proof-avatars">✿　❋　✽</span>
                <span>Loved by plant enthusiasts everywhere</span>
              </div>
            </div>
            <div className="hero-visual">
              <img
                src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1400&q=90"
                alt="Sunlight falling across a collection of leafy houseplants"
              />
              <div className="hero-sticker">
                <Leaf size={18} />
                <span>
                  Grow a little<br />
                  <strong>happiness.</strong>
                </span>
              </div>
              <div className="hero-image-caption">
                <span>01 / THE INDOOR COLLECTION</span>
                <span>Made for your space ↗</span>
              </div>
            </div>
            <div className="hero-side-label">GROW SLOW · LIVE WELL</div>
          </section>
          <section className="home-benefits">
            <div>
              <span className="benefit-icon">✳</span>
              <span>
                <strong>Picked with care</strong>
                <small>Healthy plants, happy homes</small>
              </span>
            </div>
            <div>
              <span className="benefit-icon">☼</span>
              <span>
                <strong>Easy to grow</strong>
                <small>Plant care without the guesswork</small>
              </span>
            </div>
            <div>
              <span className="benefit-icon">♡</span>
              <span>
                <strong>A little joy, delivered</strong>
                <small>Free delivery on every order</small>
              </span>
            </div>
          </section>
          <section className="home-featured page-shell">
            <div>
              <span className="eyebrow">READY TO GROW?</span>
              <h2>Start your plant journey today.</h2>
            </div>
            <p>
              From easy-care favorites to dramatic statement greens, find the perfect plant companions for your home.
            </p>
            <button className="primary-button" onClick={() => navigate('shop')}>
              Get Started <ArrowRight size={16} />
            </button>
          </section>
        </main>
      )}

      {page === 'shop' && <ProductList />}
      {page === 'about' && <AboutUs />}
      {page === 'cart' && <CartItem onContinueShopping={() => navigate('shop')} />}

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark">
            <Leaf size={21} />
          </span>
          <span className="brand-text">
            paradise<span>nursery</span>
          </span>
        </div>
        <p>Where green meets serenity. Make room for a little more nature.</p>
        <span className="footer-copyright">© 2026 Paradise Nursery. All rights reserved.</span>
      </footer>
    </div>
  );
}
