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
  {
    name: 'Every message you send must be a **reply** to another.',
    nextTask: -1,
    points: 20,
    handler: {
      identifier: 'mustReply',
      parameter: undefined,
    },
  },
]