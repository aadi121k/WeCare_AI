import easyocr
import fitz  # PyMuPDF
import numpy as np
import cv2

reader = easyocr.Reader(["en"], gpu=False)


def extract_text(file_bytes):

    text = ""

    # ---------- Try PDF ----------
    try:
        pdf = fitz.open(stream=file_bytes, filetype="pdf")

        for page in pdf:
            pix = page.get_pixmap(dpi=300)

            img = np.frombuffer(pix.samples, dtype=np.uint8)
            img = img.reshape(pix.height, pix.width, pix.n)

            results = reader.readtext(img)

            for r in results:
                text += r[1] + "\n"

        if text.strip():
            return text

    except Exception:
        pass

    # ---------- Otherwise treat as Image ----------
    image = np.frombuffer(file_bytes, np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    results = reader.readtext(image)

    for r in results:
        text += r[1] + "\n"

    return text