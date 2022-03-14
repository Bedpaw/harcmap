Export scss/sass variables to JS modules

Example:
```scss
@import "../variables/colors/dark";

:export {
  stroke: $color-stroke;
  danger: $color-danger;
  warning: $color-warning;
  info: $color-info;
}
```

To export variables the file name should match the formula `[filename].module.scss`.
