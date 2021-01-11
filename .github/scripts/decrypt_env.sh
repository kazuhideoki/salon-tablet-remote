#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$ENV_CREDENTIALS" \
--output .env .env.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$ENV_CREDENTIALS" \
--output .env.test .env.test.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$ENV_CREDENTIALS" \
--output .env.production .env.production.gpg