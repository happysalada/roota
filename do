#!/usr/bin/env oil

proc dev() {
  npm run dev
}

proc update_deps() {
  ncu -u
}

proc build() {
  npm run build
}

@ARGV