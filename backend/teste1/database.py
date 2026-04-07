# Simulação de usuários
import uuid
users = {
    "joao": {"username": "joao", "password": "123", "n_games": 1},
    "ana": {"username": "ana", "password": "456", "n_games": 12},
    "parracho@gmail.com": {"username": "parracho@gmail.com", "password": "12345", "n_games": 14}
}


party_templates = [
    {
        "host": "joao",
        "party_name": "Festa do João",
        "max_members": 10,
        "conn_players": 3,
        "guests": [],
        "private": False,
        "passwd": None,
    },
    {
        "host": "ana",
        "party_name": "Festa da Ana VIP",
        "max_members": 5,
        "conn_players": 3,
        "guests": [],
        "private": True,
        "passwd": "abacate",
    },
    {
        "host": "ana",
        "party_name": "Festa da Ana",
        "max_members": 5,
        "conn_players": 3,
        "guests": [],
        "private": False,
        "passwd": "abacate",
    },
]

parties = {str(uuid.uuid4()).split('-')[0]: party for party in party_templates}
