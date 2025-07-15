from fastapi import Depends, HTTPException
from database import users
from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse

from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer

from fastapi.middleware.cors import CORSMiddleware
from Models import Login_Payload

from database import parties

app = FastAPI()

SECRET_KEY = "chave-secreta-super-segura"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

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


def authenticate_user(username: str, password: str):
    user = users.get(username)
    if not user or user["password"] != password:
        return None
    return user


def create_access_token(data: dict, expires_delta=None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + \
        (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub", None)
        print(f"Payload decodificado: {payload}")
        if username is None:
            raise HTTPException(status_code=401, detail="Token inválido")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")


@app.post("/login")
async def login(user_payload: Login_Payload):

    user = authenticate_user(user_payload.username, user_payload.password)
    if not user:
        return JSONResponse(status_code=401, content={"detail": "Credenciais inválidas"})

    access_token = create_access_token(data={"sub": user})

    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/")
async def root():
    return {"message": "Bem-vindo à API de Partys!"}


@app.get("/parties")
def get_parties():
    # def get_parties(username: str = Depends(get_current_user)):
    # print(f"Usuário atual: {username}")
    
    
    
    parties_list = {
        key: {"party_name": party_info["party_name"],
              "max_members": party_info["max_members"],
              "is_private": party_info["private"],
              "players": party_info["conn_players"],
              }
        for key, party_info in parties.items()
    }

    return {"avaliable_parties":parties_list}
