import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./dev.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      price REAL,
      category TEXT,
      description TEXT,
      image TEXT,
      rating REAL
    )`, (err) => {
      if (!err) {
        // Seed data if empty
        db.get("SELECT count(*) as count FROM products", [], (err, row) => {
          if (row && row.count === 0) {
            const seedProducts = [
              { title: "Classic White Sneakers", price: 89.99, category: "footwear", description: "Minimalist design for everyday comfort.", image: "", rating: 4.5 },
              { title: "Leather Crossbody Bag", price: 129.50, category: "accessories", description: "Genuine leather with adjustable strap.", image: "", rating: 4.8 },
              { title: "Wireless Noise-Canceling Headphones", price: 249.00, category: "electronics", description: "Immersive sound with 30h battery life.", image: "", rating: 4.7 },
              { title: "Smart Watch Series 5", price: 199.99, category: "electronics", description: "Track your fitness and stay connected.", image: "", rating: 4.2 },
              { title: "Denim Jacket", price: 75.00, category: "clothing", description: "Vintage wash denim jacket.", image: "", rating: 4.4 },
              { title: "Ceramic Coffee Mug", price: 15.00, category: "home", description: "Handcrafted ceramic mug.", image: "", rating: 4.9 },
              { title: "Sunglasses Aviator", price: 110.00, category: "accessories", description: "Classic aviator style with UV protection.", image: "", rating: 4.3 },
              { title: "Running Shoes", price: 95.00, category: "footwear", description: "Lightweight running shoes for speed.", image: "", rating: 4.6 }
            ];
            const insert = db.prepare("INSERT INTO products (title, price, category, description, image, rating) VALUES (?,?,?,?,?,?)");
            seedProducts.forEach(p => insert.run(p.title, p.price, p.category, p.description, p.image, p.rating));
            insert.finalize();
          }
        });
      }
    });
  }
});

export default db;