module.exports = [
  {
    name: 'You cannot type the letter **a**.',
    keywords: [], // may deprecate this in favor of using the handler identifier to match to a dictionary of keywords for each type
    nextTask: -1,
    handler: {
      identifier: 'noLetter',
      parameter: 'a',
    },
  },
  {
    name: 'You cannot type the letter **s**.',
    keywords: [],
    nextTask: -1,
    handler: {
      identifier: 'noLetter',
      parameter: 's',
    },
  },
]