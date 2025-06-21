from app.database import SessionLocal

try:
    db = SessionLocal()
    db.execute("SELECT 1")
    print("✅ Connexion à la base de données réussie")
except Exception as e:
    print("❌ Erreur de connexion :", e)
finally:
    db.close()
