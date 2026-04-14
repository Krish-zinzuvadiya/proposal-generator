from flask import Flask, request, send_file
from flask_cors import CORS
from docxtpl import DocxTemplate, InlineImage
from docx.shared import Mm
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)


@app.route('/generate', methods=['POST'])
def generate():
    doc = DocxTemplate("template.docx")

    # 🔹 GET FORM DATA
    data = request.form

    # 🔹 HANDLE LOGO UPLOAD
    logo = None
    if 'logo' in request.files:
        image = request.files['logo']

        if image and image.filename != "":
            image_path = "temp_logo.png"
            image.save(image_path)

            # Resize logo (adjust size here)
            logo = InlineImage(doc, image_path, width=Mm(40))

    # 🔹 BASE CONTEXT
    context = {
        "client_name": data.get("client_name"),
        "client_company": data.get("client_company"),
        "your_name": data.get("your_name"),
        "date": datetime.now().strftime("%d %B %Y"),

        "business_model_para1": data.get("business_model_para1"),
        "business_model_para2": data.get("business_model_para2"),

        "future_vision": data.get("future_vision"),
        "strategic_para": data.get("strategic_para"),

        "pricing": data.get("pricing"),
        "post": data.get("post"),
        "reel": data.get("reel"),
        "story": data.get("story"),

        "logo": logo
    }

    # 🔹 CORE OFFERINGS
    for i in range(1, 8):
        context[f"cp{i}"] = data.get(f"cp{i}")

    # 🔹 TARGET
    for i in range(1, 7):
        context[f"tp{i}"] = data.get(f"tp{i}")

    # 🔹 CURRENT POSITIONING
    for i in range(1, 5):
        context[f"current{i}"] = data.get(f"current{i}")

    # 🔹 STRENGTHS
    for i in range(1, 5):
        context[f"strengths_bold{i}"] = data.get(f"strengths_bold{i}")
        context[f"strengths{i}"] = data.get(f"strengths{i}")

    # 🔹 GROWTH
    for i in range(1, 6):
        context[f"growth{i}"] = data.get(f"growth{i}")

    # 🔹 CONTENT PILLARS
    for i in range(1, 6):
        context[f"cp{i}_bold"] = data.get(f"cp{i}_bold")
        context[f"pillar{i}"] = data.get(f"pillar{i}")

    # 🔹 MONTH STRATEGY
    for i in range(1, 13):
        context[f"f{i}"] = data.get(f"f{i}")
        context[f"o{i}"] = data.get(f"o{i}")
        context[f"ci{i}"] = data.get(f"ci{i}")
        context[f"sr{i}"] = data.get(f"sr{i}")

    # 🔹 RENDER DOC
    doc.render(context)

    file_name = "Generated_Proposal.docx"
    doc.save(file_name)

    # 🔹 CLEAN TEMP IMAGE
    if os.path.exists("temp_logo.png"):
        os.remove("temp_logo.png")

    # 🔥 UPDATED DOWNLOAD NAME ONLY
    client_company = data.get("client_company", "Client")

    safe_name = "".join(
        c if c.isalnum() or c == " " else "" for c in client_company
    ).strip()

    download_name = f"Complete Branding & Marketing Proposal for {safe_name} V1.0.docx"

    return send_file(file_name, as_attachment=True, download_name=download_name)


if __name__ == "__main__":
    app.run(debug=True)