#!/usr/bin/env bash

# Install dependencies
npm install

# Apply migration
npx prisma migrate deploy
