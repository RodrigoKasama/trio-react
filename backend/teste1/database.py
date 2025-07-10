# Simulação de usuários
import uuid
users = {
    "joao": {"username": "joao", "password": "123"},
    "ana": {"username": "ana", "password": "456"},
    "parracho@gmail.com": {"username": "parracho@gmail.com", "password": "12345"}
}


parties = {

    str(uuid.uuid4()).split('-')[0]: {
        "host": "joao",
        "party_name": "Festa do João",
        "max_members": 10,
        "guests": [],
        "private": False,
        "passwd": None,
    },
    str(uuid.uuid4()).split('-')[0]: {
        "host": "ana",
        "party_name": "Festa da Ana VIP",
        "max_members": 5,
        "guests": [],
        "private": True,
        "passwd:": "abacate"
    },
    str(uuid.uuid4()).split('-')[0]: {
        "host": "ana",
        "party_name": "Festa da Ana",
        "max_members": 5,
        "guests": [],
        "private": False,
        "passwd:": "abacate"
    }
}
