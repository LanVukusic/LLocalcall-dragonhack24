#!/bin/bash
python whisper_online_server.py --port 43001 --host localhost --model small.en --language en --min-chunk-size 1 --vad &
python whisper_online_server.py --port 43002 --host localhost --model small.en --language en --min-chunk-size 1 --vad &
python whisper_online_server.py --port 43003 --host localhost --model small.en --language en --min-chunk-size 1 --vad &
python whisper_online_server.py --port 43004 --host localhost --model small.en --language en --min-chunk-size 1 --vad &
