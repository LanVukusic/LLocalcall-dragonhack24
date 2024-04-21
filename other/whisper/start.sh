#!/bin/bash

OPENAI_API_KEY=sk-proj- python whisper_online_server.py --backend openai-api --port 43001 --host 0.0.0.0 --language en --min-chunk-size 5 --vad &
OPENAI_API_KEY=sk-proj- python whisper_online_server.py --backend openai-api --port 43002 --host 0.0.0.0 --language en --min-chunk-size 5 --vad &
# python whisper_online_server.py --port 43003 --host 0.0.0.0 --model small.en --language en --min-chunk-size 1 --vad &
# python whisper_online_server.py --port 43004 --host 0.0.0.0 --model small.en --language en --min-chunk-size 1 --vad &
