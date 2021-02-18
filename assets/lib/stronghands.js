window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
			startDapp();

			} catch (error) {
					alert('Reload this page and enable access to use this dapp!');
			}
    }
    // Legacy dapp browsers...
    else if (window.web3) {
		window.web3 = new Web3(web3.currentProvider);
		startDapp();
    }
    // Non-dapp browsers...
    else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

let el = function(id){ return document.querySelector(id);};

let strongHandsManagerAddress = '0x3C0Cd870bB7Ed4DadD80C8313645b9107b34e259';
let strongHandsManagerContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"myStrongHand","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isStrongHand","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_unlockAfterNDays","type":"uint256"}],"name":"create","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"strongHands","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"strongHand","type":"address"}],"name":"CreatedStrongHand","type":"event"}]);
let strongHandsManagerInstance = strongHandsManagerContract.at(strongHandsManagerAddress);

strongHandContract = web3.eth.contract([ { "constant": true, "inputs": [], "name": "creationDate", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawDividends", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "buyWithBalance", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_howManyDays", "type": "uint256" } ], "name": "extendLock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "unlockAfterNDays", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isLocked", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "buy", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_toAddress", "type": "address" }, { "name": "_amountOfTokens", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "lockedUntil", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" } ], "name": "sell", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "dividendsOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "reinvest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_unlockAfterNDays", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" } ]);
let myStrongHandInstance;

let playerBookAddress = '0xD60d353610D9a5Ca478769D371b53CEfAA7B6E4c';
let playerBookContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"addMeToAllGames","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_whatFunction","type":"bytes32"}],"name":"deleteAnyProposal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pIDxAddr_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"registrationFee_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNameFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"}],"name":"plyrNames_","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"gameNames_","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"pIDxName_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"address"},{"name":"_all","type":"bool"}],"name":"registerNameXaddr","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_gameAddress","type":"address"},{"name":"_gameNameStr","type":"string"}],"name":"addGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"pID_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"bytes32"},{"name":"_all","type":"bool"}],"name":"registerNameXname","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_nameStr","type":"string"}],"name":"checkIfNameValid","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_affCode","type":"bytes32"},{"name":"_all","type":"bool"}],"name":"registerNameXnameFromDapp","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_whatFunction","type":"bytes32"},{"name":"_signerA","type":"uint256"},{"name":"_signerB","type":"uint256"},{"name":"_signerC","type":"uint256"}],"name":"checkSignersByAddress","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gameID","type":"uint256"}],"name":"addMeToGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"uint256"},{"name":"_all","type":"bool"}],"name":"registerNameXID","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"plyrNameList_","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_whatFunction","type":"bytes32"}],"name":"checkData","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_affCode","type":"address"},{"name":"_all","type":"bool"}],"name":"registerNameXaddrFromDapp","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"}],"name":"useMyOldName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gID_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_affCode","type":"uint256"},{"name":"_all","type":"bool"}],"name":"registerNameXIDFromDapp","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"setRegistrationFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"games_","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"gameIDs_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"plyr_","outputs":[{"name":"addr","type":"address"},{"name":"name","type":"bytes32"},{"name":"laff","type":"uint256"},{"name":"names","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerLAff","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"getPlayerID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_whatFunction","type":"bytes32"},{"name":"_signerA","type":"uint256"},{"name":"_signerB","type":"uint256"},{"name":"_signerC","type":"uint256"}],"name":"checkSignersByName","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"playerID","type":"uint256"},{"indexed":true,"name":"playerAddress","type":"address"},{"indexed":true,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"isNewPlayer","type":"bool"},{"indexed":false,"name":"affiliateID","type":"uint256"},{"indexed":false,"name":"affiliateAddress","type":"address"},{"indexed":false,"name":"affiliateName","type":"bytes32"},{"indexed":false,"name":"amountPaid","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"onNewName","type":"event"}])
playerBookInstance = playerBookContract.at(playerBookAddress);

function startDapp() {
	myStrongHand();
	searchStrongHands();
}

function myStrongHand() {
	strongHandsManagerInstance.isStrongHand((error, isStrongHand) => {
		if(isStrongHand) {
			el('#mystronghand').innerHTML ='<table><thead><tr><th>Contract Address</th><th>Balance</th><th>Dividends</th><th>Status</th><th>Total Lock Time (days)</th><th>Created</th></tr></thead><tbody><tr><td id="address"></td><td id="myp3dbalance"></td><td id="mydividends"></td><td id="mystatus"></td><td id="locktime"></td><td id="created"></td></tr></tbody></table>';
			
			el('#mystronghand').innerHTML += '<input id="buyamount" type="number" placeholder="Amount to spend (ETH)"/>'
			el('#mystronghand').innerHTML += ' <button type="button" onclick="buyP3D()">Buy/Lock up P3D</button>'
			el('#mystronghand').innerHTML += ' <button type="button" onclick="withdrawDividends()">Withdraw Dividends</button>'
			el('#mystronghand').innerHTML += ' <button type="button" onclick="reinvestDividends()">Reinvest Dividends</button>'
			el('#mystronghand').innerHTML += ' <input id="extendlocktime" type="number" placeholder="lock time (days)" min="1"step="1"/>'
			el('#mystronghand').innerHTML += ' <button type="button" onclick="extendLock()">Extend Lock Time</button>'
			
			strongHandsManagerInstance.myStrongHand((error, myStrongHandAddress) => {
				el('#address').innerHTML = myStrongHandAddress;
				
				myStrongHandInstance = strongHandContract.at(myStrongHandAddress);
				
				myStrongHandInstance.balanceOf((error, myP3dBalance) => {
					el('#myp3dbalance').innerHTML = web3.fromWei(myP3dBalance, 'ether').toFixed(6) + ' P3D';
				});
				
				myStrongHandInstance.dividendsOf((error, myDividends) => {
					el('#mydividends').innerHTML = web3.fromWei(myDividends, 'ether').toFixed(6) + ' ETH';
				});
				
				myStrongHandInstance.isLocked((error, isLocked) => {
					if(isLocked) {
						myStrongHandInstance.lockedUntil((error, lockedUntil) => {
							el('#mystatus').innerHTML = '<b>LOCKED UNTIL</b> ' + new Date(lockedUntil * 1000);
						});
					} else {
						el('#mystatus').innerHTML = '<b>UNLOCKED</b>';
						
						el('#mystronghand').innerHTML += ' <input id="sellamount" type="number" placeholder="Amaount to sell (P3D)"/>'
						el('#mystronghand').innerHTML += ' <button type="button" onclick="sell()">Sell P3D</button>'
					}
				});
				
				myStrongHandInstance.unlockAfterNDays((error, unlockAfterNDays) => {
					el('#locktime').innerHTML = unlockAfterNDays;
				});
			
				myStrongHandInstance.creationDate((error, creationDate) => {
					el('#created').innerHTML = new Date(creationDate * 1000);
				});
			});
		
		} else {
			el('#mystronghand').innerHTML = '<input id="locktime" type="number" placeholder="LOCK TIME (days)" min="0"step="1"/>'
			el('#mystronghand').innerHTML += '<button type="button" onclick="getStrong()">Become a Strong Hand!</button>'
		}
	});
}

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }

      resolve(res);
    })
  );
  
