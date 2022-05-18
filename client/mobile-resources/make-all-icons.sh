#!/bin/bash

cd "$(dirname "$0")"

grn=$'\e[1;32m'
end=$'\e[0m'

clear

printf "\n"
printf "%s\n" "Making iOS icons...${grn}"

cordova-res ios \
  --skip-config \
  --copy \
  --resources ./ \
  --icon-source icon-ios.png \
  --splash-source splash.png \
  --ios-project ../ios

printf "\n"
printf "%s\n" "${end}Making Android icons...${grn}"

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
