// CONSTANTS
var contractAddress = '0x0c22C33eaEFC961Ed529a6Af4654B6c2f51c12D3';

// GLOBALS
var web3Mode = null;
var walletMode = 'metamask';
var currentAddress = null;
var keystore = null;
var dividendValue = 0;
var tokenBalance = 0;
var contract = null;
var muteSound = false;
var etctospend = 0;

var buyPrice = 0;
var globalBuyPrice = 0;
var sellPrice = 0;
var ethPrice = 0;
var currency = (typeof default_currency === 'undefined') ? 'USD' : default_currency;
var ethPriceTimer = null;
var dataTimer = null;
var infoTimer = null;

var abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"bnbReinvested","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensMinted","type":"uint256"}],"name":"onReinvestment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"incomingBNB","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensMinted","type":"uint256"},{"indexed":true,"internalType":"address","name":"referredBy","type":"address"}],"name":"onTokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokensBurned","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bnbEarned","type":"uint256"}],"name":"onTokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"bnbWithdrawn","type":"uint256"}],"name":"onWithdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_customerAddress","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_referredBy","type":"address"}],"name":"buy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"buyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokensToSell","type":"uint256"}],"name":"calculateBNBReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bnbToSpend","type":"uint256"}],"name":"calculateTokensReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deployer","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_customerAddress","type":"address"},{"internalType":"bool","name":"_includeReferralBonus","type":"bool"}],"name":"dividendsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_includeReferralBonus","type":"bool"}],"name":"myDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTotalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTotalReferralEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTotalReferrals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTotalWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOfTokens","type":"uint256"}],"name":"sell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"statusOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBNBBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"totalDepositsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"totalReferralEarningsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"totalReferralsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"totalWithdrawalsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_toAddress","type":"address"},{"internalType":"uint256","name":"_amountOfTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

// UTILITY FUNCTIONS
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match
        })
    }
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData('Text', text)

    } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        var textarea = document.createElement('textarea')
        textarea.textContent = text
        textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea)
        textarea.select()
        try {
            return document.execCommand('copy') // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn('Copy to clipboard failed.', ex)
            return false
        } finally {
            document.body.removeChild(textarea)
        }
    }
}

function updateEthPrice() {
    clearTimeout(ethPriceTimer)
    if (currency === 'B1VS') {
        ethPrice = 1 / (sellPrice + ((buyPrice - sellPrice) / 2))
        ethPriceTimer = setTimeout(updateEthPrice, 10000)
    } else {
        $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=BNB,USD,' + currency, function (result) {
            var bnb = result.BNB
            var usd = result.USD
            ethPrice = parseFloat(bnb)
            usdPrice = parseFloat(usd)
            ethPriceTimer = setTimeout(updateEthPrice, 10000)
        })
    }
}

function getPriceFloorInfo() {
    pricefloor.pricefloorBalance.call(function (err, result) {
        tokens = parseFloat(web3.fromWei(result.toNumber())).toFixed(1)
        $("#pricefloorTokens").html(numberWithCommas(tokens))
    });

    pricefloor.pricefloorDividends.call(function (err, result) {
        dividends = parseFloat(web3.fromWei(result.toNumber())).toFixed(4)
        $("#pricefloorDivs").html(dividends)
    });
}

function convertEthToWei(e) {
    return 1e18 * e
}

