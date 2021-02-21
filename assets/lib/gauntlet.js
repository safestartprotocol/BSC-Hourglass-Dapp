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

let el = function (id) {
    return document.querySelector(id);
};

let strongHandsManagerAddress = '0x7f922e7313ac76bb3eD4B32Fd82B1aC482704984';
let strongHandsManagerContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_unlockAfterNDays","type":"uint256"}],"name":"create","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"strongHand","type":"address"}],"name":"CreatedGauntlet","type":"event"},{"constant":true,"inputs":[],"name":"isGodlyChad","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"myGauntlet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"strongHands","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]);
let strongHandsManagerInstance = strongHandsManagerContract.at(strongHandsManagerAddress);

strongHandContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"creationDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawDividends","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"buyWithBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_howManyDays","type":"uint256"}],"name":"extendLock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"unlockAfterNDays","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isLocked","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_toAddress","type":"address"},{"name":"_amountOfTokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"developer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lockedUntil","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"dividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reinvest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_unlockAfterNDays","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);
let myStrongHandInstance;

function startDapp() {
    myStrongHand();
}

function myStrongHand() {
    strongHandsManagerInstance.isGodlyChad((error, isGodlyChad) => {
        if (isGodlyChad) {
            el('#myDepositPanel').innerHTML += '<h3>Deposit BNB &amp; lock B1VS</h3>';
            el('#myDepositPanel').innerHTML += '<input id="buyamount" type="number" placeholder="Amount to spend (BNB)" class="form-control roundedCorners" /><br />';
            el('#myDepositPanel').innerHTML += ' <button type="button" onclick="buyP3D()" class="btn btn-md btn-dark btn-block btn-outline-success roundedCorners">Buy/Lock up B1VS</button>';
            el('#myDepositPanel').innerHTML += ' <br />';
            el('#myDepositPanel').innerHTML += ' <hr />';
            
            
            el('#myTimePanel').innerHTML += ' <h3>Extend your Time</h3>';
            el('#myTimePanel').innerHTML += ' <input id="extendlocktime" type="number" placeholder="lock time (days)" min="1"step="1" class="form-control roundedCorners" /><br />';
            el('#myTimePanel').innerHTML += ' <button type="button" onclick="extendLock()" class="btn btn-md btn-dark btn-block btn-outline-warning roundedCorners">Extend Lock Time</button>';
            el('#myTimePanel').innerHTML += ' <br />';
            el('#myTimePanel').innerHTML += ' <hr />';
            
            el('#myControlsPanel').innerHTML += ' <h3>Collect &amp; Reinvest</h3>';
            el('#myControlsPanel').innerHTML += ' <button type="button" onclick="reinvestDividends()" class="btn btn-md btn-dark btn-block btn-outline-info roundedCorners">Reinvest Dividends</button>';
            el('#myControlsPanel').innerHTML += ' <button type="button" onclick="withdrawDividends()" class="btn btn-md btn-dark btn-block btn-outline-danger roundedCorners">Withdraw Dividends</button>';

            strongHandsManagerInstance.myGauntlet((error, myStrongHandAddress) => {
                el('#address').innerHTML = myStrongHandAddress;

                myStrongHandInstance = strongHandContract.at(myStrongHandAddress);
                myStrongHandInstance.balanceOf((error, myP3dBalance) => {
                    el('#myp3dbalance').innerHTML = web3.fromWei(myP3dBalance, 'ether').toFixed(6) + ' B1VS';
                });
                myStrongHandInstance.dividendsOf((error, myDividends) => {
                    el('#mydividends').innerHTML = web3.fromWei(myDividends, 'ether').toFixed(6) + ' BNB';
                });
                myStrongHandInstance.isLocked((error, isLocked) => {
                    if (isLocked) {
                        myStrongHandInstance.lockedUntil((error, lockedUntil) => {
                            var _until = new Date(lockedUntil * 1000);
                            el('#mystatus').innerHTML = '<b class="text-danger">LOCKED</b>';
                            el('#lockedUntil').innerHTML = (_until.getDate() + "/" + (_until.getMonth() + 1) + "/" + _until.getFullYear());
                        });
                    } else {
                        el('#mySellPanel').innerHTML = '<h3 class="text-success">UNLOCKED</h3>';
                        el('#mySellPanel').innerHTML += ' <strong>Sell B1VS</strong>';
                        el('#mySellPanel').innerHTML += ' <input id="sellamount" type="number" placeholder="Amount to Sell (B1VS)" class="form-control roundedCorners" />';
                        el('#mySellPanel').innerHTML += ' <button type="button" onclick="sell()" class="btn btn-block btn-md btn-dark btn-outline-danger roundedCorners">Sell B1VS</button>';
                    }
                });

                myStrongHandInstance.unlockAfterNDays((error, unlockAfterNDays) => {
                    el('#locktime').innerHTML = unlockAfterNDays;
                });
                myStrongHandInstance.creationDate((error, creationDate) => {
                    var _date = new Date(creationDate * 1000);
                    el('#created').innerHTML = (_date.getDate() + "/" + (_date.getMonth() + 1) + "/" + _date.getFullYear());
                });
            });

        } else {
            el('#setupPanel').innerHTML = '<h3>Create a Gauntlet</h3><input id="locktime" type="number" placeholder="LOCK TIME (days)" min="0"step="1" class="form-control roundedCorners"  /><br />'
            el('#setupPanel').innerHTML += '<button type="button" onclick="getStrong()" class="btn btn-block btn-lg btn-dark btn-outline-success roundedCorners">Become a Strong Hand!</button>'
        }
    });
}

function getStrong() {
    strongHandsManagerInstance.create(el('#locktime').value, (error, result) => {
        if (!error) {
            alertify.success("Creating Gauntlet, please wait...");
        } else {
            alertify.error("Failed - Try again or check Tx...")
        }
    });
}

function buyP3D() {
    myStrongHandInstance.buy({
        value: web3.toWei(el('#buyamount').value, 'ether')
    }, (error, result) => {
        if (!error) {
            alertify.success("Buying B1VS Shares, please wait...");
        } else {
            alertify.error("Failed - Try again or check Tx...")
        }
    });
}

function withdrawDividends() {
    myStrongHandInstance.withdrawDividends((error, result) => {
        if (!error) {
            alertify.success("Withdrawing Dividends, please wait...");
        } else {
            alertify.error("Failed - Try again or check Tx...")
        }
    });
}

function reinvestDividends() {
    myStrongHandInstance.reinvest((error, result) => {
        if (!error) {
            alertify.success("Reinvesting B1VS Shares, please wait...");
        } else {
            alertify.error("Failed - Try again or check Tx...")
        }
    });
}

function extendLock() {
    myStrongHandInstance.extendLock(el('#extendlocktime').value, (error, result) => {
        if (!error) {
            alertify.success("Extending Lock, please wait...");
        } else {
            alertify.error("Failed - Try again or check Tx...")
        }
    });
}

function sell() {
    myStrongHandInstance.sell(web3.toWei(el('#sellamount').value, 'ether'), (error, result) => {
        if (!error) {
            alertify.success("Selling B1VS Shares, please wait...");
        } else {
            alertify.error("Failed - Try again or check Tx...")
        }
    });
}
