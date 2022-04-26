import axios from 'axios';

/**
 * @class OneInchApi
 * @constructor
 * @public
 */
class OneInchApi { 
	#baseUrl;

	/**
	 * @typedef {Object} InchTokenData
	 * @property {string} symbol
	 * @property {string} name
	 * @property {number} decimals
	 * @property {string} address
	 * @property {string} logoURI
	*/

	/**
	 * @function OneInchApi.healtcheck
	 * @async
	 * @description Always returns code 200 if API is stable
	 * @returns {Promise<{status: string}>}
	*/
	healtcheck = async () => axios.get(`${this.#baseUrl}/healthcheck`).then(res => res.data);

	/**
	 * @function OneInchApi.approveSpender
	 * @async
	 * @description Address of the 1inch router that must be trusted to spend funds for the exchange
	 * @return {Promise<string>}
	*/
	approveSpender = async () => axios.get(`${this.#baseUrl}/approve/spender`).then((res) => res.data.address);

	/**
	 * @function OneInchApi.approveTransaction
	 * @async
	 * @description Generate data for calling the contract in order to allow the 1inch router to spend funds
	 * @param {string} tokenAddress - Token address you want to exchange
	 * @param {string | number} amount - The number of tokens that the 1inch router is allowed to spend.If not specified, it will be allowed to spend an infinite amount of tokens. **Example : 100000000000**
	 * @return {Promise<{ data: string, gasPrice: string, to: string, value: string }>}
	*/
	approveTransaction = async (tokenAddress, amount = undefined) => axios.get(`${this.#baseUrl}/approve/transaction`, { params: { tokenAddress, amount } }).then(res => res.data);
	
	/**
	 * @function OneInchApi.allowance
	 * @async
	 * @description Get the number of tokens that the 1inch router is allowed to spend
	 * @param {string} tokenAddress - Token address you want to exchange
	 * @param {string} walletAddress - Wallet address for which you want to check
	 * @returns {Promise<string>}
	*/
	allowance = async (tokenAddress, walletAddress) => axios.get(`${this.#baseUrl}/approve/allowance`, { params: { tokenAddress, walletAddress } }).then(res => res.data.allowance);
	

	/**
	 * @function OneInchApi.liquiditySources
	 * @async
	 * @description List of liquidity sources that are available for routing in the 1inch Aggregation protocol
	 * @returns {Promise<Array<{ id: string, title: string, img: string }>>}
	*/
	liquiditySources = async () => axios.get(`${this.#baseUrl}/liquidity-sources`).then(res => res.data.protocols);
	
	/**
	 * @function OneInchApi.tokens
	 * @async
	 * @description List of tokens that are available for swap in the 1inch Aggregation protocol
	 * @returns {Promise<Array<{ symbol: string, name: string, address: string, decimals: number, logoURI: string }>>}
	*/
	tokens = async () => axios.get(`${this.#baseUrl}/tokens`).then(res => Object.values(res.data.tokens));

	/**
	 * @function OneInchApi.presets
	 * @async
	 * @description Object of preset configurations for the 1inch router
	 * @returns {Promise<Object<string, any>>}
	*/
	presets = async () => axios.get(`${this.#baseUrl}/presets`).then(res => res.data);

	/**
	 * @typedef {Object} InchQuoteOptions
	 * @property {string} protocols - default: all
	 * @property {string} fee - Min: 0; max: 3; Max: 0; max: 3; default: 0
	 * @property {string | number} gasLimit - ammount in units
	 * @property {string | number} connectorTokens - max: 5
	 * @property {string | number} complexityLevel - min: 0; max: 3; default: 2
	 * @property {string | number} mainRouteParts - default: 10; max: 50
	 * @property {string | number} parts - split parts. default: 50; max: 100
	 * @property {string | number} gasPrice - default: fast from network
	 * @description !!! should be the same for quote and swap !!!
	*/

