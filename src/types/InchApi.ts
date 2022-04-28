import TokenData from "./Token";

export interface QuoteParams{
	protocols?: string
	fee?: string | number
	gasLimit?: string | number
	connectorTokens?: string | number
	complexityLevel?: string | number
	mainRouteParts?: string | number
	parts?: string | number
	gasPrice?: string | number
};
export interface QuoteResponse{
	fromToken: TokenData
	toToken: TokenData
	toTokenAmount: string
	fromTokenAmount: string
	protocols: Array<any>
	estimatedGas: number
};

export interface SwapParams{
	protocols?: string
	destReceiver?: string
	referrerAddress?: string
	fee?: string | number
	gasLimit?: string | number
	disableEstimate?: boolean
	permit?: string
	burnChi?: boolean
	allowPartialFill?: boolean
	connectorTokens?: string | number
	complexityLevel?: string | number
	mainRouteParts?: string | number
	parts?: string | number
	gasPrice?: string | number
};
export interface SwapResponse{
	fromToken: TokenData
	toToken: TokenData
	toTokenAmount: string
	fromTokenAmount: string
	protocols: Array<any>
	tx: {
		from: string
		to: string
		data: string
		value: string
		gasPrice: string
		gas: number
	}
}