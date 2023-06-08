#!/bin/sh

echo ">> Building contract"

near-sdk-js build src/resume.ts build/resume.wasm
