# 1inch-api-v4
* `Simple 1inch api v4 wrapper for node.js`
* `Node.js >= v14.10.0`
***
# Installation:
```console
#npm
npm install git+https://github.com/Normalizex/1inch-api-v4.git

#yarn
yarn add git+https://github.com/Normalizex/1inch-api-v4.git
```

# Usage:
```js
import OneInchApi from "1inch-api-v4";

const Inch = new OneInchApi(56);

const BUSD = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
const WETH = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const WalletAddress = '0x35552CF3Ce8Cc8a0f7fdC8Aa88a89b92e9Ab5FdB';

// EXAMPLES
Inch.allowance(BUSD, WalletAddress).then(data => {
	//return "0"
});

Inch.approveSpender().then(data => {
	//0x1111111254fb6c44bac0bed2854e76f90643097d
});

Inch.approveTransaction(BUSD).then(data => {
	/**
		{
			data: '0x095ea7b30000000000000000000000001111111254fb6c44bac0bed2854e76f90643097dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
			gasPrice: '15000000000',
			to: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
			value: '0'
		}
	*/
});

Inch.healtcheck().then(data => {
	// { status: 'OK' }
});

Inch.liquiditySources().then(data => {
	/**
		[
			{
				id: 'BSC_BI_SWAP',
				title: 'biswap',
				img: 'https://cdn.1inch.io/liquidity-sources-logo/biswap.png',
				img_color: 'https://cdn.1inch.io/liquidity-sources-logo/biswap_color.png'
			}
			...AND MORE ITEMS...
		]
	*/
});

Inch.presets().then(data => {
	/**
		{
			MAX_RESULT: [
				{
					complexityLevel: 2,
					mainRouteParts: 10,
					parts: 50,
					virtualParts: 50
				}
			],
			LOWEST_GAS: [
				{
					complexityLevel: 0,
					mainRouteParts: 1,
					parts: 1,
					virtualParts: 1
				},
				{
					complexityLevel: 1,
					mainRouteParts: 1,
					parts: 1,
					virtualParts: 1
				}
			]
		}
	*/
});

Inch.tokens().then(data => {
	/**
	 [
		{
			symbol: 'DOS',
			name: 'DOS Network Token BEP20',
			decimals: 18,
			address: '0xdc0f0a5719c39764b011edd02811bd228296887c',
			logoURI: 'https://tokens.1inch.io/0x0a913bead80f321e7ac35285ee10d9d922659cb7.png'
		},
		... 284 more items
	 ] 
	*/
});

Inch.quote(BUSD, WETH, 50 * 1e18).then(data => {
	/** 
	{
		fromToken: {
			symbol: 'BUSD',
			name: 'BUSD Token',
			decimals: 18,
			address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
			logoURI: 'https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png'
		},
		toToken: {
			symbol: 'BNB',
			name: 'BNB',
			decimals: 18,
			address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
			logoURI: 'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c_1.png'
		},
		toTokenAmount: '125276691940480656',
		fromTokenAmount: '50000000000000000000',
		protocols: [ [ [Array] ] ],
		estimatedGas: 252364
	}
	*/
});
```
***
# Donate
Of course, the project was made not for any benefit, but for my personal convenience :)

But I wanted to share this convenience with the Github community.

You can send me any amount of any coins in the **ETH / BSC** network as a donation to the address: **`0x35552CF3Ce8Cc8a0f7fdC8Aa88a89b92e9Ab5FdB`**