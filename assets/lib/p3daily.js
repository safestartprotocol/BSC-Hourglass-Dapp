window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
			setupJUST();
			startDapp();
			getLotteryWinners();
		
			var filter = web3.eth.filter('latest');

			filter.watch(function(error, result){
			  startDapp();
			});
			
			setInterval(increase, 1000);
			} catch (error) {
					alert('Reload this page and enable access to use this dapp!');
			}
    }
    // Legacy dapp browsers...
    else if (window.web3) {
		window.web3 = new Web3(web3.currentProvider);
		setupJUST();
		startDapp();
		getLotteryWinners();
		
		var filter = web3.eth.filter('latest');

		filter.watch(function(error, result){
		  startDapp();
		});
		
		setInterval(increase, 1000);
    }
    // Non-dapp browsers...
    else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

let el = function(id){ return document.querySelector(id);};

let p3dailyAddress = '0xe448c94856b36ffb701FB5A578452d32F52788ea';
let p3dailyContract = web3.eth.contract([ { "constant": true, "inputs": [], "name": "myTickets", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawFromVault", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "timeLeft", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isRoundOver", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "potentialWinner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "jackpotSize", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "validate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "PRICE_PER_TICKET", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "validatorReward", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "rounds", "outputs": [ { "name": "pot", "type": "uint256" }, { "name": "ticketsSold", "type": "uint256" }, { "name": "blockNumber", "type": "uint256" }, { "name": "startTime", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ticketsPurchased", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "currentRoundNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ROUND_LENGTH", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "myVault", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_number", "type": "uint256" } ], "name": "getTicketOwner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_howMany", "type": "uint256" } ], "name": "purchaseTicket", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "blocksUntilNewPotentialWinner", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_howMany", "type": "uint256" } ], "name": "purchaseFromVault", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "player", "type": "address" }, { "indexed": true, "name": "amount", "type": "uint256" } ], "name": "TicketsPurchased", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "winner", "type": "address" }, { "indexed": true, "name": "winnings", "type": "uint256" }, { "indexed": true, "name": "ticket", "type": "uint256" } ], "name": "LotteryWinner", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "player", "type": "address" }, { "indexed": true, "name": "amaount", "type": "uint256" } ], "name": "WithdrawVault", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "validator", "type": "address" }, { "indexed": true, "name": "reward", "type": "uint256" } ], "name": "Validator", "type": "event" } ]);
let p3dailyInstance = p3dailyContract.at(p3dailyAddress);

let p3dInstance;
let playerBookInstance;

let time;
let over = false;

let lastPurchased;
let participantList;

function increase() {
	if(!over) {
		if(time > 0) {
			time--;
			let timer = convertSeconds(time);
			el('#timeleft').innerHTML = String(timer.h).padStart(2,0) + ':' + String(timer.m).padStart(2,0) + ':' + String(timer.s).padStart(2,0);
		} else {
			el('#timeleft').innerHTML = "00:00:00";
		}
	}
}

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }

      resolve(res);
    })
  );
  
async function getLotteryWinners() {
	const winners = await promisify(eventResult => p3dailyInstance.LotteryWinner({}, { fromBlock: 6497000, toBlock: 'latest' }).get(eventResult));
	for(let i = 0; i < winners.length; i++) {
		let winner = winners[i].args.winner;
		let winnings = winners[i].args.winnings;
		if(i < winners.length - 1) {
				addressToName(winner, function(name){
					el('#winners').innerHTML += '<b>' + name + '</b> - won ' + web3.fromWei(winnings, 'ether').toFixed(4) + ' ETH<br>';
				})
			} else {
				addressToName(winner, function(name){
					el('#lastwinner').innerHTML = '<b>' + name + '</b> - won ' + web3.fromWei(winnings, 'ether').toFixed(4) + ' ETH<br>';
				})
			}
	}
}

