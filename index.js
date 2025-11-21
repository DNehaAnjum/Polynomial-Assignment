const fs = require("fs");

function charToDigit(ch) {
    if (ch >= '0' && ch <= '9') return ch.charCodeAt(0) - 48;
    if (ch >= 'A' && ch <= 'Z') return 10 + (ch.charCodeAt(0) - 65);
    if (ch >= 'a' && ch <= 'z') return 10 + (ch.charCodeAt(0) - 97);
    throw new Error(`Invalid character '${ch}'`);
}

function decode(value, base) {
    base = BigInt(base);
    let result = 0n;
    for (let ch of value) {
        let digit = BigInt(charToDigit(ch));
        if (digit >= base) {
            throw new Error(`Digit '${ch}' >= base ${base}`);
        }
        result = result * base + digit;
    }
    return result;
}

function main() {
    const file = process.argv[2];
    if (!file) {
        console.error("Usage: node index.js <input.json>");
        process.exit(1);
    }

    const raw = fs.readFileSync(file, "utf8");
    const data = JSON.parse(raw);

    const k = data.keys.k;

    let keys = Object.keys(data)
        .filter(k => /^\d+$/.test(k))
        .map(Number)
        .sort((a, b) => a - b);

    let selected = keys.slice(0, k);

    let decoded = selected.map(key => {
        const base = Number(data[key].base);
        const value = data[key].value;
        return decode(value, base);
    });

    let C = 1n;
    for (let v of decoded) {
        C *= v;
    }
    if (k % 2 !== 0) C = -C;

    console.log(C.toString());
}

main();
