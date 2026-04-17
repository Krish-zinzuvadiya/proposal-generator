from flask import Flask, request, send_file
from flask_cors import CORS
from docxtpl import DocxTemplate, InlineImage
from docx.shared import Mm
from datetime import datetime
import os
import uuid

app = Flask(__name__)
CORS(app)


# ===============================
# 🔹 HELPERS
# ===============================

def safe_get(data, key, default=""):
    """Safe getter to avoid None issues"""
    return data.get(key) if data.get(key) is not None else default


def clean_filename(name):
    """Clean company name for file download"""
    return "".join(c if c.isalnum() or c == " " else "" for c in name).strip()


def handle_logo(doc):
    """Handle logo upload safely"""
    if 'logo' not in request.files:
        return None, None

    image = request.files['logo']

    if not image or image.filename == "":
        return None, None

    temp_name = f"temp_logo_{uuid.uuid4().hex}.png"
    image.save(temp_name)

    return InlineImage(doc, temp_name, width=Mm(40)), temp_name


# ===============================
# 🔹 MAIN ROUTE
# ===============================

@app.route('/generate', methods=['POST'])
def generate():

    doc = DocxTemplate("template.docx")
    data = request.form

    # 🔹 LOGO
    logo, temp_logo_path = handle_logo(doc)

    # ===============================
    # 🔹 BASE CONTEXT
    # ===============================
    context = {
        "client_name": safe_get(data, "client_name"),
        "client_company": safe_get(data, "client_company"),
        "your_name": safe_get(data, "your_name"),
        "date": datetime.now().strftime("%d %B %Y"),

        "business_model_para1": safe_get(data, "business_model_para1"),
        "business_model_para2": safe_get(data, "business_model_para2"),

        "future_vision": safe_get(data, "future_vision"),
        "strategic_para": safe_get(data, "strategic_para"),

        "pricing": safe_get(data, "pricing"),
        "validity": safe_get(data, "validity"),

        "post": safe_get(data, "post"),
        "reel": safe_get(data, "reel"),
        "story": safe_get(data, "story"),

        "logo": logo
    }

    # ===============================
    # 🔹 CORE OFFERINGS
    # ===============================
    for i in range(1, 8):
        context[f"cp{i}"] = safe_get(data, f"cp{i}")

    # ===============================
    # 🔹 TARGET
    # ===============================
    for i in range(1, 7):
        context[f"tp{i}"] = safe_get(data, f"tp{i}")

    # ===============================
    # 🔹 CURRENT POSITIONING
    # ===============================
    for i in range(1, 5):
        context[f"current{i}"] = safe_get(data, f"current{i}")

    # ===============================
    # 🔹 STRENGTHS
    # ===============================
    for i in range(1, 5):
        context[f"strengths_bold{i}"] = safe_get(data, f"strengths_bold{i}")
        context[f"strengths{i}"] = safe_get(data, f"strengths{i}")

    # ===============================
    # 🔹 GROWTH
    # ===============================
    for i in range(1, 6):
        context[f"growth{i}"] = safe_get(data, f"growth{i}")

    # ===============================
    # 🔹 CONTENT PILLARS
    # ===============================
    for i in range(1, 6):
        context[f"cp{i}_bold"] = safe_get(data, f"cp{i}_bold")
        context[f"pillar{i}"] = safe_get(data, f"pillar{i}")

    # ===============================
    # 🔹 MONTH STRATEGY
    # ===============================
    for i in range(1, 13):
        context[f"f{i}"] = safe_get(data, f"f{i}")
        context[f"o{i}"] = safe_get(data, f"o{i}")
        context[f"ci{i}"] = safe_get(data, f"ci{i}")
        context[f"sr{i}"] = safe_get(data, f"sr{i}")

    # ===============================
    # 🔹 RENDER DOCUMENT
    # ===============================
    doc.render(context)

    temp_doc = f"proposal_{uuid.uuid4().hex}.docx"
    doc.save(temp_doc)

    # ===============================
    # 🔹 CLEAN FILE NAME
    # ===============================
    company = safe_get(data, "client_company", "Client")
    safe_name = clean_filename(company)

    download_name = f"Complete Branding & Marketing Proposal for {safe_name} V1.0.docx"

    # ===============================
    # 🔹 CLEANUP FUNCTION
    # ===============================
    def cleanup():
        try:
            if temp_logo_path and os.path.exists(temp_logo_path):
                os.remove(temp_logo_path)
            if os.path.exists(temp_doc):
                os.remove(temp_doc)
        except Exception as e:
            print("Cleanup error:", e)

    # ===============================
    # 🔹 SEND FILE
    # ===============================
    response = send_file(temp_doc, as_attachment=True, download_name=download_name)

    # Cleanup after sending
    cleanup()

    return response


# ===============================
# 🔹 RUN
# ===============================
if __name__ == "__main__":
    app.run(debug=True)