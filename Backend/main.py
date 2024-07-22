from fastapi import FastAPI,Query
import asyncio
from prisma import Prisma
from prisma.models import User
from pydantic import BaseModel

app = FastAPI()
class SignInRequest(BaseModel):
    name: str


@app.post("/signinwithwalletaddress")
async def Sign_inwithwalletadress(walletaddress:str):
    prisma = Prisma()
    await prisma.connect()
    existuser = await prisma.user.find_first(where={"walletaddress": walletaddress})
    if existuser:
        await prisma.disconnect()
        return {"message": existuser} 
    return {"message":"user does not exist"}

@app.post("/signupuserwithaddress")
async def Sign_up(name:str,walletaddress:str):
    prisma = Prisma()
    await prisma.connect()
    existuser = await prisma.user.find_first(where={"walletaddress": walletaddress})
    if existuser:
        await prisma.disconnect()
        return {"message": existuser}

    user = await prisma.user.create(
        {"name": name, "walletaddress": walletaddress}
    )  
    await prisma.disconnect()  
    return {"Newuser": user}

