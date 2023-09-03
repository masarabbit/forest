
// const createMapCodes = length => {
//   return new Array(length).fill('').map((_n, i) => {
//     let letters = ''
//     while (i >= 0) {
//       letters = 'abcdefghijklmnopqrstuvwxyz'[i % 26] + letters
//       i = Math.floor(i / 26) - 1
//     }
//     return letters
//   })
// }


// const tiles = createMapCodes(10 * 7)
// const plainColors = {
//   za: '#fff',
//   zb: '#58d3d8',
//   zc: '#0d8799',
//   zd: '#a2fcf0',
//   zd: '#d7fbfa',
// }
// const animationTiles = {
//   ap: ['ap', 'ap', 'ap', 'ar', 'ar', 'ar'],
//   // zb: ['zb', 'ap', 'ar', 'zb', 'ap', 'ar'],
//   i: ['i', 'i', 'k', 'k', 'm', 'm'],
//   j: ['j', 'j', 'l', 'l', 'n', 'n'],
//   at: ['at', 'at', 'at', 'au', 'au', 'au']
// }
// const blank = 'zz'

const editConfig = {
  a: 90,
  b: 180,
  c: 270,  
}

const tiles = {
  a: {
    id: 'green rounded corner',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEFJREFUOE9jZEACoVeu/AdxmRhYkYXxshlhsiDNpGiE6QMbQK5mkF5GSjRTx4DwKzfBAUcuYBw1gGE0DBgGQRgAAFrpMEH7yl7MAAAAAElFTkSuQmCC',
  },
  b: {
    id: 'green rounded corner white background',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEFJREFUOE9jZEACoVeu/AdxmRhYkYXxshlhsiDNpGiE6QMbQK5mkF5GSjRTx4DwKzfBAUcuYBw1gGE0DBgGQRgAAFrpMEH7yl7MAAAAAElFTkSuQmCC',
    color: '#fff'
  },
  c: {
    id: '',
    color: '#58d3d8'
  },
  d: {
    id: 'roof with curved edge',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAD9JREFUOE9jDL9y8z8DBYBx1ACG0TBgGNZhsEJbDSWHRFy9hTXHYKQDdI3outANQjGAkGaYYciGwA0gVjO6IQBiezxBrbH3wgAAAABJRU5ErkJggg=='
  },
  e: {
    id: 'white round corner green background',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGBJREFUOE9jDL9y8z8DEmBhZGRYoqWKLISXzQgzAKRxgaYKWDGITSwAGwDTTIpGmAWM0Vdv/QfZTI5mkCFgA0jxM7rXGH//+wf2ArmA8f///yixQKpBowYwMIyGARXCAAD2YD/RFR8kNAAAAABJRU5ErkJggg=='
  },
  f: {
    id: 'white',
    color: '#ffffff'
  },
  g: {
    id: 'white corner',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADZJREFUOE9jZMAC/v///x+bODYxRmRBUjTC9MENIEczyBCwAeRqpo4BlNgOdsGoAaNhMCjSAQBl0D/RLovMkAAAAABJRU5ErkJggg==',
    color: '#a2fcf0',
  },
  h: {
    id: 'door',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEJJREFUOE9j/P///38GCgAjLgNKU6NRjO2evRSrNRgGoGtE14VuENwAQhpxGUQdA0i1HeYakHfALhg1YDQMBjwdAAC5Y2zRFw3VTAAAAABJRU5ErkJggg=='
  },
  i: {
    id: 'circle window',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFhJREFUOE9j/P///38GCgAjzQwoTY1GcVf37KVY3YnhAnSN6LrQDUIxgJBmmGHIhlDPAGJtR3cF3AXDwACQ34j1Bm1iARa6hFyBNyEhpzqykzKpGZPi3AgAkBdj0eBUcukAAAAASUVORK5CYII='
  },
  j: {
    id: 'square window',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADxJREFUOE9j/P///38GCgAjTQwoTY3G6qbu2UsxxDFcgEszTCe6IaMGMDCMhgEtwgCU4ihKyqRmTIpzIwCnh2PRXEERmwAAAABJRU5ErkJggg=='
  },
  k: {
    id: 'square window left',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADhJREFUOE9j/P///38GCgDjqAEMKGFQmhqNEpzds5cSDF64AeiaYToJGTJqAAMiFkYDEZJsyEmJAE84YNEO1BNiAAAAAElFTkSuQmCC'
  },
  l: {
    id: '',
    color: '#0d8799'
  },
  m: {
    id: 'door interior',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERJREFUOE9j/P///38GCgDjMDKAr2MWOCQ+VaSBaWL58DAgVgO6BYy87TPBsUCqzTD11DOA3KQAd8GoAeSGAAPDwAciAAy2V7Fit1hpAAAAAElFTkSuQmCC'
  },
  n: {
    id: 'brick wall',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEFJREFUOE9j/P///38GCgDjxf8fUQzQY+BjuMTwCaeR6PKDwACKwwBkACl+Rg8cxsFhAAXJgGEQRCPFKXE0HTAAAG5JbQFIfPCXAAAAAElFTkSuQmCC'
  },
  o: {
    id: 'ladder',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADtJREFUOE9j/P///38GCgAjsgGlqdEM3bOX4jUOXQ2KASCdIAX4ALoFGAaQ6hvqGjAaBpAoHE0HQzEMAGqVY9GFHKT2AAAAAElFTkSuQmCC'
  },
  p: {
    id: 'ladder from top',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGlJREFUOE9j3Dan+z8DBYDx/////7fP7QEbsdDCjyH+xCa8xiGr8UwuYUAxAGYIPhOQLcBqACm+ob4Bo2EwkOkAFPew1EhsOgClARAAp0SqGACzmZBLYDbD1MNdgO50dIPQNRI0gNiwAAAXq4OxO7IYfwAAAABJRU5ErkJggg=='
  },
  q: {
    id: 'stair',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAACdJREFUOE9j/P///38GCgDjwBvw4MyBoe4FigNxNAwYGEfDgPIwAAAjDz2NCL4txQAAAABJRU5ErkJggg=='
  },
  r: {
    id: 'art work',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGpJREFUOE9jLEmJ+s9AAWCkmgHds5eS5I7S1GiwergLqGbAor+PGKKZG3C6hplhHlgOpwtABoAALkOINgCXISQZgM0Qkg1AN4QsA5ANIdsAmCEUGQAyJI5ZDn80EpscqZ8SibUZXR3FuREApZtmIapkg0wAAAAASUVORK5CYII='
  },
  s: {
    id: 'tree top left',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFFJREFUOE9jZCADhF+5+R+mjZEU/cgaSTYAm2aQIUS5AJdmogzAp5mgAYQ04zWAGM04DSBWM20MIMV2rC4YWANItR3DCxQZQI5muAvI1QwyAAArKTBBsURgUwAAAABJRU5ErkJggg=='
  },
  t: {
    id: 'tree bottom left',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFdJREFUOE9jZGBgYAi/cvM/iCYHMA4OAyhxBdgLVDGAXEPgLkCOAVJiBasBpBhG0ABkw/7///8/4uotlORCsgHoiW0IGQDyP7a8Ql8vgFyA7hKSXIDNCwBbxTYUVVbliQAAAABJRU5ErkJggg=='
  },
  u: {
    id: 'flower',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJRJREFUOE9jZCAS/Hxg9x+mlF3hECOMDWfgUgBSCJNjlldm+PvwLlgvzBCwAfgUwORBmmEAZAiGAbgUELKAKBcgG4LsfBCbqDDQ27v0/yXnaEZ0Gm4APgUwf4PUwNggwzBiAZcCQrEMN4mQQlzhgGIAOWkBIxCxJRZ8aQHFAHLSAtEuoDgMcEU13AXkpgWUWCAnLQAAqaK0EZbd8nEAAAAASUVORK5CYII='
  },
  v: {
    id: 'grass',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEpJREFUOE9jZKAQMIL0h1+5+X+ljjpeNi57wJqQDYEZhmwoPkfCDSDXJyPBAEIxRFQYoMcMsqFEGTASopFQSBMVBvhCmigDyM0LAHgNSBGwjzApAAAAAElFTkSuQmCC'
  },
  w: {
    id: '',
    color: '#a2fcf0',
  },
  x: {
    id: 'path edge top left',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAENJREFUOE9jZMACnv3u/49NHJsYI7IgKRph+uAGkKMZZAjYAHI1U8cASmwHu2DUgMEWBqAMgJK2icgQgygayXE+yIcAwFI5ATyc1IoAAAAASUVORK5CYII='
  },
  y: {
    id: 'path color',
    color: '#e6fb8f'
  },
  z: {
    id: 'path end',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAElJREFUOE9jZKAQMFKonwHDgGe/+//jM1SKtRBFD5xDSCO6oTCDwAaQqhlmGMgQyg0g13aYKxgH1ID/DP8ZBtYFoHAYdQEVwgAADhY0Ze2SShoAAAAASUVORK5CYII='
  },
  aa: {
    id: '',
    color: '#d7fbfa',
  },
  ab: {
    id: 'sea edge',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFNJREFUOE9jvP77138GCgDjCDRAg4UVJcQIhgG6BvTwxmkAIY0wgzAMIKQx4uot7F7ApRFdA4YX/v//jzUhEdII9wK6AcRqhBsQfuUmZUl51AAGAPsNQky1DCnwAAAAAElFTkSuQmCC',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFNJREFUOE9jvP77138GCgDjCDRAg4UVJcQIhgG6BvTwxmkAIY0wgzAMIKQx4uot7F7ApRFdA4YX/v//jzUhEdII9wK6AcRqhBsQfuUmZUl51AAGAPsNQky1DCnwAAAAAElFTkSuQmCC',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFtJREFUOE9jvP77138GCgAj3Q3QYGFFcS9BF6BrQPctTgMIaYQZhGEAIY0RV29h9wIujegacHoB3QBCGuFe+P//P0o6IFYjhgGkaoQbEH7lJmUpcdQABkZKwwAAc2VDvGXbEwcAAAAASUVORK5CYII=',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIZJREFUOE9jvP77138GCgAjqQbcf/ECxTqCBqBrQHcsTgMQGmE+ZMTqUQwDMG0EGQDR7Ckji2EI3ADsTv3P4CkjhzeIcRqAzTZsJjFue/zwP8yJuJyJrDHi6i3UWNj2+BE4lHDZiK4BIxb+//+PNSER0ggziBHdAGI1wg0Iv3KTsqQ8agADAMkdVllhiQRUAAAAAElFTkSuQmCC'
    ],
    sequence: [0, 0, 1, 1, 2, 2]
  },
  ac: {
    id: 'sea',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAE9JREFUOE9jDL9y8z8DBYCR6gZ8vvII7B5eHTmi3AV3AbpGYg2ivheIcjeSIvq6AFu4EOUCfAFMlAH4wmWQGUBs4kH2EtgL5KZCkEEDHwYA8YtLQRALKCIAAAAASUVORK5CYII=',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAE9JREFUOE9jDL9y8z8DBYCR6gZ8vvII7B5eHTmi3AV3AbpGYg2ivheIcjeSIvq6AFu4EOUCfAFMlAH4wmWQGUBs4kH2EtgL5KZCkEEDHwYA8YtLQRALKCIAAAAASUVORK5CYII=',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAE9JREFUOE9jDL9y8z8DBYCRJgZ8vvII7CZeHTmCbkNxAbpGYgyijRcIuhtJAf1dgB4uRLsAVwATbQCucBmEBhCTeJC9A/cCOakQZNDAhwEA60NK6u+iNxUAAAAASUVORK5CYII='
    ],
    sequence: [0, 0, 0, 1, 1, 1]
  },
  ad: {
    id: 'bridge',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAACdJREFUOE9j3Dan+z8DBYBx4A14cObAUPcCxYE4GgYMjKNhQHkYAABkwjANIjVBiwAAAABJRU5ErkJggg=='
  },
  ae: {
    id: 'bridge edge',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGNJREFUOE9j3Dan+z8DBYBx4A14cOYAZV4Iv3Lzv+yERngoPC6oxxsi6GoZB48B11wSwU7n1ZHD64XPVx6B5bX2zGcAeZfRa8VucCDCNMIUoBuELg7jg8OAgnTEMGoAwyAIAwB3/VPdwmQ5GQAAAABJRU5ErkJggg==',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGNJREFUOE9j3Dan+z8DBYBx4A14cOYAZV4Iv3Lzv+yERngoPC6oxxsi6GoZB48B11wSwU7n1ZHD64XPVx6B5bX2zGcAeZfRa8VucCDCNMIUoBuELg7jg8OAgnTEMGoAwyAIAwB3/VPdwmQ5GQAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAE1JREFUOE9j3Dan+z8DBYBx4A14cOYAZV4Iv3Lzv+yERngoPC6oxxsi6GoZB94ArxW7sYYBr44cilc+X3mE1WtgL1CQDBhGDWAYDmEAAKq0RN2lATVNAAAAAElFTkSuQmCC'
    ],
    sequence: [0, 0, 0, 1, 1, 1]
  },
  af: {
    id: 'horizontal river',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFBJREFUOE9jDL9y8z8DBYCRLgb4aEjgdCNRLqDYAHxBRJQL6GsAPv+CXLLlxgsUB2F4gWIDSE1TgyAQF//5iDMvoAcYNu8xUmwAXTITvpgBAOVBPVm6JXRAAAAAAElFTkSuQmCC',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFBJREFUOE9jDL9y8z8DBYCRLgb4aEjgdCNRLqDYAHxBRJQL6GsAPv+CXLLlxgsUB2F4gWIDSE1TgyAQF//5iDMvoAcYNu8xUmwAXTITvpgBAOVBPVm6JXRAAAAAAElFTkSuQmCC',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFRJREFUOE9jDL9y8z8DBYCRqgb4aEgQdMuWGy9Q1KC4gGIDCFqPRQF1w4AsFyz+8xEjGtEDCtlg9HBipNgAqqYDssKA6i4gNTFhpAOKDSA1HChOiQAVxkNZKiRZagAAAABJRU5ErkJggg=='
    ]
  },
  ag: {
    id: 'river corner',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHNJREFUOE9jZCAAwq/c/I9PCSMuSUIaYfowDMCl0UdDAsOuLTdeMKAYgE0zNo0wk1AMIKQZpBgbgLsA2QBkW3FpRAkDdNthBhDSDDIE7AJiQxybwYykagZZiOwyogzA5yWCBhAKD9oaQMh2cCzgC8ShYQAAbx1aQRARbCUAAAAASUVORK5CYII=',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHNJREFUOE9jZCAAwq/c/I9PCSMuSUIaYfowDMCl0UdDAsOuLTdeMKAYgE0zNo0wk1AMIKQZpBgbgLsA2QBkW3FpRAkDdNthBhDSDDIE7AJiQxybwYykagZZiOwyogzA5yWCBhAKD9oaQMh2cCzgC8ShYQAAbx1aQRARbCUAAAAASUVORK5CYII=',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIpJREFUOE+lktENgDAIRMsWruAqTqCLuogm6gZuQaMJhNKCbe0v3OO4AoiIwXnLfnnlABbgS0jUDFAjnMaBXSUASywFeh8GeJM1YD3u3EGN9VKar4Ne8QOsBsg1khXm7XTvoBSgCaBmarCmyixAOrAAcmL2jQTQYvd+RZEdtAKovxmgQ+0GUC6/ARER0XRd7DixEgAAAABJRU5ErkJggg=='
    ]
  },
  zz: {
    id: '',
    color: 'transparent',
  },
  $: {
    id: 'wall',
    color: '#ff8fe1'
  },
}

export {
  tiles,
  editConfig
  // plainColors,
  // animationTiles,
  // blank,
}