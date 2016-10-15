#!/bin/bash

echo "Installing Spop Dependencies"
sudo apt-get update
#sudo apt-get -y install libao-dev libglib2.0-dev libjson-glib-1.0-0 libjson-glib-dev libao-common libasound2-dev libreadline-dev libsox-dev libsoup2.4-dev libsoup2.4-1 libdbus-glib-1-dev libnotify-dev --no-install-recommends

#echo "Setting up autoplay to CLASSICFM_SC"
#https://volumio.org/forum/autoplay-startup-t3420.html
#echo "(sleep 25; mpc clear; mpc add http://8503.live.streamtheworld.com:443/CLASSICFM_SC; mpc volume 25; mpc play )&" >> /etc/rc.local

#requred to end the plugin install
echo "plugininstallend"
