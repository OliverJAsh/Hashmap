#!/bin/bash

trap 'killall' INT

killall() {
  trap '' INT TERM     # ignore INT and TERM while shutting down
  echo "**** Shutting down... ****"     # added double quotes
  kill -TERM 0         # fixed order, send TERM not INT
  wait
  echo DONE
  exit
}

startNode() {
  cd $1
  nodemon -d 0 app.js &
  cd ..
}

startNode site

# Wait forever
cat
