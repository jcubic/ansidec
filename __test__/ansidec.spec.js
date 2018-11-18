/**@license
 *    ▄████████ ███▄▄▄▄      ▄████████  ▄█  ████████▄     ▄████████  ▄████████
 *  ███    ███ ███▀▀▀██▄   ███    ███ ███  ███   ▀███   ███    ███ ███    ███
 *  ███    ███ ███   ███   ███    █▀  ███▌ ███    ███   ███    █▀  ███    █▀
 *  ███    ███ ███   ███   ███        ███▌ ███    ███  ▄███▄▄▄     ███
 * ▀███████████ ███   ███ ▀███████████ ███▌ ███    ███ ▀▀███▀▀▀     ███
 *  ███    ███ ███   ███          ███ ███  ███    ███   ███    █▄  ███    █▄
 *  ███    ███ ███   ███    ▄█    ███ ███  ███   ▄███   ███    ███ ███    ███
 *  ███    █▀   ▀█   █▀   ▄████████▀  █▀   ████████▀    ██████████ ████████▀
 *
 * Copyright (c) 2018 Jakub Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 *
 * Based on jQuery Terminal's unix formatting
 *
 */
/* global global, it, expect, describe, require, spyOn, setTimeout, location,
          beforeEach, afterEach, jest */
var ansi = require('..');



describe('overtyping', function() {
    var overtyping = ansi.format(function(style, color, background, text) {
        if (style.bold) {
            return '[[b;#fff;]' + text + ']';
        }
        if (style.underline) {
            return '[[u;;]' + text + ']';
        }
        return text;
    });
    it('should convert to terminal formatting', function() {
        var string = 'HELLO TERMINAL'.replace(/./g, function(chr) {
            return chr == ' ' ? chr : chr + '\x08' + chr;
        });
        var result = '[[b;#fff;]HELLO] [[b;#fff;]TERMINAL]';
        expect(overtyping(string)).toEqual(result);
    });
    it('should create underline', function() {
        var string = 'HELLO TERMINAL'.replace(/./g, function(chr) {
            return chr == ' ' ? chr : chr + '\x08_';
        });
        var result = '[[u;;]HELLO] [[u;;]TERMINAL]';
        expect(overtyping(string)).toEqual(result);
    });
    it('should process normal backspaces', function() {
        var tests = [
            ['Checking current state.\t[    ]\b\b\b\b\bFAIL\r\n',
             "Checking current state.\t[FAIL]\r\n"
            ],
            ['[Start]\b\b] \b\b\b\b\b\b    \b\b\b\b---\b\b\b   \b\b\bDone] show be displa'+
             'yed as [Done]',
             '[Done] show be displayed as [Done]'
            ],
            ['Test 2.\t[    ]\b\b\b\b\bFAIL\nTest 3.\t[    ]\b\b\b\b\bWARNING]\n',
             'Test 2.\t[FAIL]\nTest 3.\t[WARNING]\n'
            ],
            [
                ['Test 0.\n\n==============================\nState1.\t[    ]\b\b\b\b\b--\r',
                 '\u001B[KState1.\t[    ]\b\b\b\b\bDONE\nLine2.\t[    ]\b\b\b\b\b----\b\b',
                 '\b\b    \b\b\b\b----\b\b\b\b    \b\b\b\b----\b\b\b\b    \b\b\b\b----\b\b',
                 '\b\b    \b\b\b\b----\b\b\b\b    \b\b\b\b----\b\b\b\b    \b\b\b\b----\b\b',
                 '\b\b    \b\b\b\b-\r\u001B[KLin2.\t[    ]\b\b\b\b\bFAIL\nTest3.\t[    ]\b',
                 '\b\b\b\b--\r\u001B[KTest3.\t[    ]\b\b\b\b\bWARNING]\n\nFinal status\n\n',
                 'Status details\nTime: 11'].join(''),
                ['Test 0.\n\n==============================\nState1.\t[DONE]\nLin2.\t[FAI',
                 'L]\nTest3.\t[WARNING]\n\nFinal status\n\nStatus details\nTime: 11'].join('')
            ]
        ];
        tests.forEach(function(spec) {
            expect(overtyping(spec[0])).toEqual(spec[1]);
        });
    });
});
describe('ansi', function() {
    var from_ansi = ansi.format(function(style, color, background, text) {
        var styles = [];
        if (style.bold) {
            styles.push('b');
        }
        if (style.italic) {
            styles.push('i');
        }
        if (style.underline) {
            styles.push('u');
        }
        var format = [styles.join(''), color || '', background || ''].join(';');
        return '[[' + format + ']' + text + ']';
    });
    var ansi_string = '\x1b[38;5;12mHello\x1b[2;31;46mFoo\x1b[1;3;4;32;45mB[[sb;;]a]r\x1b[0m\x1b[7mBaz\x1b[0;48;2;255;255;0;38;2;0;100;0mQuux\x1b[m';
    it('should convert ansi to terminal formatting', function() {
        var string = from_ansi(ansi_string);
        expect(string).toEqual('[[;#5555FF;]Hello][[;#640000;#0AA]Foo][[biu;#44D544;#A0A]'+
                               'B[[sb;;]a]r][[;#000;#AAA]Baz][[;#006400;#ffff00]Quux]');
    });
    it('should return uncahnged string', function() {
        var input = 'foo bar';
        var output = from_ansi(input);
        expect(output).toEqual(input);
    });
});
