function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

async function getName() {
    await sleep(5000)
    return "This is my firstname";
}

async function main() {
    var name = getName().then((value) => { console.log(value); });
    getName().then((value) => { console.log(value); });
    getName().then((value) => { console.log(value); });
    console.log('name : ' + name);
}



main();