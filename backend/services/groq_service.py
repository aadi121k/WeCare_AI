import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)


def analyze_text(text):

    prompt = f"""
You are an expert medical AI assistant.

Analyze this medical report.

{text}

Give response in this format:

1. Patient Summary
2. Abnormal Values
3. Risk Level
4. Recommended Department
5. Priority
6. Suggested Next Action
7. Simple explanation in easy English.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.3,
    )

    return response.choices[0].message.content