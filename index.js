import axios from 'axios';

export default class OneInchRouter { 
	#baseUrl;

	/**
     * Always returns code 200 if API is stable
	 * 
	 * @returns {Promise<{
	 * 	status: string
	 * }>}
	*/
	healtcheck = async () => axios.get(`${this.#baseUrl}/healthcheck`).then(res => res.data);

	/**
	 * Address of the 1inch router that must be trusted to spend funds for the exchange
	 * 	
	 * @returns {Promise<string>}
	*/
	approveSpender = async () => axios.get(`${this.#baseUrl}/approve/spender`).then((res) => res.data.address);

	/**
	 * Address of the 1inch router that must be trusted to spend funds for the exchange
	 * 	
	 * @param {string} tokenAddress - Token address you want to exchange
	 * @param {string | number} amount - The number of tokens that the 1inch router is allowed to spend.If not specified, it will be allowed to spend an infinite amount of tokens. **Example : 100000000000**
	 * @returns {Promise<{
	 * 	data: string
	 * 	gasPrice: string
	 * 	to: string
	 * 	value: string
	 * }>}
	*/
	approveTransaction = async (tokenAddress, amount = undefined) => axios.get(`${this.#baseUrl}/approve/transaction`, { params: { tokenAddress, amount } }).then(res => res.data);
	
	/**
	 * Get the number of tokens that the 1inch router is allowed to spend
	 * 	
	 * @param {string} tokenAddress - Token address you want to exchange
	 * @param {string} walletAddress - Wallet address for which you want to check
	 * @returns {Promise<string>}
	*/
	allowance = async (tokenAddress, walletAddress) => axios.get(`${this.#baseUrl}/approve/allowance`, { params: { tokenAddress, walletAddress } }).then(res => res.data.allowance);
	

	/**
	 * List of liquidity sources that are available for routing in the 1inch Aggregation protocol
	 * 	
	 * @returns {Promise<Array<{
	 * 	id: string
	 * 	title: string
	 * 	img: string
	 * }>>}
	*/
	liquiditySources = async () => axios.get(`${this.#baseUrl}/liquidity-sources`).then(res => res.data.protocols);
	
	/**
	 * List of tokens that are available for swap in the 1inch Aggregation protocol
	 * 	
	 * @returns {Promise<Array<{
	 * 	symbol: string
	 * 	name: string
	 * 	address: string
	 * 	decimals: number
	 * 	logoURI: string
	 * }>>}
	*/
	tokens = async () => axios.get(`${this.#baseUrl}/tokens`).then(res => Object.values(res.data.tokens));

	/**
	 * Object of preset configurations for the 1inch router
	 * 	
	 * @returns {Promise<Object<string, any>>}
	*/
	presets = async () => axios.get(`${this.#baseUrl}/presets`).then(res => res.data);

	/**
	 * **Find the best quote to exchange via 1inch router**
	 * 
	 * @param {string} fromTokenAddress  - Example : 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
	 * @param {string} toTokenAddress  - Example : 0x111111111117dc0aa78b770fa6a738034120c302
	 * @param {string | number} amount  - In token UNITS (amount * (10 ** tokenDecimals)) Example : 10000000000000000
	 * @param {{
	 * 	protocols?: string
	 * 	fee?: string | number
	 * 	gasLimit?: string | number
	 * 	connectorTokens?: string | number
	 * 	complexityLevel?: string | number
	 * 	mainRouteParts?: string | number
	 * 	parts?: string | number
	 * 	gasPrice?: string | number
	 * }} options
	 * @returns {Promise<{
	 * 	fromToken: {
	 * 		symbol: string
	 * 		name: string
	 * 		decimals: number
	 * 		address: string
	 * 		logoURI: string
	 * 	}
	 * 	toToken: {
	 * 		symbol: string
	 * 		name: string
	 * 		decimals: number
	 * 		address: string
	 * 		logoURI: string
	 * 	}
	 * 	toTokenAmount: string
	 * 	fromTokenAmount: string
	 * 	protocols: Array<any>
	 * 	estimatedGas: number
	 * }>}
	 * **Options Params:**
	 * 
	 * **!! should be the same for quote and swap!!**
	 * 
	 * `protocols - default: all;`
	 * 
	 * `fee - Min: 0; max: 3; Max: 0; max: 3; default: 0;`
	 * 
	 * `connectorTokens - max: 5;`
	 * 
	 * `complexityLevel - min: 0; max: 3; default: 2;` 
	 * 
	 * `mainRouteParts - default: 10; max: 50;`
	 * 
	 * `parts - split parts. default: 50; max: 100;`
	 * 
	 * `gasPrice - default: fast from network;`
	 * 
	 * **--------------------------------------------------**
	 * 
	 * **One of the following errors:**
	 * 
	 * - Insufficient liquidity
	 * 
	 * - Cannot estimate
	 * 	
	 * - You may not have enough ETH balance for gas fee
	 * 
	 * - FromTokenAddress cannot be equals to toTokenAddress
	 * 
	 * - Cannot estimate. Don't forget about miner fee. Try to leave the buffer of ETH for gas
	 * 
	 * - Not enough balance
	 * 
	 * - Not enough allowance
	 * 
	*/
	quote = async (fromTokenAddress, toTokenAddress, amount, options = {}) => axios.get(`${this.#baseUrl}/quote`, { params: { fromTokenAddress, toTokenAddress, amount, ...options } }).then(res => res.data);

