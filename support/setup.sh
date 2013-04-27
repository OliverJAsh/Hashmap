#!/bin/bash

# Mac
OS=`uname -s`

# Stop on error
set -e

installNpm() {
  echo Install NPM in $1
  cd $1
  npm install $NPMOPTS
  cd ..
}

installBower() {
  cd $1
  bower install
  cd ..
}

build() {
  cd $1
  grunt build
  cd ..
}

echo Setting up Application
npm install $NPMOPTS
installNpm site
installBower site

echo Building
build site
