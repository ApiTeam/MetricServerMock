fetch('/api/auth', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})
    .then(res => res.json())
    .then(data => console.log(data))