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

let mnAddress = '0xF0EA6CE7d210Ee58e83a463Af13989B5c2DbE108';
let el = function(id){ return document.querySelector(id);};
let sacrific3dAddress;
let sacrific3dContract;
let p3dInstance;
let playerBookInstance;

let offerSize;

//strings
let stageStringEN = 'Stage';
let p3dStatsStringEN = 'P3D Stats';
let altarStringEN = 'Your Altar';
let earningsStringEN = 'Your Earnings:';
let offerButtonStringEN = 'images/offeringEN.png';
let validateButtonStringEN = 'VALIDATE STAGE';
let offerVaultButtonStringEN = 'USE EARNINGS FOR OFFER';
let withdrawButtonStringEN = 'WITHDRAW EARNINGS';
let playerNumberStringEN = 'players enter the stage to offer themselves to the gods.'
let offerSize1StringEN = 'Every player pays';
let offerSize2StringEN = 'as offer.';
let winnings1StringEN = '<b>1</b> player is sacrific3d and loses his offer but receives dividends from';
let winnings2StringEN = 'which is bought every round and is locked up in the contract.';
let winnings3StringEN = 'Everyone else receives';
let winnings4StringEN = 'back as gift from the gods.';
let currentStageStringEN = 'Stage:';
let currentPlayersStringEN = 'Players:';
let dividendsStringEN = 'Dividends:';
let lockedUpStringEN = 'P3D locked up:';
let recentlySacrificedStringEN = 'has been sacrific3d recently';
let openStringEN = 'OPEN';
let waitingForMoreStringEN = 'Waiting for more players...';
let waitingForNewStringEN = 'Waiting for more offers...';
let sacrificeChosenStringEN = 'SACRIFICE CHOSEN';
let actionRequiredStringEN = 'ACTION REQUIRED';
let interactStringEN = 'Interact with the contract so that the gods can choose their sacrifice!';

let stageStringCHI = '阶段';
let p3dStatsStringCHI = 'P3D 统计';
let altarStringCHI = '你的祭坛';
let earningsStringCHI = '你的收入：';
let offerButtonStringCHI = 'images/offeringCH.png';
let validateButtonStringCHI = '验证阶段';
let offerVaultButtonStringCHI = '使用祭坛的收入来支付';
let withdrawButtonStringCHI = '提现收入';
let playerNumberStringCHI = '名玩家上台向众神献祭。'
let offerSize1StringCHI = '每名玩家支付';
let offerSize2StringCHI = '作为祭品。';
let winnings1StringCHI = '其中一名玩家将会牺牲，并且失去他的祭品，但从';
let winnings2StringCHI = '得到分红。P3D每轮都会购买并锁定在智能合约中。';
let winnings3StringCHI = '其他玩家从神那里得到';
let winnings4StringCHI = '作为礼物。';
let currentStageStringCHI = '现阶段：';
let currentPlayersStringCHI = '当前玩家：';
let dividendsStringCHI = '分红：';
let lockedUpStringCHI = '锁定在智能合约中的P3D：';
let recentlySacrificedStringCHI = '最近牺牲了';
let openStringCHI = '进行中';
let waitingForMoreStringCHI = '等待更多献祭...';
let waitingForNewStringCHI = '等待新的献祭...';
let sacrificeChosenStringCHI = '祭品选择';
let actionRequiredStringCHI = '需要采取行动';
let interactStringCHI = '与合约交互，以便众神可以选择祭品！';

let stageString;
let p3dStatsString;
let alterString;
let earningsString;
let offerButtonString;
let validateButtonString;
let offerVaultButtonString;
let withdrawButtonString;
let playerNumberString;
let offerSize1String;
let offerSize2String;
let winnings1String;
let winnings2String;
let winnings3String;
let winnings4String;
let currentStageString;
let currentPlayersString;
let dividendsString;
let lockedUpString;
let recentlySacrificedString;
let openString;
let waitingForMoreString;
let waitingForNewString;
let sacrificeChosenString;
let actionRequiredString;
let interactString;

let sacStrings =
				[
				"has been sacrific3d",
				"was a worthy sacrifice",
				"was chosen by the gods"
				];
				
