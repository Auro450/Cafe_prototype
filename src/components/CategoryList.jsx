import React from 'react';
import { categoriesData as categories } from '../data';
import './CategoryList.css';

const CategoryList = ({ activeCategory, setActiveCategory, onNavigate }) => {
  return (
    <div className="category-section">
      <div className="category-header">
        <h2 className="section-title">Menu</h2>
        <a href="#" className="see-all" onClick={(e) => { e.preventDefault(); onNavigate('menu'); }}>See All</a>
      </div>
      
      <div className="category-scroll-container">
        <div className="category-list">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <div className="category-icon-wrapper">
                <img src={cat.image} alt={cat.name} className="category-image" loading="lazy" />
              </div>
              <span className="category-name">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
