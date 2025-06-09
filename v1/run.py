from flask import Flask, request, render_template, jsonify
import subprocess
import tempfile
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/run", methods=["POST"])
def run_code():
    code = request.json.get("code", "")
    data = request.json
    code = data.get("code", "")
    user_input = data.get("input", "")
    try:
        with tempfile.NamedTemporaryFile(mode="w+", suffix=".py", delete=False) as tmp:
            tmp.write(code)
            tmp.flush()
            result = subprocess.run(
                ["python3", tmp.name],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=5
            )
        output = result.stdout.decode() + result.stderr.decode()
    except subprocess.TimeoutExpired:
        output = "Error: Code execution timed out."

    return jsonify({"output": output})


if __name__ == "__main__":
    app.run(debug=True)
