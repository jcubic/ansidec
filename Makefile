VERSION=0.3.0
CD=cd
CAT=cat
NPM=npm
RM=rm
GIT=git
URL=`git config --get remote.origin.url`
TEST=test
MKDIR=mkdir

ifdef SYSTEMROOT
  UGLIFY=.\node_modules\.bin\uglifyjs
  JEST=.\node_modules\.bin\jest
  ESLINT=.\node_modules\.bin\eslint
else
  UGLIFY=./node_modules/.bin/uglifyjs
  JEST=./node_modules/.bin/jest
  ESLINT=./node_modules/.bin/eslint
endif

skip_re="[xfi]it\\(|[fdx]describe\\("

all: dist/ascidec.min.js

.PHONY: publish test lint

publish:
	$(GIT) clone $(URL) --depth 1 npm
	$(CD) npm && $(NPM) publish
	$(RM) -rf npm

test:
	$(JEST) --coverage --testMatch '**/__test__/*.spec.js'

.$(VERSION): Makefile
	touch .$(VERSION)

skipped_tests:
	@! grep -E $(skip_re) __test__/ansidec.spec.js

coveralls:
	$(CAT) ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

lint:
	$(ESLINT) index.js

dist:
	$(MKDIR) dist

dist/ascidec.min.js: dist .$(VERSION) index.js
	$(UGLIFY) -o dist/ascidec.min.js --comments --mangle --source-map "includeSources,url='ascidec.min.js.map'" -- index.js
