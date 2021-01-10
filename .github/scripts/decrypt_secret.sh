#!/bin/sh

# Decrypt the file
mkdir $HOME/secrets
# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="2356Gp!p?p" \
--output $HOME/secrets/gcp_credentials.json gcp_credentials.json.gpg