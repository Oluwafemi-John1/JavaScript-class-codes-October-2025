// for(startingValue, condition, steps(increase/decrease)) {
//     // your code
// }

// for(let i=1; i <= 5; i++) {
//     console.log(i);
// }

// Count from 10 to 50
// for(let j=10; j<=50; j++) {
//     console.log(j);
// }

// Count down from 100 to 0
for(let k=1; k<=100; k++) {
    if(k%2==0) {
        console.log(`${k} is an even number`);
        show.innerHTML += `<p style="color: green;">${k} is an even number</p>`
    } else {
        console.log(`${k} is an odd number`);
        show.innerHTML += `<p style="color: red;">${k} is an odd number</p>`
    }
}


