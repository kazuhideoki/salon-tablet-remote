#!/bin/sh

mkdir $HOME/secrets

gpg --quiet --batch --yes --decrypt --passphrase="$GCP_CREDENTIALS" \
--output $HOME/secrets/gcp_credentials.json gcp_credentials.json.gpg