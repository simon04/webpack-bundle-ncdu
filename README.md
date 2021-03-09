# webpack-bundle-ncdu

Analyses [webpack bundle stats](https://webpack.js.org/guides/code-splitting/#bundle-analysis) using the ncurses tool [ncdu](https://dev.yorhel.nl/ncdu).

## Usage

```sh
webpack --json | node webpack-ncdu.js | ncdu -f-
```

```
ncdu 1.15.1 ~ Use the arrow keys to navigate, press ? for help
--- /../node_modules ---
  426.7 KiB [##########] /leaflet
  380.6 KiB [########  ] /core-js
  280.9 KiB [######    ] /jquery
  194.9 KiB [####      ] /intl
  178.3 KiB [####      ] /mobx
  164.2 KiB [###       ] /react-intl
  143.4 KiB [###       ] /tippy.js
  137.4 KiB [###       ] /react-dom
  113.2 KiB [##        ] /lodash-es
  104.5 KiB [##        ] /htmlparser2
```
