# Blacklist API

Um projeto simples de API rest para salvar documentos em uma API


## Instalando dependências

```
npm i
```

## Rodando o projeto

Para rodar o projeto é necessário estar com o docker-compose instalado, pois o banco de dados está em um container. 

Para rodar o banco de dados basta utilizar o comando:

```
docker-compose up -d
```

Com o banco de dados rodando no docker, já podemos inicializar a API com o comando: 

```
npm run dev
```

Isso ja é suficiente para rodar o projeto localmente.

## Rodando testes

Foram criados testes de integração para essa API, para rodar os testes de integração basta estar com a API rodando e utilizar o comando:

```
npm run test
```

## Rotas

### Request

`GET /status/`

Mostra alguns dados de status da API, como uptime, quantos cpfs estão na blacklist número de requests feitas.

### Response

```
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Content-Type: application/json; charset=utf-8
< Content-Length: 92
< ETag: W/"5c-Dnr1VOusDsk+P7edc/hdZZr7b4k"
< Date: Wed, 09 Feb 2022 14:28:22 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5

{
	"uptime": 710,
	"HowManyInBlacklist": 7,
	"numberOfRequests": 4,
	"date": "2022-02-09T14:28:22.731Z"
}
```

### Request

`PUT /add/`

Adiciona um documento na Blacklist.

### Body
Necessário enviar um body com um cpf válido
```
{"document": 'xxx.xxx.xxx-xx'}
```

### Response

```
< HTTP/1.1 201 Created
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Content-Type: application/json; charset=utf-8
< Content-Length: 148
< ETag: W/"94-e4ceOlc4m7s5EY3ZAkpfFBUahco"
< Date: Wed, 09 Feb 2022 14:36:41 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5

{
	"document": "xxx.xxx.xx-xx",
	"_id": "6203d17962db7e5e28e42a49",
	"createdAt": "2022-02-09T14:36:41.720Z",
	"updatedAt": "2022-02-09T14:36:41.720Z",
	"__v": 0
}
```

### Request

`GET /blacklist/`

Busca um documento na blacklist.

### Query
Necessário enviar uma query url com o documento que deseja buscar, por exemplo:
```
GET /blacklist?document=xxx.xxx.xxx-xx HTTP/1.1
```

### Response

A API retornará '{"blacklist": "BLOCK"}' nos casos em que o documento estiver na blacklist e retornará '{"blacklist": "FREE"}' caso o documento não esteja

```
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Content-Type: application/json; charset=utf-8
< Content-Length: 21
< ETag: W/"15-8WkMu4iVXPTXtnYkLZQ92dhrplI"
< Date: Wed, 09 Feb 2022 14:38:53 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5

{
	"blacklist": "BLOCK"
}
```

### Request

`DELETE /remove/`

Remove um documento da blacklist

### Body
Necessário enviar um body com um cpf válido
```
{"document": 'xxx.xxx.xxx-xx'}
```

### Response

```
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Content-Type: application/json; charset=utf-8
< Content-Length: 45
< ETag: W/"2d-T4tOqNwYJmZUpDdxtQmSYgtRw7o"
< Date: Wed, 09 Feb 2022 14:42:50 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5

{
	"message": "Document deleted from blacklist"
}
```