let slaStrings =
				[
				"has been slaughter3d",
				"was knocked out",
				"has been eliminated",
				"stepped on snek",
				"bought into clones and lost it all"
				];
				
function startDapp() {
	initialLanguage();
	setupJUST()
	small();
	setInterval(main, 60000);
}

function small() {
	sacrific3dAddress = '0x4fac33dAbFd83d160717dFee4175d9cAaA249CA5';
	sacrific3dContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"offerAsSacrificeFromVault","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"OFFER_SIZE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"offerAsSacrifice","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"winningsPerRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentPlayers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numberOfStages","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_PLAYERS_PER_STAGE","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"myEarnings","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"player","type":"address"}],"name":"SacrificeOffered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sarifice","type":"address"}],"name":"SacrificeChosen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"player","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"EarningsWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"stage","type":"uint256"}],"name":"StageInvalidated","type":"event"}]);
	el('#validate').hidden = true;
	main();
}

function medium() {
	sacrific3dAddress = '0x1B43f7543164eaD3DaC0393AAebAaF3b35c459C2';
	sacrific3dContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"offerAsSacrificeFromVault","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"OFFER_SIZE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"offerAsSacrifice","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"winningsPerRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentPlayers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"tryFinalizeStage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numberOfStages","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_PLAYERS_PER_STAGE","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"myEarnings","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"player","type":"address"}],"name":"SacrificeOffered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sarifice","type":"address"}],"name":"SacrificeChosen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"player","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"EarningsWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"stage","type":"uint256"}],"name":"StageInvalidated","type":"event"}]);
	el('#validate').hidden = false;
	main();
}

function large() {
	sacrific3dAddress = '0xb172BB8BAae74F27Ade3211E0c145388d3b4f8d8';
	sacrific3dContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"DonateToLosers","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"contractownsthismanyP3D","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"RefundWaitingLine","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentstageplayer1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"previousstageloser","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NextAtLineEnd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"previousstageplayer2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"jackpotinfo","outputs":[{"name":"SizeOfJackpot","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"OFFER_SIZE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Jackpot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"masternode","type":"address"}],"name":"Expand","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"MN","type":"address"}],"name":"offerAsSacrifice","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"currentstageplayer2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"van","type":"string"},{"name":"masternode","type":"address"}],"name":"changevanity","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"checkstatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ETHtoP3Dbymasternode","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"DivsToRefundpot","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"stages","outputs":[{"name":"numberOfPlayers","type":"uint8"},{"name":"blocknumber","type":"uint256"},{"name":"finalized","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Vanity","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"winningsPerRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"previousstageplayer1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentPlayers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NextInLine","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"tryFinalizeStage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"Refundpot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SPASMfee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numberOfStages","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Payoutnextrefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"theplayer","type":"address"}],"name":"playervanity","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_PLAYERS_PER_STAGE","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextonetogetpaid","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"MN","type":"address"}],"name":"offerAsSacrificeFromVault","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Loser","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"myEarnings","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"winner","type":"address"},{"indexed":false,"name":"SizeOfJackpot","type":"uint256"}],"name":"JackpotWon","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"player","type":"address"}],"name":"SacrificeOffered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sarifice","type":"address"}],"name":"SacrificeChosen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"player","type":"address"},{"indexed":true,"name":"amount","type":"uint256"}],"name":"EarningsWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"stage","type":"uint256"}],"name":"StageInvalidated","type":"event"}]);
	el('#validate').hidden = false;
	main();
}

function offer() {
	if(sac) {
		sacrific3dInstance.offerAsSacrifice({value:offerSize, gas:350000}, function(error, result){})
	} else {
		sacrific3dInstance.offerAsSacrifice(mnAddress, {value:offerSize, gas:400000}, function(error, result){})
	}
}

function validate() {
	sacrific3dInstance.tryFinalizeStage(function(error, result){})
}
	
function offervault() {
	if(sac) {
		sacrific3dInstance.offerAsSacrificeFromVault({gas:350000}, function(error, result){})
	} else {
		sacrific3dInstance.offerAsSacrificeFromVault(mnAddress, {gas:400000}, function(error, result){})
	}
}
	
function withdraw() {
	sacrific3dInstance.withdraw(function(error, result){})
}
	
