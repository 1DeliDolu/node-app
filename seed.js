require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Product = require("./models/product");
const Category = require("./models/category");
const User = require("./models/user");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/node-app";

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  // Temizle
  await Product.deleteMany({});
  await Category.deleteMany({});
  console.log("Cleared existing products and categories");

  // Admin user — yoksa oluştur
  let admin = await User.findOne({ email: "admin@demo.com" });
  if (!admin) {
    const hashed = await bcrypt.hash("Admin1234!", 10);
    admin = await User.create({
      name: "Admin",
      email: "admin@demo.com",
      password: hashed,
      isAdmin: true,
      cart: { items: [] },
    });
    console.log("Admin user created → admin@demo.com / Admin1234!");
  } else {
    console.log("Admin user already exists → admin@demo.com");
  }

  // Kategoriler
  const [electronics, clothing, books, sports, home] =
    await Category.insertMany([
      { name: "Electronics", description: "Phones, laptops and more" },
      { name: "Clothing", description: "T-shirts, jackets and more" },
      { name: "Books", description: "Fiction, non-fiction and more" },
      { name: "Sports", description: "Fitness and outdoor gear" },
      { name: "Home & Garden", description: "Furniture and decor" },
    ]);
  console.log("Categories created");

  // Mevcut resimler
  const images = ["1.jpg", "3.jpg", "4.jpg", "slider1.png", "slider2.png"];

  const products = [
    {
      name: "wireless headphones",
      price: 299,
      description:
        "Premium sound quality with active noise cancellation and 30h battery life.",
      imageUrl: images[0],
      userId: admin._id,
      isActive: true,
      tags: ["elektronik", "ses", "bluetooth"],
      categories: [electronics._id],
    },
    {
      name: "classic leather jacket",
      price: 499,
      description:
        "Genuine leather biker jacket with quilted lining, perfect for all seasons.",
      imageUrl: images[1],
      userId: admin._id,
      isActive: true,
      tags: ["giyim", "deri", "mont"],
      categories: [clothing._id],
    },
    {
      name: "javascript the good parts",
      price: 89,
      description:
        "The definitive guide to writing better JavaScript by Douglas Crockford.",
      imageUrl: images[2],
      userId: admin._id,
      isActive: true,
      tags: ["kitap", "programlama", "javascript"],
      categories: [books._id],
    },
    {
      name: "yoga mat premium",
      price: 149,
      description: "Non-slip 6mm thick eco-friendly yoga mat with carry strap.",
      imageUrl: images[3],
      userId: admin._id,
      isActive: true,
      tags: ["spor", "yoga", "fitness"],
      categories: [sports._id],
    },
    {
      name: "modern desk lamp",
      price: 199,
      description:
        "LED desk lamp with 5 brightness levels, USB charging port and touch control.",
      imageUrl: images[4],
      userId: admin._id,
      isActive: true,
      tags: ["ev", "dekor", "aydınlatma"],
      categories: [home._id],
    },
  ];

  await Product.insertMany(products);
  console.log("5 demo products created");

  console.log("\n✓ Seed completed!");
  console.log("  → http://localhost:3000/products");
  console.log("  → Admin login: admin@demo.com / Admin1234!");

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