		/**
	 * **Find the best quote to exchange via 1inch router**
	 * 
	 * @param {string} fromTokenAddress  - Example : 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
	 * @param {string} toTokenAddress  - Example : 0x111111111117dc0aa78b770fa6a738034120c302
	 * @param {string | number} amount  - In token UNITS (amount * (10 ** tokenDecimals)) Example : 10000000000000000
	 * @param {string} fromAddress - The address that calls the 1inch contract
	 * @param {string | number} slippage - min: 0; max: 50; (Percentage)
	 * @param {{
		 * 	protocols?: string
		 * 	destReceiver?: string
		 * 	referrerAddress?: string
		 * 	fee?: string | number
		 * 	gasLimit?: string | number
		 * 	disableEstimate?: boolean
		 * 	permit?: string
		 * 	burnChi?: boolean
		 * 	allowPartialFill?: boolean
		 * 	parts?: string | number
		 * 	connectorTokens?: string | number
		 * 	complexityLevel?: string | number
		 * 	mainRouteParts?: string | number
		 * 	gasPrice?: string | number
		 * }} options
		 * @returns {Promise<{
		 * 	fromToken: {
		 * 		symbol: string
		 * 		name: string
		 * 		decimals: number
		 * 		address: string
		 * 		logoURI: string
		 * 	}
		 * 	toToken: {
		 * 		symbol: string
		 * 		name: string
		 * 		decimals: number
		 * 		address: string
		 * 		logoURI: string
		 * 	}
		 * 	toTokenAmount: string
		 * 	fromTokenAmount: string
		 * 	protocols: Array<any>
		 * 	tx: {
		 * 		from: string
		 * 		to: string
		 * 		data: string
		 * 		value: string
		 * 		gasPrice: string
		 * 		gas: number
		 * 	}
		 * }>}
		 * **Options Params:**
		 * 
		 * **!! should be the same for quote and swap!!**
		 * 
		 * `protocols - default: all;`
		 * 
		 * `destReceiver - Receiver of destination currency. default: fromAddress;`
		 * 
		 * `referrerAddress - string;`
		 * 
		 * `fee - Min: 0; max: 3; Max: 0; max: 3; default: 0;`
		 * 
		 * `permit - https://eips.ethereum.org/EIPS/eip-2612`;
		 * 
		 * `burnChi - default: false;` *Suggest to check user's balance and allowance before set this flag; CHI should be approved to spender address*
		 * 
		 * `connectorTokens - max: 5;`
		 * 
		 * `complexityLevel - min: 0; max: 3; default: 2;` 
		 * 
		 * `mainRouteParts - default: 10; max: 50;`
		 * 
		 * `parts - split parts. default: 50; max: 100;`
		 * 
		 * `gasPrice - default: fast from network;`
		 * 
		 * **--------------------------------------------------**
		 * 
		 * **One of the following errors:**
		 * 
		 * - Insufficient liquidity
		 * 
		 * - Cannot estimate
		 * 	
		 * - You may not have enough ETH balance for gas fee
		 * 
		 * - FromTokenAddress cannot be equals to toTokenAddress
		 * 
		 * - Cannot estimate. Don't forget about miner fee. Try to leave the buffer of ETH for gas
		 * 
		 * - Not enough balance
		 * 
		 * - Not enough allowance
		 * 
		*/
		swap = async (fromTokenAddress, toTokenAddress, amount, fromAddress, slippage, options = {}) => axios.get(`${this.#baseUrl}/swap`, { params: { fromTokenAddress, toTokenAddress, amount, fromAddress, slippage, ...options } }).then(res => res.data);

	/**
	 * @param {number} chainId
	*/
	constructor(chainId) {
		this.#baseUrl = `https://api.1inch.exchange/v4.0/${chainId}`;
	}
};