function convertWeiToEth(e) {
    return e / 1e18
}

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
        } catch (error) {

        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

function detectWeb3() {
    if (typeof web3 !== 'undefined') {
        web3js = new Web3(web3.currentProvider)
        web3Mode = 'metamask'
        currentAddress = web3js.eth.accounts[0]
    } else {

    }

    referrer = localStorage.getItem("ref")
    if (referrer == null) {
        console.log('Referrer was empty, so it is now set to the creators address.');
        referrer = "0xf2C579082fE10d57331d0Cd66843C4D6777eA48a";
    } else {
        referrer = referrer;
        console.log('Referrer set. ' + referrer + ' is getting a referral bonus.');
    }

    var contractClass = web3js.eth.contract(abi)
    contract = contractClass.at(contractAddress)

    updateData()
    attachEvents()
    updateTokenInfo()
}

window.addEventListener('load', function () {
    setTimeout(detectWeb3, 500)

    function call(address, method, params, amount) {
        web3js.eth.getTransactionCount(currentAddress, function (err, nonce) {
            if (err) throw err

            web3js.eth.getGasPrice(function (err, gasPrice) {
                if (err) throw err

                // Median network gas price is too high most the time, divide by 10 or minimum 1 gwei
                gasPrice = Math.max(gasPrice / 10, 1000000000)

                var tx = {
                    'from': currentAddress,
                    'to': address,
                    'value': '0x' + amount.toString(16),
                    'gasPrice': '0x' + (gasPrice).toString(16),
                    'gasLimit': '0x' + (100000).toString(16),
                    'nonce': nonce,
                }
            })
        })
    }

    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);

        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
                end = dc.length;
            }
        }

        return decodeURI(dc.substring(begin + prefix.length, end));
    }

    function fund(address, amount) {
        if (walletMode === 'metamask') {
            var etcwei = convertEthToWei(amount);
            var gasvalue = 150000;
            contract.buy(referrer, {
                value: etcwei
            }, function (e, r) {
                console.log(e, r)
            })
        } else if (walletMode === 'web') {
            call(address, 'buy', [], convertEthToWei(amount))
        }
    }

    function sell(amount) {
        if (walletMode === 'metamask') {
            contract.sell(convertEthToWei(amount), function (e, r) {
                console.log(e, r)
            })
        } else if (walletMode === 'web') {
            call(contractAddress, 'sell', [convertEthToWei(amount)], 0)
        }
    }

    function reinvest() {
        if (walletMode === 'metamask') {
            contract.reinvest(function (e, r) {
                console.log(e, r)
            })
        } else if (walletMode === 'web') {
            call(contractAddress, 'reinvest', [], 0)
        }
    }

    function withdraw() {
        if (walletMode === 'metamask') {
            contract.withdraw(function (e, r) {
                console.log(e, r)
            })
        } else if (walletMode === 'web') {
            call(contractAddress, 'withdraw', [], 0)
        }
    }

    // Buy token click handler

    $('#buy-tokens').click(function () {
        let amount = $('#purchase-amount').val().trim();
        fund(contractAddress, amount)
    });

    // Transfer handler
    $('#transfer-tokens-btn').click(function () {
        let address = $('#transfer-address').val();
        let amount = $('#transfer-tokens').val();

        console.log('hey');
        if (!web3js.isAddress(address)) {
            return;
        }
        if (!parseFloat(amount)) {
            return
        }
        let amountConverted = web3js.toBigNumber(amount * 1000000000000000000);
        transferTokens(amountConverted, address);
    });

    function transferTokens(amount, address) {
        if (walletMode === 'metamask') {
            contract.myTokens(function (err, myTokens) {
                if (parseFloat(amount) <= parseFloat(myTokens)) {
                    contract.transfer(address, amount, function (err, result) {
                        if (err) {
                            alertify.error('Uh-Oh! Something went wrong... Try again later');
                            console.log('An error occured', err);
                        }
                    });
                }
            });
        } else {
            alert.log('Transfer functionality supported only with Metamask or Trust Wallet.');
        }

    }

    $('#sell-tokens-btn').click(function () {sell($("#sell-tokens-amount").val())});
    $('#reinvest-btn').click(function () {reinvest()});
    $('#withdraw-btn').click(function () {withdraw()});
    $('#sell-tokens-btn-m').click(function () {contract.sell(function (e, r) {console.log(e, r)})});
    $('#reinvest-btn-m').click(function () {contract.reinvest(function (e, r) {console.log(e, r)})});
    $('#withdraw-btn-m').click(function () {contract.withdraw(function (e, r) {console.log(e, r)})});
    $('#currency').val(currency);
    
    $('#currency').change(function () {
        currency = $(this).val();
        updateEthPrice();
    });

    updateEthPrice();

    $('#purchase-amount').bind("keypress keyup click", function (e) {
        var number = $('#purchase-amount').val();
        var numTokens = number / globalBuyPrice;
        $('.number-of-tokens').text("With " + (number == 0 ? 0 : number) + " BNB you can buy " + numTokens.toFixed(3) + " B1VS");
    });

    $('#copy-ref-link').click(function (e) {
        e.preventDefault();
        copyToClipboard('http://127.0.0.1:8080/dashboard.html?ref=' + currentAddress);
        alertify.success('Copied Referral Link!');
    });
})

