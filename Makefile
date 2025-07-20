
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

HOST ?= localhost
LAN_HOST ?= 0.0.0.0
LAN_PORT ?= 8888
WS_LAN_PORT ?= 3333
WS_PORT ?= 3333
CARDS ?= "[1,2,3,5]"

product:
	sudo docker run -d \
		-p ${LAN_PORT}:80 \
		-p ${WS_LAN_PORT}:3000 \
		-e VITE_HOST=${HOST} \
		-e VITE_CARDS=${CARDS} \
		-e VITE_WS_LAN_PORT=3000 \
		-e VITE_PORT=80 \
		-e VITE_WS_PORT=${WS_PORT} \
		twolastnames/scatter-brained
