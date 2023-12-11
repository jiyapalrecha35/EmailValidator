const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const APIKEY = 'ema_live_uHC6ExW3FQ8N6v9sn1CnOFxb3AakJDGIlnJPwqMd';
    const results = document.getElementById('results');
    let email = document.getElementById('email').value;

    results.innerHTML = `<img src="./loader.gif">`;
    let url = `https://api.emailvalidation.io/v1/info?apikey=${APIKEY}&email=${email}`;

    let response = await fetch(url);
    let result = await response.json();
    let str = '';

    for (key of Object.keys(result)) {
        if (result[key] !== "" && result[key] !== " ") {
            if (key === 'state' || key === 'reason') {
                str += `<div><span style="font-weight: bold; font-size:20px">${key} :</span> <span style="font-weight: bold; font-size:20px">${result[key]}</span></div>`;
            } else {
                str += `<div>${key} : ${result[key]}</div>`;
            }
        }
    }

    // Determine and display email validity with icons
    if (result.state === "undeliverable") {
        str += `<div style="color: red; font-size: 40px;">
                 <span style="font-weight: bold;">Email Address: Invalid &#10060;</span></div>`;
    } else {
        str += `<div style="color: green; font-size: 40;">
                 <span style="font-weight: bold;">Email Address: Valid &#10004;</span></div>`;
    }

    console.log(str);
    results.innerHTML = str;
});
