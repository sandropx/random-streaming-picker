#!/bin/bash
export $(cat .env.local | xargs)
vercel dev --listen 192.168.1.11:3000