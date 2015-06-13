#!/usr/bin/env bash

BINPATH=$(cd `dirname $0`; pwd)
IMAGE_FOLDER="${BINPATH}/assets/image/speakers/"
DIST_FOLDER="$IMAGE_FOLDER"

# Resize all images to 180x180
mogrify -resize 180x180 ${IMAGE_FOLDER}*

# Improve performance setting the quality to 75
mogrify -quality 75 ${IMAGE_FOLDER}*.jpg
mogrify -quality 75 ${IMAGE_FOLDER}*.jpeg
mogrify -quality 75 ${IMAGE_FOLDER}*.JPG
mogrify -quality 3 ${IMAGE_FOLDER}*.png

# Success logging
printf "$(tput setaf 76)✔ %s$(tput sgr0)\n" "Imagens otimizadas com sucesso."
