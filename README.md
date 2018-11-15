# unix-formatting-transformer

Library for handling ANSI escape sequences for use in Browsers.
The primary goal of the library is to allow of displaying ANSI and ASCII
art in Browsers. But it can also be used from Node.js.

## Installation

Besides npm you can also download that file locally or use
[unpkg.com](https://unpkg.com/unix-formatting-transformer):

```html
<script src="https://unpkg.com/unix-formatting-transformer"></script>

```

## Usage

```javascript
// if you're using webpack or node.js you can use npm
var uft = require('unix-formatter-transformer');

var format = uft.format({
    underline: function(text) {
        return '<span style="text-decoration: underline">' + text + '</span>';
    },
    bold: function(text) {
        return '<span style="font-weight: bold">' + text + '</span>';
    },
    format: function(color, background, text) {
        var style = 'color:' + color + ';' + 'background: ' + background;
        return '<span style="' + style + '">' + text + '</span>';
    },
    line: function(html) {
        return '<div>' + html + '</div>';
    }
   }
});

document.write(format(text));
```

format function can be executed with text as second argument, then it will
return string. If it don't get string as second argument it will return
function. So it's like it was curried.

If you want just to output html you can use helper:

```javascript
var uft = require('unix-formatter-transformer');

document.write(uft.html(text));

```

and use format only if you need different html or any different output text.


### License

Released under [MIT](http://opensource.org/licenses/MIT) license

Copyright (c) 2018 [Jakub Jankiewicz](http://jcubic.pl/jakub-jankiewicz)

