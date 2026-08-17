#!/usr/bin/env python3
"""Static server for Horizon Attendance on http://localhost:5500"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parent
os.chdir(ROOT)
PORT = int(os.environ.get("PORT", "5500"))


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        print("[%s] %s" % (self.log_date_time_string(), fmt % args))


if __name__ == "__main__":
    httpd = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print("Horizon Attendance running at http://localhost:%s" % PORT)
    print("Open index.html via that URL so IndexedDB can keep 6 months of rolls.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
