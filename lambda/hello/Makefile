build:
	@CGO_ENABLED=0 go build -o bin/bootstrap main.go

run:build
	@./bin/bootstrap

test:
	@go test -v ./...
