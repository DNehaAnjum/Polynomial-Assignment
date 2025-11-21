# Polynomial Assignment

This program reads a JSON file that contains roots of a polynomial.  
Each root has a base and a value. The value is decoded from its base and
converted into a BigInt.

## Steps followed
1. Read the JSON input.
2. Sort the numeric keys (1, 2, 3, ...).
3. Take the first k roots.
4. Decode each value using its base.
5. Multiply all decoded roots.
6. Apply (-1)^k to get the constant term.
7. Print only the final answer.

## Why the output can be negative?
The constant term of the polynomial:
P(x) = (x - r1)(x - r2)...(x - rk)

is:
C = (-1)^k × (r1 × r2 × ... × rk)

- If k is even → result is positive  
- If k is odd → result becomes negative  
So a negative answer is correct when k is odd.

## How to run
node index.js input.json

## Sample Outputs
Sample 1:
-336

Sample 2:
-68251311922474227931291131263381395876233236117406283186409459444825993094514406289867143593522348021427278506790766073198900