function main() {
	changeStaticText();
	sacrific3dInstance = sacrific3dContract.at(sacrific3dAddress);
	checkLastSacrific3d();
	enableButtons();

	sacrific3dInstance.MAX_PLAYERS_PER_STAGE(function(error, maxPlayers){
		el('#playersize').innerHTML = '<b>' + maxPlayers + '</b> ' + playerNumberString;
		sacrific3dInstance.currentPlayers(function(error, result){
			el('#players').innerHTML = currentPlayersString + ' <b>' + result + '/' + maxPlayers +'</b>';
			listCurrentPlayers(result);
			determineStageStatus(result, maxPlayers);
		})
	})
	
	sacrific3dInstance.OFFER_SIZE(function(error, result){
		offerSize = result;
		el('#offersize').innerHTML = offerSize1String + ' <b>' + web3.fromWei(result, 'ether') + ' ETH</b> ' + offerSize2String;
		checkAltar();
	})
	
	sacrific3dInstance.winningsPerRound(function(error, result){
		if(sac)
		{	
		el('#winnings').innerHTML = winnings1String + ' <a href="http://p3d.stronghand.me" target="_blank"><b>P3D</b></a> ' + winnings2String + '</br>' + winnings3String
		} else {
			el('#winnings').innerHTML = '<b>1</b> player is slaughter3d and loses his offer but gets added to the line for a refund which occurs every 20 games.</br> The winner receives';
		}
		el('#winnings').innerHTML += ' <b>' + web3.fromWei(result, 'ether')
		+ ' ETH</b> ' + winnings4String;
	})
	
	sacrific3dInstance.numberOfStages(function(error, result){
		el('#stage').innerHTML = currentStageString + ' <b>' + result + '</b>';
	})
	
	p3dInstance.myDividends(true, {from: sacrific3dAddress} , function(error, result){
		el('#sac').innerHTML = dividendsString + ' <b>' + web3.fromWei(result, 'ether').toFixed(8) + ' ETH</b>';
	});
	
	p3dInstance.balanceOf(sacrific3dAddress, function(error, result){
		el('#p3d').innerHTML = lockedUpString + ' <b>' + web3.fromWei(result, 'ether').toFixed(6) + ' P3D</b>';
	})
}

