DOCKER_COMPOSE = docker-compose

DOCKERFILE_DEV = Dockerfile.dev
DOCKERFILE_PROD = Dockerfile.prod
DOCKERFILE_TEST = Dockerfile.test

all: dev

dev:
	ENV=development DOCKERFILE=$(DOCKERFILE_DEV) $(DOCKER_COMPOSE) up --build

prod:
	ENV=production DOCKERFILE=$(DOCKERFILE_PROD) $(DOCKER_COMPOSE) up --build -d

test:
	DOCKERFILE=$(DOCKERFILE_TEST) $(DOCKER_COMPOSE) up --build --abort-on-container-exit
	$(DOCKER_COMPOSE) down -v --remove-orphans

stop:
	$(DOCKER_COMPOSE) down

clean:
	$(DOCKER_COMPOSE) down -v --rmi all --remove-orphans

help:
	@echo "Available commands:"
	@echo "  make dev	- Run the development environment"
	@echo "  make prod   - Run the production environment"
	@echo "  make test   - Run the test environment"
	@echo "  make stop   - Stop all containers"
	@echo "  make clean  - Clean up Docker resources"

.PHONY: all dev prod test stop clean help
