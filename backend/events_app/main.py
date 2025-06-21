
from fastapi import FastAPI
from app.api import auth_routes, client_routes, admin_routes

app = FastAPI()

app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(client_routes.router, prefix="/client", tags=["Client"])
app.include_router(admin_routes.router, prefix="/admin", tags=["Admin"])


