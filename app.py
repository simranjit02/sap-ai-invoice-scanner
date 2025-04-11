from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import io

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/scan-invoice": {"origins": "*"}})


@app.route("/scan-invoice", methods=["POST"])
def scan_invoice():
    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read()))
    text = pytesseract.image_to_string(image)

    # Dummy extracted data for now
    data = {
        "vendor": "Dummy Vendor",
        "invoiceNumber": "123456",
        "date": "2025-04-10",
        "amount": "$512.99",
        "raw_text": text
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
