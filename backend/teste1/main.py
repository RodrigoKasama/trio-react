from fastapi import FastAPI, Depends, Form
from fastapi.responses import JSONResponse
from auth import get_current_user, authenticate_user, create_access_token
from party import router as party_router
from fastapi.middleware.cors import CORSMiddleware
from payload_defs import UserLogin


app = FastAPI()

origins = [
	"http://localhost:5173",  # Frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(party_router)

@app.post("/login")
async def login(user_payload: UserLogin):
	
    user = authenticate_user(user_payload.username, user_payload.password)
    if not user:
        return JSONResponse(status_code=401, content={"detail": "Credenciais inválidas"})
    
    access_token = create_access_token(data={"sub": user})
    
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/")
async def root():
	return {"message": "Bem-vindo à API de Partys!"}