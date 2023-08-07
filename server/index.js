const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express()
const port = 3005;

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const EVEN = 'EVEN';
const ODD = 'ODD';
const INVALID_ENTRY = 'INVALID_ENTRY';

const alphaMap = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11, m: 12, n: 13, o: 14, p: 15, q: 16, r: 17, s: 18, t: 19, u: 20, v: 21, w: 22, x: 23, y: 24, z: 25};

const calcEvenOrOdd = (letter) => {
  const index = alphaMap[letter];    
  if (index === undefined) return INVALID_ENTRY;
  const result = index % 2 === 0 ? EVEN : ODD;
  return result;
};

const findLongestStreak = (string) => {
  let evenStreak = 0;
  let oddStreak = 0;
  let startStreak = 0;
  let endStreak = 0;

  const stringArr = string.split('');

  stringArr.forEach((char, index) => {
    char = char.toLowerCase();
    // console.log(/\s/.test(char))
    if (/\s/.test(char)) return endStreak++;
    const val = calcEvenOrOdd(char);
    if (val === INVALID_ENTRY) {
      evenStreak = 0;
      oddStreak = 0;
      startStreak = 0;
      endStreak = 0;
      return;
    }
    if (val === EVEN) {
      if (evenStreak === 0) {
        startStreak = index;
        endStreak = ++index;
      } else {
        endStreak++;
      }
      oddStreak = 0;
      evenStreak++;
    } else {
      if (oddStreak === 0) {
        startStreak = index;
        endStreak = ++index
      } else {
        endStreak++;
      }
      evenStreak = 0;
      oddStreak++;
    }
  });

  let streak = evenStreak >= oddStreak ? evenStreak : oddStreak;
  let highlighted = stringArr.splice(startStreak, endStreak);

  return {
    streak,
    highlighted: highlighted.join(''),
    caboose: stringArr.join(''),
  }
};

app.post('/', (req, res) => {
  const { inputVal } = req.body;
  const data = findLongestStreak(inputVal);
  res.json(data);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})