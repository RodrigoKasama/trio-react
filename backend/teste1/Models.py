from pydantic import BaseModel


class Login_Payload(BaseModel):
    username: str
    password: str

class User(BaseModel):
    username: str
    password: str
    n_games: int = 0
