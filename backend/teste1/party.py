from typing import Dict, List
from fastapi import APIRouter, Depends
from auth import get_current_user
from database import parties

router = APIRouter()

# Armazenamento em memória (substitua por banco depois)
# parties: Dict[str, List[str]] = {}


@router.post("/create_party/{party_id}")
def create_party(party_id: str, username: str = Depends(get_current_user)):
    if party_id in parties:
        raise HTTPException(status_code=400, detail="Party já existe")
    parties[party_id] = [username]
    return {"msg": f"Party {party_id} criada por {username}"}

@router.post("/join_party/{party_id}")
def join_party(party_id: str, username: str = Depends(get_current_user)):
    if party_id not in parties:
        raise HTTPException(status_code=404, detail="Party não encontrada")
    if username not in parties[party_id]:
        parties[party_id].append(username)
    return {"msg": f"{username} entrou na party {party_id}"}

@router.get("/party_members/{party_id}")
def party_members(party_id: str, username: str = Depends(get_current_user)):
    if party_id not in parties:
        raise HTTPException(status_code=404, detail="Party não encontrada")
    return {"members": parties[party_id]}
