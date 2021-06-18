# Bond Calclator

A command line utility to calculate the bond yields & spreads and return the output as JSON on stdout

## Pre-requisites

- npm
- node

## Installation

clone the repository and run the following command to install all packages

```bash
npm install
```

## Usage

Execute the following in you shell:

`$ sde-test-solution <argument 1> <argument 2> `

The **first argument** will be the path to the input JSON file (has the input bond data), formatted as the example above. Your program must read the JSON file at this path and process it.

The **second argument** will be the path where your program must write the output of your program, as a JSON file, formatted as the example above.


## Testing

To test the application, run the following command below:

```bash
npm test
```

If all tests passes, you should see an output like this:

```bash
> jest .

 PASS  ./util.test.js
 PASS  ./index.test.js

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        0.228 s, estimated 1 s
Ran all test suites matching /./i.
```

## Docker

To run the docker file, execute the command below:

```bash
docker run .
```


## Problem description

Given a JSON file which will define an array of **bond** objects (of arbitrary size), write a **command-line tool** to calculate the **spread** between each **corporate bond** and the nearest **government bond** benchmark, save these results in a JSON file, and express the spread in **basis points**, or **bps**. If any properties are missing from a bond object, do not include it in your calculations or output.

**Spread** is defined as the difference between the yield of a corporate bond and its government bond benchmark.

A government bond is a good **benchmark** if it is as close as possible to the corporate bond in terms of **years to maturity**, also known as **term** or **tenor**.

If there is a *tie* for closest government bond by **tenor**, break the tie by choosing the government bond with the *largest* **amount outstanding**.

To convert your difference to **basis points**, just scale your spread by 100 and display as an integer (truncate trailing decimals), e.g. if your spread comes out to 2.127, this will be expressed in your output file as "212 bps".

### Sample input

```json
{
  "data": [
    {
      "id": "c1",
      "type": "corporate",
      "tenor": "10.3 years",
      "yield": "5.30%",
      "amount_outstanding": 1200000
    },
    {
      "id": "g1",
      "type": "government",
      "tenor": "9.4 years",
      "yield": "3.70%",
      "amount_outstanding": 2500000
    },
    {
      "id": "c2",
      "type": "corporate",
      "tenor": "13.5 years",
      "yield": null,
      "amount_outstanding": 1100000
    },
    {
      "id": "g2",
      "type": "government",
      "tenor": "12.0 years",
      "yield": "4.80%",
      "amount_outstanding": 1750000
    }
  ]
}
```

### Sample output

```json
{
  "data": [
    {
      "corporate_bond_id": "c1",
      "government_bond_id": "g1",
      "spread_to_benchmark": "160 bps"
    }
  ]
}
```

### Explanation

Each output object in the list represents a pairing of one corporate bond to its closest government bond benchmark, and the spread between their yields.

The best benchmark for bond `c1` is `g1`, since the absolute difference in their terms (|10.3 - 9.4|) is only 0.9, but comparing `c1`and `g2` gets you 1.7. The spread is calculated as simply the corporate yield - government yield, you would obtain 5.30 - 3.70 = 1.60, which you must represent in basis points as "160 bps".

The bond `c2` is not included in the output because it is missing a property, `yield`. If *any* properties are missing from a bond object, *do not include it in the calculation and output*. You may assume you will always have at least one valid government bond and at least one valid corporate bond, for all inputs.