async function getCurrentParticipants(howMany) {
	if(parseInt(lastPurchased) == parseInt(howMany)) {
		return;
	}
	lastPurchased = howMany;
	el('#participants').innerHTML = '';
	participantList = {};
	const ticketsPurchased = await promisify(eventResult => p3dailyInstance.TicketsPurchased({}, { fromBlock: 6497000, toBlock: 'latest' }).get(eventResult));
	for(let i = ticketsPurchased.length - 1; i > ticketsPurchased.length - howMany; i--) {
		let participant = ticketsPurchased[i].args.player;
		let tickets = ticketsPurchased[i].args.amount;
		if(participantList[participant] != undefined) {
			participantList[participant] = parseInt(participantList[participant]) +  parseInt(tickets);
		} else {
			participantList[participant] = tickets;
		}
	}
	
	for(let i = 0; i < participantList.length; i++) {
		addressToName(participant, function(name){
			el('#participants').innerHTML += '<b>' + name + '</b> (' + participantList[participant] + ' tickets)<br>';
		})
	}
	
	var keys = Object.keys(participantList);
	for(let i = 0; i < Object.keys(participantList).length; i++) {
		addressToName(keys[i], function(name){
			el('#participants').innerHTML += '<b>' + name + '</b> (' + participantList[keys[i]] + ' tickets)<br>';
		})
	}
}
	
function startDapp() {
	
	p3dailyInstance.jackpotSize((error, jackpot) => {
		el('#jackpot').innerHTML = 'Jackpot: ' + web3.fromWei(jackpot, 'ether').toFixed(4) + ' ETH';
	});
	
	p3dailyInstance.isRoundOver((error, isRoundOver) => {
		if(isRoundOver) {
			over = true;
			el('#timeleft').innerHTML = "ROUND ENDED - WAITING FOR RESULT"
		
			p3dailyInstance.validatorReward((error, reward) => {
				el('#option1').innerHTML = "Validator Reward: " + web3.fromWei(reward, 'ether').toFixed(4) + ' ETH';;
			});
			el('#option2').innerHTML = '<button type="button" class="btn btn-sample" role="button" onclick="validate()" style="margin-bottom: 10px;">Validate Round</button>';

		} else {
			over = false;
			el('#option1').innerHTML = '<input id="howmany" type="number" value="1" min="1"step="1" style="text-align:center"/>';
			el('#option2').innerHTML = '<button type="button" class="btn btn-sample" role="button" onclick="buyTickets()" style="margin-bottom: 10px;">Buy Tickets (0.01 ETH/Ticket)</button>';
		}
	});
	
	p3dailyInstance.timeLeft((error, timeLeft) => {
		time = timeLeft;
	});
	
	p3dInstance.balanceOf(p3dailyAddress, (error, result) => {
		el('#p3d').innerHTML = 'P3D locked up: ' + web3.fromWei(result, 'ether').toFixed(4) + ' P3D';
	});
	
	p3dailyInstance.ticketsPurchased((error, ticketsPurchased) => {
		el('#ticketsPurchased').innerHTML = 'Tickets purchased: ' + ticketsPurchased;
		getCurrentParticipants(ticketsPurchased);
	});
	
	web3.eth.getAccounts((error, accounts) => {
		let account = accounts[0];
		addressToName(account, function(name){
			el('#playeraddress').innerHTML = name;
		})
		p3dailyInstance.myTickets({from:account}, (error, tickets) => {
			el('#tickets').innerHTML = 'Your Tickets: ' + tickets;
		});
		
		p3dailyInstance.myVault({from:account}, (error, vault) => {
			el('#vault').innerHTML = 'Your Vault: ' + web3.fromWei(vault, 'ether').toFixed(4) + ' ETH';
			if(vault > 0) {
				if(!over) {
					el('#option3').innerHTML = '<button type="button" class="btn btn-sample" role="button" onclick="buyTicketsVault()" style="margin-bottom: 10px;">Buy Tickets (Using Vault)</button>';
				} else {
					el('#option3').innerHTML = '';
				}
				el('#option4').innerHTML = '<button type="button" class="btn btn-sample" role="button" onclick="withdraw()" style="margin-bottom: 10px;">Withdraw From Vault</button>';
			} else {
				el('#option3').innerHTML = '';
				el('#option4').innerHTML = '';
			}
		});
	});
}

function convertSeconds(s) {
  var d, h, m, s;
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return { d: d, h: h, m: m, s: s };
};

