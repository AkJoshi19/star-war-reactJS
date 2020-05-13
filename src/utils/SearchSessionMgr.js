


exports.updateSearch = () => {

    console.log('In Update Searchs')

    let currentTime = new Date().getTime();
    currentTime = currentTime / 1000; // Convert to seconds
    let idelTimeout = localStorage.getItem('idelTimeout');

    if (idelTimeout > currentTime) {
        // Ideal Timer is still active

        //let userInfo = JSON.parse(localStorage.getItem('userToken'));
        let currentCounter = localStorage.getItem('currentCounter');

        localStorage.setItem('currentCounter', ++currentCounter);

    }
    else {


        const idealTime = currentTime + 60;  // In Seconds

        localStorage.setItem('idelTimeout', Math.floor(idealTime));
        localStorage.setItem('currentCounter', 1);
    }

    localStorage.setItem('currentTime', Math.floor(currentTime));
}

exports.verifySearch = () => {

    let userInfo = JSON.parse(localStorage.getItem('userToken'));
    let currentCounter = localStorage.getItem('currentCounter');

    // Also check ideal time status
    let currentTime = new Date().getTime();
    let idelTimeout = localStorage.getItem('idelTimeout');
    currentTime = currentTime / 1000; // Convert to seconds
    localStorage.setItem('currentTime', Math.floor(currentTime));


    if (userInfo.loginData.userName != 'Luke Skywalker' && currentCounter < 15 || currentTime > idelTimeout) {

        return true;
    }
    else if (userInfo.loginData.userName == 'Luke Skywalker' || currentTime > idelTimeout) {

        return true;
    }
    else {

        return false;
    }

}
