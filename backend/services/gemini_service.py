import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def analyze_report_image(file_bytes, mime_type):
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            types.Part.from_bytes(
                data=file_bytes,
                mime_type=mime_type,
            ),
            """
You are an experienced medical AI assistant.

Analyze this medical report and provide:

1. Patient Summary
2. Abnormal Values
3. Risk Level (Low / Moderate / High)
4. Recommended Department
5. Priority
6. Suggested Next Action
7. Simple Explanation for the patient

Keep the response easy to understand.
"""
        ]
    )

    return response.text