```
   ▄████████ ███▄▄▄▄      ▄████████  ▄█  ████████▄     ▄████████  ▄████████
  ███    ███ ███▀▀▀██▄   ███    ███ ███  ███   ▀███   ███    ███ ███    ███
  ███    ███ ███   ███   ███    █▀  ███▌ ███    ███   ███    █▀  ███    █▀
  ███    ███ ███   ███   ███        ███▌ ███    ███  ▄███▄▄▄     ███
▀███████████ ███   ███ ▀███████████ ███▌ ███    ███ ▀▀███▀▀▀     ███
  ███    ███ ███   ███          ███ ███  ███    ███   ███    █▄  ███    █▄
  ███    ███ ███   ███    ▄█    ███ ███  ███   ▄███   ███    ███ ███    ███
  ███    █▀   ▀█   █▀   ▄████████▀  █▀   ████████▀    ██████████ ████████▀
```

ANSIDec is a library for handling ANSI escape sequences for use in Browsers.
The primary goal of the library is to allow of displaying ANSI and ASCII
art in Browsers by transforming Unix encoding to html.
But it can also be used from Node.js.

## Installation

Npm installation for use with webpack:

```
npm install ansidec
```

Besides npm you can also download that file locally or use
[unpkg.com](https://unpkg.com/ansidec):

```html
<script src="https://unpkg.com/ansidec"></script>

```

## Usage

```javascript
// if you're using webpack or node.js you can use npm
var ansi = require('ansidec');

var format = ansi.format({
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
var ansi = require('ansidec');

document.write(ansi.html(text));

```

and use format only if you need different html or any different output text.


### License

Released under [MIT](http://opensource.org/licenses/MIT) license

Copyright (c) 2018 [Jakub Jankiewicz](http://jcubic.pl/jakub-jankiewicz)
