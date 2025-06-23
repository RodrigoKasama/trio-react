from fastapi import FastAPI, Depends, Form
from fastapi.responses import JSONResponse
from auth import get_current_user, authenticate_user, create_access_token
from party import router as party_router
import token_route

app = FastAPI()
app.include_router(party_router)

@app.post("/login")
async def login(username: str = Form(), password: str = Form()):
    user = authenticate_user(username, password)
    if not user:
        return JSONResponse(status_code=401, content={"detail": "Credenciais inválidas"})
    access_token = create_access_token(data={"sub": username})
    
    # Envia para o frontend um token para futuros acessos
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/")
async def root():
	return {"message": "Bem-vindo à API de Partys!"}