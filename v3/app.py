from flask import Flask, request, render_template, jsonify
import subprocess
import tempfile
import os
import sys


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/run", methods=["POST"])
def run_code():
    data = request.json
    code = data.get("code", "")
    # user_input = data.get("input", "")

    # try:
    #     with tempfile.NamedTemporaryFile(mode="w+", suffix=".py", delete=False) as tmp:
    #         tmp.write(code)
    #         tmp.flush()
    #         result = subprocess.run(
    #             ["python3", tmp.name],
    #             stdout=subprocess.PIPE,
    #             stderr=subprocess.PIPE,
    #             timeout=5
    #         )
    #     output = result.stdout.decode() + result.stderr.decode()
    # except subprocess.TimeoutExpired:
    #     output = "Error: Code execution timed out."


    # Run a subprocess of the sandbox and pass the code as a parameter
    proc = subprocess.Popen(
        [sys.executable, "./sandbox.py", code],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env={
            "PATH": os.environ.get("PATH"),
        },
    )

    extra = ""
    try:
        stdout, stderr = proc.communicate(code, timeout=5)
    except subprocess.TimeoutExpired:
        extra = "process timed out"
        proc.kill()
        stdout, stderr = proc.communicate()

    output = stdout.decode() + stderr.decode() + extra

    return jsonify({"output": output})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
