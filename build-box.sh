#!/usr/env sh

# build box
#
#  - git
#  - node/npm
#  - mariadb

# git

cd ~/

sudo apt-get install -y libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev build-essential

sudo apt-get update

sudo apt-get install -y git-core

sudo apt-get update

wget https://git-core.googlecode.com/files/git-1.8.1.2.tar.gz

tar -zxf git-1.8.1.2.tar.gz

cd git-1.8.1.2

mkdir bin

./configure

./make all

./make install

# node/npm

cd ~/

wget http://nodejs.org/dist/v0.10.28/node-v0.10.28-linux-x86.tar.gz

tar -zxf node-v0.10.28-linux-x86.tar.gz

# mariadb

cd ~/

sudo apt-get update

sudo apt-get install software-properties-common

sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xcbcb082a1bb943db

sudo add-apt-repository 'deb http://ftp.osuosl.org/pub/mariadb/repo/10.0/ubuntu trusty main'

sudo apt-get update

sudo apt-get install mariadb-server

echo ""
echo " --> Make sure to add node/npm to path <--"
echo ""