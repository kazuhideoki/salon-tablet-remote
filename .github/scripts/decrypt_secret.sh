#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$ENV_CREDENTIALS" \
--output firebase_secret.json firebase_secret.json.gpg
