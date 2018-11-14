# unix-formatting-transformer

Library for handling ANSI escape sequences for use in Browsers.
The primary goal of the library is to allow of displaying ANSI and ASCII
art in Browsers.

## Usage

```javascript
var uft = require('unix-formatter-transformer');

var format = uft.format({
   underline: function(text) {
      return '<span class="underline">' + text + '</span>';
   },
   bold: function(text) {
      return '<span class="bold">' + text + '</span>';
   },
   format: function(color, background, text) {
      var style = 'color:' + color + ';' + 'background: ' + background;
      return '<span style="' + style + '">' + text + '</span>';
   }
});

document.write(format(text));
```

format function can be executed with text as second argument, then it will
return string. If it don't get string as second argument it will return
function. So it's like it was curry'ied.

### License

Released under [MIT](http://opensource.org/licenses/MIT) license

Copyright (c) 2018 [Jakub Jankiewicz](http://jcubic.pl/jakub-jankiewicz)

