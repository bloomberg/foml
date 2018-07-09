#!/bin/bash
set -e # exit with nonzero exit code if anything fails

## TODO migrate to gulp probably

# clear and re-create the out directory
rm -f index.html
rm -rf styles/*.css

npm run build-in-place

mkdir -p out/styles
cp index.html favicon.ico out/
cp styles/*.css out/styles/

cp -r images fonts scripts out/

echo ""
find out/ -print
echo ""
