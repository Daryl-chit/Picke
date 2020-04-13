#!/bin/bash
cd ios
rm -rf ./Podfile.lock ./build ./Pods
pod deintegrate
pod clean
cd ..
