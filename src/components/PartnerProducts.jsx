
import { useEffect, useState } from 'react';
import './PartnerProducts.css';

export default function PartnerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/partner/products')
      .then((res) => {
        if (!res.ok) throw new Error('Products unavailable');
        return res.json();
      })
      .then((data) => setProducts(data.products || []))
      .catch(() => setError('Unable to load partner products.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="partner-products">
      <div className="partner-products-header">
        <div>
          <span className="partner-products-label">TEAM 5 · INTEGRATION</span>
          <h2>Product Catalogue</h2>
          <p>Live product data from the Billing System</p>
        </div>
        <span className="product-count">{products.length} products</span>
      </div>

      {loading ? (
        <p className="products-message">Loading products...</p>
      ) : error ? (
        <p className="products-message error">{error}</p>
      ) : products.length === 0 ? (
        <p className="products-message">No products found.</p>
      ) : (
        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id || product.sku}>
                  <td className="product-name">{product.name}</td>
                  <td>{product.sku}</td>
                  <td>
                    <span className="product-category">
                      {product.category}
                    </span>
                  </td>
                  <td>{product.brand}</td>
                  <td className="product-price">
                    {Number(product.sp).toLocaleString()}
                  </td>
                  <td>
                    <span className="product-stock">
                      {product.quantity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
