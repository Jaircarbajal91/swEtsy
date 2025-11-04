#!/usr/bin/env python3
"""Script to reseed products with updated data"""
from app import app
from app.models import db
from app.seeds.products import undo_products, seed_products

with app.app_context():
    print("🗑️  Clearing existing products...")
    undo_products()
    print("✅ Products cleared")
    
    print("🌱 Seeding products with updated data...")
    seed_products()
    print("✅ Products reseeded successfully!")
    
    print("\n✨ All done! Your products now have unique images and varied prices.")

