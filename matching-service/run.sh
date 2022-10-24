#!/bin/bash
set -e

npx sequelize db:migrate  
npm start