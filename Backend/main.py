from fastapi import FastAPI,Query
import asyncio
from prisma import Prisma
from prisma.models import User
from fastapi.middleware.cors import CORSMiddleware
from typing import List


from pydantic import BaseModel

app = FastAPI()

class SignUpModel(BaseModel):
    name: str
    walletaddress: str
    interests: List[str] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# Sign in with wallet address

@app.post("/signinwithwalletaddress")
async def Sign_inwithwalletadress(walletaddress:str):
    prisma = Prisma()
    await prisma.connect()
    existuser = await prisma.user.find_first(where={"walletaddress": walletaddress})
    if existuser:
        await prisma.disconnect()
        return {"message": existuser} 
    return {"message":"user does not exist"}


 ## Create user with new wallet address
@app.post("/signupuserwithaddress")
async def Sign_up(sign_up_data: SignUpModel):
    name = sign_up_data.name
    walletaddress = sign_up_data.walletaddress
    interests = sign_up_data.interests 
    print(interests,name,walletaddress)

  
    prisma = Prisma()
    await prisma.connect()
    existuser = await prisma.user.find_first(where={"walletaddress": walletaddress})
    if existuser:
        await prisma.disconnect()
        return {"message": existuser}

    user = await prisma.user.create(
        {"name": name, "walletaddress": walletaddress, "interests": interests}
    )  
    await prisma.disconnect()  
    return {"Newuser": user}

