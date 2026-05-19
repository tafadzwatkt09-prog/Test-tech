document.getElementById('get-code').addEventListener('click', async () => {
    const numberInput = document.getElementById('number');
    const loader = document.getElementById('loader');
    const btnText = document.querySelector('#get-code span');
    const errorMsg = document.getElementById('error-msg');
    const inputSection = document.getElementById('input-section');
    const codeSection = document.getElementById('code-section');
    const pairCodeDisplay = document.getElementById('pair-code');

    const number = numberInput.value.trim().replace(/[^0-9]/g, '');

    if (!number || number.length < 10) {
        showError('Please enter a valid mobile number with country code.');
        return;
    }

    // Reset UI
    errorMsg.classList.add('hidden');
    loader.style.display = 'block';
    btnText.style.opacity = '0.5';
    document.getElementById('get-code').disabled = true;

    try {
        // We'll call the bot's internal API
        // The token is usually the telegram token in this bot's setup
        // Since this is client-side, we might need a way to get the token or have a public endpoint
        // For now, we assume the bot's /api/pair is accessible
        const response = await fetch('/api/pair', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: number,
                token: '8087999115:AAEwDtnN_WqhcwQpEPmEXb-WEcW0v48zZNs', // Hardcoded as per settings.js
                requestedBy: 'Web User'
            })
        });

        const data = await response.json();

        if (data.success) {
            pairCodeDisplay.textContent = data.pairCode;
            inputSection.classList.add('hidden');
            codeSection.classList.remove('hidden');
        } else {
            showError(data.error || 'Failed to get pairing code.');
        }
    } catch (err) {
        showError('Connection error. Please make sure the bot is running.');
        console.error(err);
    } finally {
        loader.style.display = 'none';
        btnText.style.opacity = '1';
        document.getElementById('get-code').disabled = false;
    }
});

function showError(msg) {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = msg;
    errorMsg.classList.remove('hidden');
}
