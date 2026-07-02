from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from services.ocr_service import extract_text
from services.groq_service import analyze_text

app = FastAPI(title="WeCare AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "WeCare AI Backend Running 🚀"
    }


@app.post("/analyze-report")
async def analyze_report(file: UploadFile = File(...)):

    file_bytes = await file.read()

    extracted_text = extract_text(file_bytes)

    if extracted_text.strip() == "":
        return {
            "analysis": "No readable text found in this report."
        }

    analysis = analyze_text(extracted_text)

    return {
        "analysis": analysis
    }