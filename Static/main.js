function callApi() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/protected/', {   // note the correct API path
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        }
    })
    .then(res => {
        if (!res.ok) throw new Error(res.status + " " + res.statusText);
        return res.json();
    })
    .then(data => {
        document.getElementById('response').textContent = JSON.stringify(data, null, 2);
    })
    .catch(err => {
        document.getElementById('response').textContent = err;
    });
}
