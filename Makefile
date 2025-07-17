
FRONT=front
FRONT_SRC=front/src
FRONT_MODULES=front/node_modules
BACK_MODULES=node_modules

$(FRONT_MODULES):
	cd $(FRONT) && npm ci

$(BACK_MODULES):
	npm ci

static: dist
	cd dist && python3 -m http.server 8000

format: $(FRONT_MODULES)
	cd $(FRONT) && npm run lint && npm run prettify

update:
	cd $(FRONT) && npm install
	npm install

component:
	cd $(FRONT)/src/components && node template.js $(NAME)

test:
	cd $(FRONT) && npm run test

run: build
	node index.cjs

dist: $(FRONT_MODULES) $(shell find $(FRONT_SRC) -type f)
	cd $(FRONT)  && npm run build

dev: $(FRONT_MODULES) $(shell find $(FRONT_SRC) -type f)
	cd $(FRONT)  && npm run build -- --minify false --watch true

build: $(BACK_MODULES) dist

clean:
	rm -rf dist $(FRONT_MODULES) $(BACK_MODULES)
