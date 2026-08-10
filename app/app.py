import os
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, request, render_template, jsonify
import requests

# Load .env for local/Docker; on Vercel, env vars come from the project settings.
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_DIR = BASE_DIR / "public"

app = Flask(
    __name__,
    template_folder=str(Path(__file__).resolve().parent / "templates"),
    # Local/Docker: serve assets from public/. On Vercel, public/ is served by the CDN.
    static_folder=str(PUBLIC_DIR),
    static_url_path="",
)

JUDGE0_URL = os.environ.get("JUDGE0_URL", "https://judge0-ce.p.rapidapi.com")
JUDGE0_HOST = os.environ.get("JUDGE0_HOST", "judge0-ce.p.rapidapi.com")
RAPIDAPI_KEY = os.environ.get("RAPIDAPI_KEY", "")

PYTHON_LANGUAGE_ID = 71  # Python 3.8.1 — https://ce.judge0.com/languages

MEMORY_LIMIT = 262144  # 256 MB
CPU_TIME_LIMIT = 5  # 5sec
CPU_EXTRA_TIME = 1.0  # 1sec
WALL_TIME_LIMIT = 10  # 10sec


def _judge0_headers():
    return {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": JUDGE0_HOST,
    }


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/run", methods=["POST"])
def run_code():
    if not RAPIDAPI_KEY:
        return jsonify({
            "stdout": None,
            "stderr": "Server misconfigured: RAPIDAPI_KEY is not set.",
            "status": {"id": -1, "description": "Configuration Error"},
        }), 500

    data = request.json or {}
    code = data.get("code", "")
    user_input = data.get("input", "")

    # wait=true avoids a long polling loop (important on Vercel serverless timeouts).
    submission_response = requests.post(
        f"{JUDGE0_URL}/submissions?base64_encoded=false&wait=true",
        json={
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
            "number_of_runs": 1,
        },
        headers=_judge0_headers(),
        timeout=55,
    )

    if submission_response.status_code >= 400:
        return jsonify({
            "stdout": None,
            "stderr": f"Judge0 error ({submission_response.status_code}): {submission_response.text}",
            "status": {"id": -1, "description": "Judge0 Request Failed"},
        }), 502

    result = submission_response.json()

    return jsonify({
        "stdout": result.get("stdout"),
        "stderr": result.get("stderr"),
        "time": result.get("time"),
        "memory": result.get("memory"),
        "token": result.get("token"),
        "compile_output": result.get("compile_output"),
        "message": result.get("message"),
        "status": {
            "id": (result.get("status") or {}).get("id"),
            "description": (result.get("status") or {}).get("description"),
        },
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8888)), debug=True)