function setupJUST() {
	let p3dAddress = '0xB3775fB83F7D12A36E0475aBdD1FCA35c091efBe';
	let p3dContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"dividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ethereumToSpend","type":"uint256"}],"name":"calculateTokensReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokensToSell","type":"uint256"}],"name":"calculateEthereumReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"onlyAmbassadors","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"administrators","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakingRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_includeReferralBonus","type":"bool"}],"name":"myDividends","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalEthereumBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amountOfTokens","type":"uint256"}],"name":"setStakingRequirement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_identifier","type":"bytes32"},{"name":"_status","type":"bool"}],"name":"setAdministrator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"myTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"disableInitialStage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_toAddress","type":"address"},{"name":"_amountOfTokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_symbol","type":"string"}],"name":"setSymbol","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amountOfTokens","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_referredBy","type":"address"}],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"reinvest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"incomingEthereum","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"},{"indexed":true,"name":"referredBy","type":"address"}],"name":"onTokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"tokensBurned","type":"uint256"},{"indexed":false,"name":"ethereumEarned","type":"uint256"}],"name":"onTokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethereumReinvested","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"}],"name":"onReinvestment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethereumWithdrawn","type":"uint256"}],"name":"onWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"}]);
	p3dInstance = p3dContract.at(p3dAddress);

	let playerBookAddress = '0xD60d353610D9a5Ca478769D371b53CEfAA7B6E4c';
	let playerBookContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"addMeToAllGames","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_whatFunction","type":"bytes32"}],"name":"deleteAnyProposal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pIDxAddr_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"registrationFee_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNameFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"}],"name":"plyrNames_","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"gameNames_","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"pIDxName_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"address"},{"name":"_all","type":"bool"}],"name":"registerNameXaddr","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_gameAddress","type":"address"},{"name":"_gameNameStr","type":"string"}],"name":"addGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"pID_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"bytes32"},{"name":"_all","type":"bool"}],"name":"registerNameXname","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_nameStr","type":"string"}],"name":"checkIfNameValid","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_affCode","type":"bytes32"},{"name":"_all","type":"bool"}],"name":"registerNameXnameFromDapp","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_whatFunction","type":"bytes32"},{"name":"_signerA","type":"uint256"},{"name":"_signerB","type":"uint256"},{"name":"_signerC","type":"uint256"}],"name":"checkSignersByAddress","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gameID","type":"uint256"}],"name":"addMeToGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"uint256"},{"name":"_all","type":"bool"}],"name":"registerNameXID","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"plyrNameList_","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_whatFunction","type":"bytes32"}],"name":"checkData","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_affCode","type":"address"},{"name":"_all","type":"bool"}],"name":"registerNameXaddrFromDapp","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"}],"name":"useMyOldName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gID_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_affCode","type":"uint256"},{"name":"_all","type":"bool"}],"name":"registerNameXIDFromDapp","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"setRegistrationFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"games_","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"gameIDs_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"plyr_","outputs":[{"name":"addr","type":"address"},{"name":"name","type":"bytes32"},{"name":"laff","type":"uint256"},{"name":"names","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerLAff","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"getPlayerID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_whatFunction","type":"bytes32"},{"name":"_signerA","type":"uint256"},{"name":"_signerB","type":"uint256"},{"name":"_signerC","type":"uint256"}],"name":"checkSignersByName","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"playerID","type":"uint256"},{"indexed":true,"name":"playerAddress","type":"address"},{"indexed":true,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"isNewPlayer","type":"bool"},{"indexed":false,"name":"affiliateID","type":"uint256"},{"indexed":false,"name":"affiliateAddress","type":"address"},{"indexed":false,"name":"affiliateName","type":"bytes32"},{"indexed":false,"name":"amountPaid","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"onNewName","type":"event"}])
	playerBookInstance = playerBookContract.at(playerBookAddress);
}

function checkLastSacrific3d() {
	el('#history').innerHTML = '<br><h5 style="color:white;">Recently Sacrific3d</h5><p id="lastsaced" style="color:#dc3545;"></p> <button id="more" type="button"  class="btn btn-secondary" role="button" style="margin-bottom: 10px;" data-toggle="collapse" data-target="#allsaced">Show More</button> <p id="allsaced" class="collapse" style="color:#dc3545;"></p>';
	el('#more').disabled = true;
	sacrific3dInstance.SacrificeChosen({}, {fromBlock: 6300000, toBlock: 'latest'}).get((error, eventResult) => {
		for(let i = eventResult.length - 4; i < eventResult.length; i++) {
			let sacrific3dPlayer = eventResult[i].args.sarifice;
			if(i < eventResult.length - 1) {
				addressToName(sacrific3dPlayer, function(name){
					el('#allsaced').innerHTML += '<b>' + name + '</b> ' + randomString() + '<br>';
				})
			} else {
				el('#more').disabled = false;
				addressToName(sacrific3dPlayer, function(name){
					el('#lastsaced').innerHTML = '<b>' + name + '</b> ' + randomString();
				})
			}
		}
	});
}

function randomString() {
				
	if(sac) {return sacStrings[Math.floor(Math.random() * sacStrings.length)];}
	else	{return slaStrings[Math.floor(Math.random() * slaStrings.length)];}
}

function listCurrentPlayers(players) {
	sacrific3dInstance.SacrificeOffered({}, { fromBlock: 7760500, toBlock: 'latest' }).get((error, eventResult) => {
		for(let i = 0; i < players; i++) {
			addressToName(eventResult[eventResult.length - 1 - i].args.player, function(name){
				el('#players').innerHTML += '<br><b>' + name + '</b>';
			})
		}
	});
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

function determineStageStatus(players, maxPlayers) {
	if(players < maxPlayers) {
		el('#status').innerHTML = '<span style="color:green"><b>' + openString + '</b></span> - ' + waitingForMoreString;
	}
	else {
		web3.eth.getStorageAt(sacrific3dAddress, 4, function(error, result){
			let finalizedRound = result;
			web3.eth.getStorageAt(sacrific3dAddress, 5, function(error, result){
				let currentRound = result;
				if(finalizedRound == currentRound) {
					el('#status').innerHTML = '<span style="color:orange"><b>' + sacrificeChosenString + '</b></span> - ' + waitingForNewString;
				} else {
					el('#status').innerHTML = '<span style="color:#dc3545"><b>' + actionRequiredString + '</b></span> - ' + interactString;
				}
			})
		})
	}
}

function enableButtons() {
	el('#small').disabled = false;
	el('#medium').disabled = false;
	el('#large').disabled = false;
	
	el('#offer').disabled = false;
}

function checkAltar() {
	web3.eth.getAccounts(function(error, accounts){
		addressToName(accounts[0], function(name){
			el('#playeraddress').innerHTML = name;
		})
	})
	
	sacrific3dInstance.myEarnings(function(error, result){
		el('#vault').innerHTML = earningsString;
		if(result > 0) {
			el('#vault').innerHTML +=' <b>' + web3.fromWei(result, 'ether').toFixed(8) + ' ETH</b>';
			el('#withdraw').disabled = false;
		} else {
			el('#vault').innerHTML += ' <b>0 ETH</b>';
			el('#withdraw').disabled = true;
		}
		if(result >= offerSize) {
			el('#offervault').disabled = false;
		} else {
			el('#offervault').disabled = true;
		}
	})
}

function changeStaticText() {
	el('#offer').src = offerButtonString;
	el('#offervault').innerHTML = offerVaultButtonString;
	el('#withdraw').innerHTML = withdrawButtonString;
	el('#validate').innerHTML = validateButtonString;
}

function initialLanguage() {
	stageString = stageStringEN;
	p3dStatsString = p3dStatsStringEN;
	altarString = altarStringEN;
	earningsString = earningsStringEN;
	offerButtonString = offerButtonStringEN;
	validateButtonString = validateButtonStringEN;
	offerVaultButtonString = offerVaultButtonStringEN;
	withdrawButtonString = withdrawButtonStringEN;
	playerNumberString = playerNumberStringEN;
	offerSize1String = offerSize1StringEN;
	offerSize2String = offerSize2StringEN;
	winnings1String = winnings1StringEN;
	winnings2String = winnings2StringEN;
	winnings3String = winnings3StringEN;
	winnings4String = winnings4StringEN;
	currentStageString = currentStageStringEN;
	currentPlayersString = currentPlayersStringEN;
	dividendsString = dividendsStringEN;
	lockedUpString = lockedUpStringEN;
	recentlySacrificedString = recentlySacrificedStringEN;
	openString = openStringEN;
	waitingForMoreString = waitingForMoreStringEN;
	waitingForNewString = waitingForNewStringEN;
	sacrificeChosenString = sacrificeChosenStringEN;
	actionRequiredString = actionRequiredStringEN;
	interactString = interactStringEN;
}

function languageEN() {
	initialLanguage();
	
	main();
}
function languageCHI() {
	stageString = stageStringCHI;
	p3dStatsString = p3dStatsStringCHI;
	altarString = altarStringCHI;
	earningsString = earningsStringCHI;
	offerButtonString = offerButtonStringCHI;
	validateButtonString = validateButtonStringCHI;
	offerVaultButtonString = offerVaultButtonStringCHI;
	withdrawButtonString = withdrawButtonStringCHI;
	playerNumberString = playerNumberStringCHI;
	offerSize1String = offerSize1StringCHI;
	offerSize2String = offerSize2StringCHI;
	winnings1String = winnings1StringCHI;
	winnings2String = winnings2StringCHI;
	winnings3String = winnings3StringCHI;
	winnings4String = winnings4StringCHI;
	currentStageString = currentStageStringCHI;
	currentPlayersString = currentPlayersStringCHI;
	dividendsString = dividendsStringCHI;
	lockedUpString = lockedUpStringCHI;
	recentlySacrificedString = recentlySacrificedStringCHI;
	openString = openStringCHI;
	waitingForMoreString = waitingForMoreStringCHI;
	waitingForNewString = waitingForNewStringCHI;
	sacrificeChosenString = sacrificeChosenStringCHI;
	actionRequiredString = actionRequiredStringCHI;
	interactString = interactStringCHI;
	
	main();
}