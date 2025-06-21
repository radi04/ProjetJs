from app.database import engine
from app.models import Base

print("Création des tables...")
Base.metadata.create_all(bind=engine)
print("✅ Tables créées avec succès !")
