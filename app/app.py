from flask import Flask, request, render_template, jsonify
import requests
import time

app = Flask(__name__)

# Current plan (free) provides 50 submissions per day

JUDGE0_URL = "https://judge0-ce.p.rapidapi.com"
#JUDGE0_URL = "http://10.24.119.203:2358" TESTING FOR HOSTING LOCALLY

# ** ENTER UNIQUE RAPID API KEY HERE **
RAPIDAPI_KEY = "aa32f181a6mshbb21d201dc72ca3p1e8658jsne9f8b47564b0"

HEADERS = {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": RAPIDAPI_KEY,
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
}

PYTHON_LANGUAGE_ID = 71   # Found at https://ce.judge0.com/languages (Python 3.8.1)

MEMORY_LIMIT = 64000      # 64kb
CPU_TIME_LIMIT = 2        # 1sec
CPU_EXTRA_TIME = 0.5      # 0.5sec
WALL_TIME_LIMIT = 5       # 5sec


@app.route("/")
def index():
    return render_template("index.html")



@app.route("/run", methods=["POST"])
def run_code():
    # Get code and inputs from frontend
    data = request.json
    code = data.get("code", "")
    user_input = data.get("input", "")
    headers = {"Content-Type": "applications/json"}

    # Send submission to Judeg0 API
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
    print(token)
    # headers["X-Auth-User"] = token TESTING FOR HOSTING LOCALLY

    # Wait to recieve response from API
    while True:
        result_response = requests.get(
            f"{JUDGE0_URL}/submissions/{token}?base64_encoded=false",
            headers = HEADERS
        )
        result = result_response.json()
        if result["status"]["id"] >= 3:
            break
        time.sleep(1)

    print(result)

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








    # NOT CURRENT
    # result = subprocess.run(
    #     ['python3', '-c', code],
    #     input = user_input,
    #     capture_output=True, 
    # )

    # output = result.stdout.decode() + result.stderr.decode()
    # return jsonify({"output": output})


    # CURRENT IN USE
    # proc = subprocess.run(
    #     [sys.executable, "./sandbox.py", code, user_input],
    #     stdout=subprocess.PIPE,
    #     stderr=subprocess.PIPE,
    #     env={
    #         "PATH": os.environ.get("PATH"),
    #     },
    # )

    # NOT CURRENT
    # extra = ""
    # try:
    #     stdout, stderr = proc.communicate(code, timeout=5)
    # except subprocess.TimeoutExpired:
    #     extra = "process timed out"
    #     proc.kill()
    #     stdout, stderr = proc.communicate()

    # output = proc.stdout.decode() + proc.stderr.decode()

    # return jsonify({"output": output})


if __name__ == "__main__":
    # app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
    app.run(host="0.0.0.0", port=5000, debug=True)
