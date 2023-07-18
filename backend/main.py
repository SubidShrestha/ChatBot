from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chatbot import predict_class, get_response,intents
from pydantic import BaseModel

class Message(BaseModel):
    message :str
    sender :str

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/api/chat/')
async def chat(text : Message):
    ints = predict_class(text.message)
    res = get_response(ints, intents)
    response = {
        'sender' : 'Chatbot',
        'msg' : res
    }
    return response