async function searchStrongHands() {
const events = await promisify(eventResult => strongHandsManagerInstance.CreatedStrongHand({}, { fromBlock: 6476646, toBlock: 'latest' }).get(eventResult));
	for(let i = 0; i < events.length; i++) {
		let ownerAddress = events[i].args.owner;
		let strongHandAddress = events[i].args.strongHand;
		let strongHandInstance = strongHandContract.at(strongHandAddress);
		
		const balance = await promisify(p3dBalance => strongHandInstance.balanceOf(p3dBalance));
		if(balance > 0) {
			el('#stronghands').innerHTML+= '<tr><td id="owner' + i + '"><td id="p3dbalance' + i + '"></td><td id="status' + i + '"></td></tr>';
		
			el('#p3dbalance' + i).innerHTML = web3.fromWei(balance, 'ether').toFixed(6) + ' P3D';
			
			addressToName(ownerAddress, function(name){
				el('#owner' + i).innerHTML = name;
			})
		
			strongHandInstance.isLocked((error, isLocked) => {
				if(isLocked) {
					strongHandInstance.lockedUntil((error, lockedUntil) => {
						el('#status' + i).innerHTML = '<b>LOCKED UNTIL</b> ' + new Date(lockedUntil * 1000);
					});
				} else {
					el('#status' + i).innerHTML = '<b>UNLOCKED</b>';
				}
			});
		}
	}	
}

function addressToName(address, x) {
	playerBookInstance.pIDxAddr_(address, function(error, pid){
			if(pid != 0) {
				playerBookInstance.getPlayerName(pid, function(error, name){
					if(name != 0) {
							x(web3.toAscii(name));
					} else {
							x(address);
					}
				})
			} else {
				x(address);
			}
	})
}

function getStrong() {
	strongHandsManagerInstance.create(el('#locktime').value, (error, result) => {
	});
}

function buyP3D() {
	myStrongHandInstance.buy({value: web3.toWei(el('#buyamount').value, 'ether')}, (error, result) => {
	});
}

function withdrawDividends() {
	myStrongHandInstance.withdrawDividends((error, result) => {
	});
}

function reinvestDividends() {
	myStrongHandInstance.reinvest((error, result) => {
	});
}

function extendLock() {
	myStrongHandInstance.extendLock(el('#extendlocktime').value, (error, result) => {
	});
}

function sell() {
	myStrongHandInstance.sell(web3.toWei(el('#sellamount').value, 'ether'), (error, result) => {
	});
}