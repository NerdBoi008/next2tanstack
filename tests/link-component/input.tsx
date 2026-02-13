import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* Basic link */}
      <Link href="/about">About</Link>

      {/* Link with className */}
      <Link href="/contact" className="nav-link">
        Contact Us
      </Link>

      {/* Dynamic link */}
      <Link href={`/posts/${postId}`}>Read Post</Link>

      {/* Link with template literal */}
      <Link href={`/users/${userId}/profile`}>
        View Profile
      </Link>

      {/* Link with multiple props */}
      <Link 
        href="/blog" 
        className="btn btn-primary"
        prefetch={false}
        replace
      >
        Blog
      </Link>

      {/* Link with scroll prop (Next.js specific) */}
      <Link href="/services" scroll={false}>
        Services
      </Link>

      {/* Self-closing link */}
      <Link href="/home" />

      {/* Link with children components */}
      <Link href="/shop">
        <div className="card">
          <h3>Shop Now</h3>
          <p>Browse our products</p>
        </div>
      </Link>

      {/* Link with nested elements */}
      <Link href="/dashboard" className="menu-item">
        <svg className="icon" />
        <span>Dashboard</span>
      </Link>

      {/* Conditional href */}
      <Link href={isAdmin ? '/admin' : '/user'}>
        Panel
      </Link>

      {/* Link with onClick handler */}
      <Link href="/events" onClick={handleClick}>
        Events
      </Link>

      {/* Link with aria attributes */}
      <Link 
        href="/accessibility" 
        aria-label="Accessibility page"
        role="link"
      >
        A11y
      </Link>

      {/* Link with data attributes */}
      <Link href="/analytics" data-track="nav-click" data-category="menu">
        Analytics
      </Link>
    </nav>
  );
}

// Another component with Link
function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <Link href="/privacy">Privacy Policy</Link>
      <Link href="/terms">Terms of Service</Link>
      <Link href={`/archive/${currentYear}`}>
        Archive {currentYear}
      </Link>
    </footer>
  );
}

// Link in a map
function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