	/**
	 * @typedef {Object} InchQuoteResponse
	 * @property {InchTokenData} fromToken
	 * @property {InchTokenData} toToken
	 * @property {string} toTokenAmount
	 * @property {string} fromTokenAmount
	 * @property {Array<any>} protocols
	 * @property {number} estimatedGas
	 * @description !!! should be the same for quote and swap !!!
	*/

	/**
	 * @function OneInchApi.quote
	 * @async
	 * @description 
	 * **Find the best quote to exchange via 1inch router**
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
	 * @param {string} fromTokenAddress  - Example : 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
	 * @param {string} toTokenAddress  - Example : 0x111111111117dc0aa78b770fa6a738034120c302
	 * @param {string | number} amount  - In token UNITS (amount * (10 ** tokenDecimals)) Example : 10000000000000000
	 * @param {InchQuoteOptions} options
	 * @returns {Promise<InchQuoteResponse>}
	*/
	quote = async (fromTokenAddress, toTokenAddress, amount, options = {}) => axios.get(`${this.#baseUrl}/quote`, { params: { fromTokenAddress, toTokenAddress, amount, ...options } }).then(res => res.data);


	/**
	 * @typedef {Object} InchSwapOptions
	 * @property {string} protocols - default: all
	 * @property {string} destReceiver - Receiver of destination currency. default: fromAddress;
	 * @property {string} referrerAddress - string
	 * @property {string} fee - Min: 0; max: 3; Max: 0; max: 3; default: 0
	 * @property {string | number} gasLimit - ammount in units
	 * @property {boolean} disableEstimate - 
	 * @property {string} permit - https://eips.ethereum.org/EIPS/eip-2612
	 * @property {boolean} burnChi - default: false;` *Suggest to check user's balance and allowance before set this flag; CHI should be approved to spender address*
	 * @property {boolean} allowPartialFill - default: false
	 * @property {string | number} parts - split parts. default: 50; max: 100
	 * @property {string | number} connectorTokens - max: 5
	 * @property {string | number} complexityLevel - min: 0; max: 3; default: 2
	 * @property {string | number} mainRouteParts - default: 10; max: 50
	 * @property {string | number} gasPrice - default: fast from network
	 * @description !!! should be the same for quote and swap !!!
	*/

	/**
	 * @typedef {Object} InchSwapResponse
	 * @property {InchTokenData} fromToken
	 * @property {InchTokenData} toToken
	 * @property {string} toTokenAmount
	 * @property {string} fromTokenAmount
	 * @property {Array<any>} protocols
	 * @property {InchSwapTransaction} tx - transaction payload data for sign and send
	 * @description !!! should be the same for quote and swap !!!
	*/

	/**
	 * @typedef {Object} InchSwapTransaction
	 * @property {string} from
	 * @property {string} to
	 * @property {string} data
	 * @property {string} value
	 * @property {string} gasPrice
	 * @property {number} gas
	*/

	/**
	 * @function
	 * @async
	 * @description
	 * **Generate data for calling the 1inch router for exchange**
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
	 * @param {string} fromTokenAddress  - Example : 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
	 * @param {string} toTokenAddress  - Example : 0x111111111117dc0aa78b770fa6a738034120c302
	 * @param {string | number} amount  - In token UNITS (amount * (10 ** tokenDecimals)) Example : 10000000000000000
	 * @param {string} fromAddress - The address that calls the 1inch contract
	 * @param {string | number} slippage - min: 0; max: 50; (Percentage)
	 * @param {InchSwapOptions} options
	 * @returns {Promise<InchSwapResponse>}
	*/
	swap = async (fromTokenAddress, toTokenAddress, amount, fromAddress, slippage, options = {}) => axios.get(`${this.#baseUrl}/swap`, { params: { fromTokenAddress, toTokenAddress, amount, fromAddress, slippage, ...options } }).then(res => res.data);

	/**
	 * @param {number} chainId - while the transaction signature process uses the chain ID. (eth - 1 | bsc - 56)
	*/
	constructor(chainId) {
		this.#baseUrl = `https://api.1inch.exchange/v4.0/${chainId}`;
	}
};

export default OneInchApi;