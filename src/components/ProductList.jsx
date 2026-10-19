import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Plus, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products.js';
import { addItem, selectCartItems } from '../features/cart/CartSlice.jsx';

const categories = ['All plants', 'Statement plants', 'Easy care', 'Trailing plants'];

export default function ProductList() {
  const [activeCategory, setActiveCategory] = useState('All plants');
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All plants' || product.category === activeCategory;
      const matchesSearch = `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const isInCart = (product) =>
    cartItems.some((item) => item.id === product.id || item.name === product.name);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <main className="catalog-page page-shell">
      <section className="catalog-intro">
        <div>
          <span className="eyebrow">THE GREENHOUSE</span>
          <h1>Find your <em>happy place.</em></h1>
          <p>Meet the leafy friends that make a house feel a little more like home.</p>
        </div>
        <label className="search-box">
          <SlidersHorizontal size={17} aria-hidden="true" />
          <input
            type="search"
            placeholder="Find your next plant..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search plants"
          />
        </label>
      </section>

      <div className="catalog-toolbar">
        <div className="category-tabs" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="result-count">{visibleProducts.length} plants to love</span>
      </div>

      {visibleProducts.length > 0 ? (
        <section className="product-grid" aria-label="Plant products">
          {visibleProducts.map((product) => {
            const added = isInCart(product);
            return (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="product-badge">{product.badge}</span>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <div className="product-title-row">
                    <h2>{product.name}</h2>
                    <strong className="product-price">${Number(product.price).toFixed(2)}</strong>
                  </div>
                  <p>{product.description}</p>
                  <button
                    type="button"
                    className={`add-button ${added ? 'added' : ''}`}
                    disabled={added}
                    onClick={() => handleAddToCart(product)}
                  >
                    {added ? (
                      <>
                        <Check size={16} /> Added to Cart
                      </>
                    ) : (
                      <>
                        <Plus size={16} /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="empty-search">
          <span>🌱</span>
          <h2>No plants found</h2>
          <p>Try another search or choose a different category.</p>
          <button
            className="text-button"
            onClick={() => {
              setSearch('');
              setActiveCategory('All plants');
            }}
          >
            Show all plants
          </button>
        </div>
      )}
    </main>
  );
}
