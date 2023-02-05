from fastapi import APIRouter, Response
from helpers import image
from pydantic import BaseModel
from openai.error import InvalidRequestError

router = APIRouter(
    prefix="/api",
)


class ImagePrompt(BaseModel):
    prompt: str


@router.post("/create_image/")
def create_image(body: ImagePrompt, response: Response):
    try:
        prompt = body.prompt
        print(f"Generating image for prompt: {prompt}")
        image_url = image.create_image(prompt)
        return {"url": image_url}
    except InvalidRequestError as e:
        print(e)
        response.status_code = 400
        return {"error": e}
