from fastapi import FastAPI
import asyncio
import httpx
from contextlib import asynccontextmanager

from config import BACKEND_PING_URL

app = FastAPI()

@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(cyclic_func())
    yield
    task.cancel()

async def cyclic_func():
    while True:
        try:
            async with httpx.AsyncClient() as client:
                res = await client.get(BACKEND_PING_URL)
                if (res.status_code != 201):
                    print("[log] Success")
                else:
                    print("[log] Failure")
                await asyncio.sleep(900)  # 15 minutes
        except Exception as e:
            print(f"Error in cyclic_func: {e}")
            await asyncio.sleep(60)  # wait a minute before retrying

app = FastAPI(lifespan=lifespan)
