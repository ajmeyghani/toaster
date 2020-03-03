#!/bin/bash
function clean() {
  rm -rf themes;
}

function setup() {
  mkdir themes;
}

function prethemes() {
  clean;
  setup;
}

function themes() {
  prethemes;
  cp src/base.css themes/
  cp src/animations.css themes/
  cat src/default.css src/animations.css src/base.css >> themes/theme-default.css;
}

function cssmin() {
  themes;
  npx cleancss -o themes/base.min.css themes/base.css;
  npx cleancss -o themes/animations.min.css themes/animations.css;
  npx cleancss -o themes/theme-default.min.css themes/theme-default.css;
}

$1
