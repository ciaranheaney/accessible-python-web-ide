from flask import Flask, request, render_template, jsonify
import requests
import time

app = Flask(__name__)

# Current plan (free) provides 50 submissions per day
JUDGE0_URL = "https://judge0-ce.p.rapidapi.com"

# ** ENTER UNIQUE RAPID API KEY HERE **
RAPIDAPI_KEY = "ec3e448095msh1220bfb94daaccep1f8968jsnf02c6404341d"

HEADERS = {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": RAPIDAPI_KEY,
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
}

PYTHON_LANGUAGE_ID = 71   # Found at https://ce.judge0.com/languages (Python 3.8.1)

MEMORY_LIMIT = 262144     # 256 MB
CPU_TIME_LIMIT = 5        # 5sec
CPU_EXTRA_TIME = 1.0      # 1sec
WALL_TIME_LIMIT = 10      # 10sec


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/run", methods=["POST"])
def run_code():
    # Get code and inputs from frontend
    data = request.json
    code = data.get("code", "")
    user_input = data.get("input", "")

    # Send submission to Judge0 API
    submission_response = requests.post(
        f"{JUDGE0_URL}/submissions?base64_encoded=false&wait=false",
        json = {
            "source_code": code, 
            "language_id": PYTHON_LANGUAGE_ID,
            "stdin": user_input,
            "cpu_time_limit": CPU_TIME_LIMIT,
            "cpu_extra_time": CPU_EXTRA_TIME,
            "wall_time_limit": WALL_TIME_LIMIT,
            "memory_limit": MEMORY_LIMIT,
            "enable_per_process_and_thread_time_limit": True,
            "enable_per_process_and_thread_memory_limit": True,
            "redirect_stderr_to_stdout": True,
            "enable_network": False,
            "number_of_runs": 1
            },
        headers = HEADERS
    )

    token = submission_response.json().get("token")

    # Wait to receive response from API
    while True:
        result_response = requests.get(
            f"{JUDGE0_URL}/submissions/{token}?base64_encoded=false",
            headers = HEADERS
        )
        result = result_response.json()
        if result["status"]["id"] >= 3:
            break
        time.sleep(1)

    # Send API response to frontend
    return jsonify({
        "stdout": result["stdout"],
        "stderr": result["stderr"],
        "time": result["time"],
        "memory": result["memory"],
        "token": result["token"],
        "compile_output": result["compile_output"],
        "message": result["message"],
        "status": {
            "id": result["status"]["id"],
            "description": result["status"]["description"]
        }
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
