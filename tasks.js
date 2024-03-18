module.exports = [
  {
    name: 'You cannot type the letter **a**.',
    nextTask: -1,
    points: 20,
    handler: {
      identifier: 'noLetter',
      parameter: 'a',
    },
  },
  {
    name: 'You cannot type the letter **s**.',
    nextTask: -1,
    points: 20,
    handler: {
      identifier: 'noLetter',
      parameter: 's',
    },
  },
]