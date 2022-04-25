import axios from 'axios';

export default class OneInchRouter { 
	baseUrl;

	async healtcheck() { };
	async spender() { };
	async transaction() { };
	async allowance() { };
	async liquiditySources() { };
	async tokens() { };
	async presets() { };
	async quote() { };
	async swap() { };

	/**
	 * @param {number} chainId
	*/
	constructor(chainId) {
		this.baseUrl = `https://api.1inch.exchange/v4.0/${chainId}/`;
	}
};