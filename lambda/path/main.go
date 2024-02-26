package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type App struct {
	id string
}

func newApp(id string) *App {
	return &App{id: id}
}

func (app *App) Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	responseBody := map[string]string{
		"message": fmt.Sprintf("Hello from %s!", app.id),
	}

	responseJson, err := json.Marshal(responseBody)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Headers: map[string]string{
				"Content-Type":                "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			Body: "Internal Server Error",
		}, err
	}

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
		},
		Body: string(responseJson),
	}, nil

}

func main() {
	id := "funcTwo"
	app := newApp(id)
	lambda.Start(app.Handler)
}
