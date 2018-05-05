#!/bin/bash -e

# Install npm dependencies inside the mounted volume,
# doing npm modules cache between Docker builds
npm install

# Run the app in dev mode
exec npm start
