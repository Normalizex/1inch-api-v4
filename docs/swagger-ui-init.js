
window.onload = function() {
	// Build a system
	var url = window.location.search.match(/url=([^&]+)/);
	if (url && url.length > 1) {
	  url = decodeURIComponent(url[1]);
	} else {
	  url = window.location.origin;
	}
	var options = {
	"swaggerDoc": {
	  "openapi": "3.0.0",
	  "paths": {
		"https://api.1inch.exchange/v4.0/42161/healthcheck": {
		  "get": {
			"operationId": "FactoryHealthCheckController_healthcheck",
			"summary": "API health check",
			"parameters": [],
			"responses": {
			  "200": {
				"description": "Always returns code 200 if API is stable"
			  }
			},
			"tags": [
			  "Healthcheck"
			]
		  }
		},
		"https://api.1inch.exchange/v4.0/42161/approve/spender": {
		  "get": {
			"operationId": "ApproveFactoryController_getSpender",
			"summary": "Address of the 1inch router that must be trusted to spend funds for the exchange",
			"parameters": [],
			"responses": {
			  "200": {
				"description": "Address of the 1inch router that must be trusted to spend funds for the exchange",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/ApproveSpenderResponseDto"
					}
				  }
				}
			  }
			},
			"tags": [
			  "Approve"
			]
		  }
		},
		"https://api.1inch.exchange/v4.0/42161/approve/transaction": {
		  "get": {
			"operationId": "ApproveFactoryController_getCallData",
			"summary": "Generate data for calling the contract in order to allow the 1inch router to spend funds",
			"parameters": [
			  {
				"name": "tokenAddress",
				"required": true,
				"in": "query",
				"description": "Token address you want to exchange",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "amount",
				"required": false,
				"in": "query",
				"example": "100000000000",
				"description": "The number of tokens that the 1inch router is allowed to spend.If not specified, it will be allowed to spend an infinite amount of tokens.",
				"schema": {
				  "type": "string"
				}
			  }
			],
			"responses": {
			  "200": {
				"description": "Transaction body to allow the exchange with the 1inch router",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/ApproveCalldataResponseDto"
					}
				  }
				}
			  }
			},
			"tags": [
			  "Approve"
			]
		  }
		},
		"https://api.1inch.exchange/v4.0/42161/approve/allowance": {
		  "get": {
			"operationId": "ApproveFactoryController_getAllowance",
			"summary": "Get the number of tokens that the 1inch router is allowed to spend",
			"parameters": [
			  {
				"name": "tokenAddress",
				"required": true,
				"in": "query",
				"description": "Token address you want to exchange",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "walletAddress",
				"required": true,
				"in": "query",
				"description": "Wallet address for which you want to check",
				"schema": {
				  "type": "string"
				}
			  }
			],
			"responses": {
			  "200": {
				"description": ""
			  }
			},
			"tags": [
			  "Approve"
			]
		  }
		},
		"https://api.1inch.exchange/v4.0/42161/liquidity-sources": {
		  "get": {
			"operationId": "ChainProtocolController_getProtocolsImages",
			"summary": "List of liquidity sources that are available for routing in the 1inch Aggregation protocol",
			"parameters": [],
			"responses": {
			  "200": {
				"description": "All supported protocols public",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/ProtocolsResponseDto"
					}
				  }
				}
			  }
			},
			"tags": [
			  "Info"
			]
		  }
		},
		"https://api.1inch.exchange/v4.0/42161/tokens": {
		  "get": {
			"operationId": "ChainTokensController_getTokens",
			"summary": "List of tokens that are available for swap in the 1inch Aggregation protocol",
			"parameters": [],
			"responses": {
			  "200": {
				"description": "All supported tokens (can also use your own)",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/TokensResponseDto"
					}
				  }
				}
			  }
			},
			"tags": [
			  "Info"
			]
		  }
		},
		"https://api.1inch.exchange/v4.0/42161/presets": {
		  "get": {
			"operationId": "ChainPresetsController_getPresets",
			"summary": "List of preset configurations for the 1inch router",
			"parameters": [],
			"responses": {
			  "200": {
				"description": ""
			  }
			},
			"tags": [
			  "Info"
			]
		  }
		},
		"https://api.1inch.exchange/v4.0/42161/quote": {
		  "get": {
			"operationId": "SwapFactoryCommonController_getQuote",
			"summary": "Find the best quote to exchange via 1inch router",
			"parameters": [
			  {
				"name": "fromTokenAddress",
				"required": true,
				"in": "query",
				"description": "",
				"example": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "toTokenAddress",
				"required": true,
				"in": "query",
				"description": "",
				"example": "0x111111111117dc0aa78b770fa6a738034120c302",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "amount",
				"required": true,
				"in": "query",
				"description": "",
				"example": "10000000000000000",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "protocols",
				"required": false,
				"in": "query",
				"description": "default: all",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "fee",
				"required": false,
				"in": "query",
				"description": "Min: 0; max: 3; Max: 0; max: 3; default: 0;  !should be the same for quote and swap!",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "gasLimit",
				"required": false,
				"in": "query",
				"description": "",
				"schema": {}
			  },
			  {
				"name": "connectorTokens",
				"required": false,
				"in": "query",
				"description": "max: 5; !should be the same for quote and swap!",
				"allowEmptyValue": true,
				"schema": {}
			  },
			  {
				"name": "complexityLevel",
				"required": false,
				"in": "query",
				"description": "min: 0; max: 3; default: 2; !should be the same for quote and swap!",
				"schema": {}
			  },
			  {
				"name": "mainRouteParts",
				"required": false,
				"in": "query",
				"description": "default: 10; max: 50  !should be the same for quote and swap!",
				"schema": {}
			  },
			  {
				"name": "parts",
				"required": false,
				"in": "query",
				"description": "split parts. default: 50;  max: 100!should be the same for quote and swap!",
				"schema": {}
			  },
			  {
				"name": "gasPrice",
				"required": false,
				"in": "query",
				"description": "default: fast from network",
				"schema": {}
			  }
			],
			"responses": {
			  "200": {
				"description": "Quote",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/QuoteResponseDto"
					}
				  }
				}
			  },
			  "400": {
				"description": "One of the following errors: <br><br>Insufficient liquidity<br>Cannot estimate<br>You may not have enough ETH balance for gas fee<br>FromTokenAddress cannot be equals to toTokenAddress<br>Cannot estimate. Don't forget about miner fee. Try to leave the buffer of ETH for gas<br>Not enough balance<br>Not enough allowance",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/SwapErrorDto"
					}
				  }
				}
			  }
			},
			"tags": [
			  "Swap"
			]
		  }
		},
		"https://api.1inch.exchange/v4.0/42161/swap": {
		  "get": {
			"operationId": "SwapFactoryCommonController_getSwap",
			"summary": "Generate data for calling the 1inch router for exchange",
			"parameters": [
			  {
				"name": "fromTokenAddress",
				"required": true,
				"in": "query",
				"description": "",
				"example": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "toTokenAddress",
				"required": true,
				"in": "query",
				"description": "",
				"example": "0x111111111117dc0aa78b770fa6a738034120c302",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "amount",
				"required": true,
				"in": "query",
				"description": "",
				"example": "10000000000000000",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "fromAddress",
				"required": true,
				"in": "query",
				"description": "The address that calls the 1inch contract",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "slippage",
				"required": true,
				"in": "query",
				"description": "min: 0; max: 50;",
				"example": 1,
				"schema": {
				  "type": "number"
				}
			  },
			  {
				"name": "protocols",
				"required": false,
				"in": "query",
				"description": "default: all",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "destReceiver",
				"required": false,
				"in": "query",
				"description": "Receiver of destination currency. default: fromAddress",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "referrerAddress",
				"required": false,
				"in": "query",
				"description": "",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "fee",
				"required": false,
				"in": "query",
				"description": "Min: 0; max: 3; Max: 0; max: 3; default: 0;  !should be the same for quote and swap!",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "gasPrice",
				"required": false,
				"in": "query",
				"description": "default: fast from network",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "disableEstimate",
				"required": false,
				"in": "query",
				"description": "",
				"schema": {
				  "type": "boolean"
				}
			  },
			  {
				"name": "permit",
				"required": false,
				"in": "query",
				"description": "https://eips.ethereum.org/EIPS/eip-2612",
				"schema": {
				  "type": "string"
				}
			  },
			  {
				"name": "burnChi",
				"required": false,
				"in": "query",
				"description": "default: false; Suggest to check user's balance and allowance before set this flag; CHI should be approved to spender address",
				"schema": {
				  "type": "boolean"
				}
			  },
			  {
				"name": "allowPartialFill",
				"required": false,
				"in": "query",
				"description": "",
				"schema": {
				  "type": "boolean"
				}
			  },
			  {
				"name": "parts",
				"required": false,
				"in": "query",
				"description": "split parts. default: 50;  max: 100!should be the same for quote and swap!",
				"schema": {}
			  },
			  {
				"name": "mainRouteParts",
				"required": false,
				"in": "query",
				"description": "default: 10; max: 50  !should be the same for quote and swap!",
				"schema": {}
			  },
			  {
				"name": "connectorTokens",
				"required": false,
				"in": "query",
				"description": "max: 5; !should be the same for quote and swap!",
				"allowEmptyValue": true,
				"schema": {}
			  },
			  {
				"name": "complexityLevel",
				"required": false,
				"in": "query",
				"description": "min: 0; max: 3; default: 2; !should be the same for quote and swap!",
				"schema": {}
			  },
			  {
				"name": "gasLimit",
				"required": false,
				"in": "query",
				"description": "",
				"schema": {}
			  }
			],
			"responses": {
			  "200": {
				"description": "Swap",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/SwapResponseDto"
					}
				  }
				}
			  },
			  "400": {
				"description": "One of the following errors: <br><br>Insufficient liquidity<br>Cannot estimate<br>You may not have enough ETH balance for gas fee<br>FromTokenAddress cannot be equals to toTokenAddress<br>Cannot estimate. Don't forget about miner fee. Try to leave the buffer of ETH for gas<br>Not enough balance<br>Not enough allowance",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/SwapErrorDto"
					}
				  }
				}
			  }
			},
			"tags": [
			  "Swap"
			]
		  }
		}
	  },
	  "info": {
		"title": "1inch Aggregation protocol API",
		"description": "\n<h2>Arbitrum Network</h2>\nUsing 1inch Aggregation protocol API, you can find the best route to exchange assets and make the exchange.\n<br><br>\nStep by step:\n1. Lookup addresses of tokens you want to swap, for example ‘0xxx’ , ‘0xxxx’ for DAI -> 1INCH\n2. Check for allowance of 1inch router contract to spend source asset (/approve/allowance)\n3. If necessary, give approval for 1inch router to spend source token (/approve/transaction)\n4. Monitor the best exchange route using (/quote)\n5. When you ready use to perform swap (/swap)\n\n",
		"version": "4.0",
		"contact": {}
	  },
	  "tags": [],
	  "servers": [],
	  "components": {
		"schemas": {
		  "ApproveSpenderResponseDto": {
			"type": "object",
			"properties": {
			  "address": {
				"type": "string",
				"description": "Address of the 1inch router that must be trusted to spend funds for the exchange"
			  }
			},
			"required": [
			  "address"
			]
		  },
		  "ApproveCalldataResponseDto": {
			"type": "object",
			"properties": {
			  "data": {
				"type": "string",
				"description": "The encoded data to call the approve method on the swapped token contract"
			  },
			  "gasPrice": {
				"type": "string",
				"description": "Gas price for fast transaction processing"
			  },
			  "to": {
				"type": "string",
				"description": "Token address that will be allowed to exchange through 1inch router",
				"example": "0x6b175474e89094c44da98b954eedeac495271d0f"
			  },
			  "value": {
				"type": "string",
				"description": "Native token value in WEI (for approve is always 0)"
			  }
			},
			"required": [
			  "data",
			  "gasPrice",
			  "to",
			  "value"
			]
		  },
		  "ProtocolImageDto": {
			"type": "object",
			"properties": {
			  "id": {
				"type": "string",
				"description": "Protocol id"
			  },
			  "title": {
				"type": "string",
				"description": "Protocol title"
			  },
			  "img": {
				"type": "string",
				"description": "Protocol logo image"
			  }
			},
			"required": [
			  "id",
			  "title",
			  "img"
			]
		  },
		  "ProtocolsResponseDto": {
			"type": "object",
			"properties": {
			  "protocols": {
				"description": "List of protocols that are available for routing in the 1inch Aggregation protocol",
				"type": "array",
				"items": {
				  "$ref": "#/components/schemas/ProtocolImageDto"
				}
			  }
			},
			"required": [
			  "protocols"
			]
		  },
		  "TokenDto": {
			"type": "object",
			"properties": {
			  "symbol": {
				"type": "string"
			  },
			  "name": {
				"type": "string"
			  },
			  "address": {
				"type": "string"
			  },
			  "decimals": {
				"type": "number"
			  },
			  "logoURI": {
				"type": "string"
			  }
			},
			"required": [
			  "symbol",
			  "name",
			  "address",
			  "decimals",
			  "logoURI"
			]
		  },
		  "TokensResponseDto": {
			"type": "object",
			"properties": {
			  "tokens": {
				"description": "List of supported tokens",
				"type": "array",
				"items": {
				  "$ref": "#/components/schemas/TokenDto"
				}
			  }
			},
			"required": [
			  "tokens"
			]
		  },
		  "PathViewDto": {
			"type": "object",
			"properties": {
			  "name": {
				"type": "string"
			  },
			  "part": {
				"type": "number"
			  },
			  "fromTokenAddress": {
				"type": "string"
			  },
			  "toTokenAddress": {
				"type": "string"
			  }
			},
			"required": [
			  "name",
			  "part",
			  "fromTokenAddress",
			  "toTokenAddress"
			]
		  },
		  "QuoteResponseDto": {
			"type": "object",
			"properties": {
			  "fromToken": {
				"description": "Source token info",
				"allOf": [
				  {
					"$ref": "#/components/schemas/TokenDto"
				  }
				]
			  },
			  "toToken": {
				"description": "Destination token info",
				"allOf": [
				  {
					"$ref": "#/components/schemas/TokenDto"
				  }
				]
			  },
			  "toTokenAmount": {
				"type": "string",
				"description": "Expected amount of destination token"
			  },
			  "fromTokenAmount": {
				"type": "string",
				"description": "Amount of source token"
			  },
			  "protocols": {
				"description": "Selected protocols in a path",
				"type": "array",
				"items": {
				  "$ref": "#/components/schemas/PathViewDto"
				}
			  },
			  "estimatedGas": {
				"type": "number"
			  }
			},
			"required": [
			  "fromToken",
			  "toToken",
			  "toTokenAmount",
			  "fromTokenAmount",
			  "protocols",
			  "estimatedGas"
			]
		  },
		  "NestErrorMeta": {
			"type": "object",
			"properties": {
			  "type": {
				"type": "string",
				"description": "Type of field",
				"example": "fromTokenAddress"
			  },
			  "value": {
				"type": "object",
				"description": "Value of field",
				"example": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
			  }
			},
			"required": [
			  "type",
			  "value"
			]
		  },
		  "SwapErrorDto": {
			"type": "object",
			"properties": {
			  "statusCode": {
				"type": "number",
				"description": "HTTP code",
				"example": 400
			  },
			  "error": {
				"type": "string",
				"description": "Error code description",
				"example": "Bad Request"
			  },
			  "description": {
				"type": "string",
				"description": "Error description (one of the following)"
			  },
			  "requestId": {
				"type": "string",
				"description": "Request id"
			  },
			  "meta": {
				"description": "Meta information",
				"type": "array",
				"items": {
				  "$ref": "#/components/schemas/NestErrorMeta"
				}
			  }
			},
			"required": [
			  "statusCode",
			  "error",
			  "description",
			  "requestId",
			  "meta"
			]
		  },
		  "Tx": {
			"type": "object",
			"properties": {
			  "from": {
				"type": "string"
			  },
			  "to": {
				"type": "string"
			  },
			  "data": {
				"type": "string"
			  },
			  "value": {
				"type": "string"
			  },
			  "gasPrice": {
				"type": "string"
			  },
			  "gas": {
				"type": "string"
			  }
			},
			"required": [
			  "from",
			  "to",
			  "data",
			  "value",
			  "gasPrice",
			  "gas"
			]
		  },
		  "SwapResponseDto": {
			"type": "object",
			"properties": {
			  "fromToken": {
				"description": "Source token info",
				"allOf": [
				  {
					"$ref": "#/components/schemas/TokenDto"
				  }
				]
			  },
			  "toToken": {
				"description": "Destination token info",
				"allOf": [
				  {
					"$ref": "#/components/schemas/TokenDto"
				  }
				]
			  },
			  "toTokenAmount": {
				"type": "string",
				"description": "Expected amount of destination token"
			  },
			  "fromTokenAmount": {
				"type": "string",
				"description": "Amount of source token"
			  },
			  "protocols": {
				"description": "Selected protocols in a path",
				"type": "array",
				"items": {
				  "type": "string"
				}
			  },
			  "tx": {
				"description": "Transaction object",
				"allOf": [
				  {
					"$ref": "#/components/schemas/Tx"
				  }
				]
			  }
			},
			"required": [
			  "fromToken",
			  "toToken",
			  "toTokenAmount",
			  "fromTokenAmount",
			  "protocols",
			  "tx"
			]
		  }
		}
	  }
	},
	"customOptions": {},
	"swaggerUrl": {}
  };
	url = options.swaggerUrl || url
	var urls = options.swaggerUrls
	var customOptions = options.customOptions
	var spec1 = options.swaggerDoc
	var swaggerOptions = {
	  spec: spec1,
	  url: url,
	  urls: urls,
	  dom_id: '#swagger-ui',
	  deepLinking: true,
	  presets: [
		SwaggerUIBundle.presets.apis,
		SwaggerUIStandalonePreset
	  ],
	  plugins: [
		SwaggerUIBundle.plugins.DownloadUrl
	  ],
	  layout: "StandaloneLayout"
	}
	for (var attrname in customOptions) {
	  swaggerOptions[attrname] = customOptions[attrname];
	}
	var ui = SwaggerUIBundle(swaggerOptions)
  
	if (customOptions.oauth) {
	  ui.initOAuth(customOptions.oauth)
	}
  
	if (customOptions.authAction) {
	  ui.authActions.authorize(customOptions.authAction)
	}
  
	window.ui = ui
  }
  