function setupJUST() {
	let p3dAddress = '0xB3775fB83F7D12A36E0475aBdD1FCA35c091efBe';
	let p3dContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"dividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ethereumToSpend","type":"uint256"}],"name":"calculateTokensReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokensToSell","type":"uint256"}],"name":"calculateEthereumReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"onlyAmbassadors","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"administrators","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakingRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_includeReferralBonus","type":"bool"}],"name":"myDividends","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalEthereumBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amountOfTokens","type":"uint256"}],"name":"setStakingRequirement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_identifier","type":"bytes32"},{"name":"_status","type":"bool"}],"name":"setAdministrator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"myTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"disableInitialStage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_toAddress","type":"address"},{"name":"_amountOfTokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_symbol","type":"string"}],"name":"setSymbol","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amountOfTokens","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_referredBy","type":"address"}],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"reinvest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"incomingEthereum","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"},{"indexed":true,"name":"referredBy","type":"address"}],"name":"onTokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"tokensBurned","type":"uint256"},{"indexed":false,"name":"ethereumEarned","type":"uint256"}],"name":"onTokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethereumReinvested","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"}],"name":"onReinvestment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethereumWithdrawn","type":"uint256"}],"name":"onWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"}]);
	p3dInstance = p3dContract.at(p3dAddress);

	let playerBookAddress = '0xD60d353610D9a5Ca478769D371b53CEfAA7B6E4c';
	let playerBookContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"addMeToAllGames","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_whatFunction","type":"bytes32"}],"name":"deleteAnyProposal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pIDxAddr_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"registrationFee_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNameFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"}],"name":"plyrNames_","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"gameNames_","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"pIDxName_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"address"},{"name":"_all","type":"bool"}],"name":"registerNameXaddr","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_gameAddress","type":"address"},{"name":"_gameNameStr","type":"string"}],"name":"addGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"pID_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"bytes32"},{"name":"_all","type":"bool"}],"name":"registerNameXname","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_nameStr","type":"string"}],"name":"checkIfNameValid","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_affCode","type":"bytes32"},{"name":"_all","type":"bool"}],"name":"registerNameXnameFromDapp","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_whatFunction","type":"bytes32"},{"name":"_signerA","type":"uint256"},{"name":"_signerB","type":"uint256"},{"name":"_signerC","type":"uint256"}],"name":"checkSignersByAddress","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gameID","type":"uint256"}],"name":"addMeToGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"uint256"},{"name":"_all","type":"bool"}],"name":"registerNameXID","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"plyrNameList_","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_whatFunction","type":"bytes32"}],"name":"checkData","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_affCode","type":"address"},{"name":"_all","type":"bool"}],"name":"registerNameXaddrFromDapp","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"}],"name":"useMyOldName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gID_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_affCode","type":"uint256"},{"name":"_all","type":"bool"}],"name":"registerNameXIDFromDapp","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"setRegistrationFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"games_","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"gameIDs_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"plyr_","outputs":[{"name":"addr","type":"address"},{"name":"name","type":"bytes32"},{"name":"laff","type":"uint256"},{"name":"names","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerLAff","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"getPlayerID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_whatFunction","type":"bytes32"},{"name":"_signerA","type":"uint256"},{"name":"_signerB","type":"uint256"},{"name":"_signerC","type":"uint256"}],"name":"checkSignersByName","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"playerID","type":"uint256"},{"indexed":true,"name":"playerAddress","type":"address"},{"indexed":true,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"isNewPlayer","type":"bool"},{"indexed":false,"name":"affiliateID","type":"uint256"},{"indexed":false,"name":"affiliateAddress","type":"address"},{"indexed":false,"name":"affiliateName","type":"bytes32"},{"indexed":false,"name":"amountPaid","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"onNewName","type":"event"}])
	playerBookInstance = playerBookContract.at(playerBookAddress);
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

function buyTickets() {
	p3dailyInstance.purchaseTicket(el('#howmany').value, {value: el('#howmany').value * web3.toWei(0.01, 'ether')}, (error) => {
	});
}

function buyTicketsVault() {
	p3dailyInstance.purchaseFromVault(el('#howmany').value, (error) => {
	});
}

function withdraw() {
	p3dailyInstance.withdrawFromVault((error) => {
	});
}

function validate() {
	p3dailyInstance.validate({gas:200000}, (error) => {
	});
}
