const signedInUser = JSON.parse(localStorage.getItem('user'))
console.log(signedInUser);

show.innerHTML += `
    <p>Welcome ${signedInUser.mail}, your login time is ${signedInUser.logInTime}</p>
`