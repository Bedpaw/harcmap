#!/bin/bash

# Set start script dir
cd "$(dirname "$0")"

# Colors for console output texts
green=$'\e[1;32m'
end=$'\e[0m'

clear

printf "\n"
printf "%s\n" "Making iOS icons...${green}"

# Generate and copy iOS icons and splash screens from mobile-resources
cordova-res ios \
  --skip-config \
  --copy \
  --resources ./ \
  --icon-source icon-ios.png \
  --splash-source splash.png \
  --ios-project ../ios

printf "\n"
printf "%s\n" "${end}Making Android icons...${green}"

# Generate and copy Android icons and splash screens from mobile-resources
cordova-res android \
  --skip-config \
  --copy \
  --resources ./ \
  --icon-source icon-android.png \
  --splash-source splash.png \
  --icon-foreground-source icon-android.png \
  --icon-background-source icon-android.png \
  --android-project ../android

printf "\nAll done!\n"