function updateData() {
    clearTimeout(dataTimer);

    var loggedIn = false

    if (walletMode === 'metamask') {
        loggedIn = typeof web3js.eth.defaultAccount !== 'undefined' && web3js.eth.defaultAccount !== null
        currentAddress = web3js.eth.defaultAccount;
    } else if (walletMode === 'web') {
        loggedIn = currentAddress !== null;
    }

    if (loggedIn) {
        contract.balanceOf(currentAddress, function (e, r) {
            const tokenAmount = (r / 1e18);
            $('.balance').text(Number(tokenAmount.toFixed(3)));
            contract.calculateBNBReceived(r, function (e, r) {
                let bal = convertWeiToEth(r);
                $('.value').text(bal.toFixed(4));
                $('.value-usd').text(Number((convertWeiToEth(r * 1) * usdPrice).toFixed(2)).toLocaleString());
                tokenAmount = bal;
            });
        });

        contract.myDividends(false, function (e, r) {
            let div = convertWeiToEth(r).toFixed(6);
            let refdiv = (dividendValue - div).toFixed(6);

            $('#refdiv').text(refdiv);
            $('#refdiv-usd').text(Number((refdiv * usdPrice).toFixed(2)).toLocaleString());

            $('#nonrefdiv').text(div);
            $('#nonrefdiv-usd').text(Number((convertWeiToEth(r) * usdPrice).toFixed(2)).toLocaleString());
        });


        contract.myDividends(true, function (e, r) {
            let div = convertWeiToEth(r).toFixed(6)

            $('.div').text(div);
            $('input.div').val(div + " BNB");
            $('.div-usd').text(Number((convertWeiToEth(r) * usdPrice).toFixed(2)).toLocaleString());

            if (dividendValue != div) {
                $('.div').fadeTo(100, 0.3, function () {
                    $(this).fadeTo(250, 1.0);
                });
                dividendValue = div;
            }
        });

        contract.totalReferralsOf(currentAddress, function (e, r) {$('#refUseCount').text(r)});
        contract.totalReferralEarningsOf(currentAddress, function (e, r) {$('#totalRefEarnings').text((r / 1e18).toFixed(3))});
        web3js.eth.getBalance(currentAddress, function (e, r) {$('.address-balance').text(convertWeiToEth(r).toFixed(6) + ' BNB')});
    } else {
        
    }

    contract.buyPrice(function (e, r) {
        let buyPrice = convertWeiToEth(r);
        globalBuyPrice = convertWeiToEth(r);
        $('.buy').text(buyPrice.toFixed(6) + ' ');
        $('.buy-usd').text('$' + Number((buyPrice * usdPrice).toFixed(2)).toLocaleString() + ' ' + currency + '');
    })

    contract.totalSupply(function (e, r) {
        let actualSupply = r / 1e18;
        $('.contract-tokens').text(Number(actualSupply.toFixed(0)).toLocaleString());
    })

    // Referral Divs
    contract.dividendsOf(currentAddress, true, function (e, r) {
        let userDividends = convertWeiToEth(r);
        $('#referralDivs').text(userDividends.toFixed(8).toLocaleString());
    })

    contract.sellPrice(function (e, r) {
        let sellPrice = convertWeiToEth(r);
        $('.sell').text(sellPrice.toFixed(6) + ' ');
        $('.sell-usd').text('$' + Number((sellPrice * usdPrice).toFixed(2)).toLocaleString() + ' ' + currency + '');
    })

    web3js.eth.getBalance(contract.address, function (e, r) {
        $('.contract-balance').text(convertWeiToEth(r).toFixed(4) + " ");
        $('.contract-balance-usd').text('$' + Number((convertWeiToEth(r) * usdPrice).toFixed(2)).toLocaleString() + ' ' + currency + '');
    })

    dataTimer = setTimeout(function () {
        updateData()
    }, web3Mode === 'metamask' ? 2000 : 6000)
}


function updateTokenInfo() {
    clearTimeout(infoTimer)

    infoTimer = setTimeout(function () {
        updateTokenInfo()
    }, web3Mode === 'metamask' ? 5000 : 10000)
}

function attachEvents() {
    // Always start from 3 blocks behind
    web3js.eth.getBlockNumber(function (error, result) {
        console.log("Current Block Number is", result);
        contract.allEvents({
            fromBlock: result - 3,
        }, function (e, result) {
            let currentUserEvent = web3.eth.accounts[0] == result.args.customerAddress;
            switch (result.event) {
                case 'onTokenPurchase':
                    if (currentUserEvent) {
                        alertify.success('You Purchased ' + result.args.tokensMinted.div(1000000000000000000).toFixed(4) + ' B1VS for ' + result.args.incomingBNB.div(1000000000000000000).toFixed(4) + ' BNB');
                    } else {
                        alertify.success(result.args.tokensMinted.div(1000000000000000000).toFixed(4) + ' B1VS was just bought by someone, for ' + result.args.incomingBNB.div(1000000000000000000).toFixed(4) + ' BNB.');
                    }
                    break;
                case 'onTokenSell':
                    if (currentUserEvent) {
                        alertify.success('You Sold ' + result.args.tokensBurned.div(1000000000000000000).toFixed(4) + ' B1VS for ' + result.args['bnbEarned'].div(1000000000000000000).toFixed(4) + ' BNB.');
                    } else {
                        alertify.success('Someone else sold tokens. They received ' + result.args['bnbEarned'].div(1000000000000000000).toFixed(4) + ' BNB for ' + result.args.tokensBurned.div(1000000000000000000).toFixed(4) + ' B1VS.');
                    }
                    break;
                case 'onWithdraw':
                    if (currentUserEvent) {
                        alertify.success('Withdrawal of ' + result.args['bnbWithdrawn'].div(1000000000000000000).toFixed(4) + ' Successful!');
                    }
                    break;
                case 'onReinvestment':
                    if (currentUserEvent) {
                        alertify.success('Your reinvestment of ' + result.args.bnbReinvested.div(1000000000000000000).toFixed(4) + 'BNB has yielded ' + result.args.tokensMinted.div(1000000000000000000).toFixed(4) + ' B1VS tokens!');
                    } else {
                        alertify.success('Someone reinvested ' + result.args.bnbReinvested.div(1000000000000000000).toFixed(4) + ' BNB and received ' + result.args.tokensMinted.div(1000000000000000000).toFixed(4) + '. B1VS tokens!');
                    }
                    break;
                case 'Transfer':
                    if (currentUserEvent) {
                        alertify.success('Transfer order of ' + result.args['tokens'].div(1000000000000000000).toFixed(4) + ' B1VS tokens to' + result.args['to'] + ' placed.');
                    }
                    break;
            }
        })
    })
}
