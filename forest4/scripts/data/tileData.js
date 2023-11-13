
const editConfig = {
  a: 90,
  b: 180,
  c: 270,  
}

const tileTypes = {
  Q: ['', 'a', 'b', 'c', 'h', 'v', 'ah', 'bh', 'ch', 'av', 'bv', 'cv', 'avh', 'bvh', 'cbh'],
  X: [''],
  L: ['', 'a', 'b', 'c'],
  H: ['', 'a'],
  A: ['', 'h'],
  T: ['', 'v']
}

const tiles = {
  a: {
    id: 'green rounded corner',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEFJREFUOE9jZEACoVeu/AdxmRhYkYXxshlhsiDNpGiE6QMbQK5mkF5GSjRTx4DwKzfBAUcuYBw1gGE0DBgGQRgAAFrpMEH7yl7MAAAAAElFTkSuQmCC',
    type: 'L'
  },
  b: {
    id: 'green rounded corner white background',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEFJREFUOE9jZEACoVeu/AdxmRhYkYXxshlhsiDNpGiE6QMbQK5mkF5GSjRTx4DwKzfBAUcuYBw1gGE0DBgGQRgAAFrpMEH7yl7MAAAAAElFTkSuQmCC',
    color: '#fff',
    type: 'L'
  },
  c: {
    id: '',
    color: '#58d3d8',
    type: 'X'
  },
  d: {
    id: 'roof with curved edge',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAD9JREFUOE9jDL9y8z8DBYBx1ACG0TBgGNZhsEJbDSWHRFy9hTXHYKQDdI3outANQjGAkGaYYciGwA0gVjO6IQBiezxBrbH3wgAAAABJRU5ErkJggg==',
    type: 'L'
  },
  e: {
    id: 'white round corner green background',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGBJREFUOE9jDL9y8z8DEmBhZGRYoqWKLISXzQgzAKRxgaYKWDGITSwAGwDTTIpGmAWM0Vdv/QfZTI5mkCFgA0jxM7rXGH//+wf2ArmA8f///yixQKpBowYwMIyGARXCAAD2YD/RFR8kNAAAAABJRU5ErkJggg==',
    type: 'L'
  },
  f: {
    id: 'white',
    color: '#ffffff',
    type: 'X'
  },
  g: {
    id: 'white corner',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADZJREFUOE9jZMAC/v///x+bODYxRmRBUjTC9MENIEczyBCwAeRqpo4BlNgOdsGoAaNhMCjSAQBl0D/RLovMkAAAAABJRU5ErkJggg==',
    color: '#a2fcf0',
    type: 'L'
  },
  h: {
    id: 'door',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEJJREFUOE9j/P///38GCgAjLgNKU6NRjO2evRSrNRgGoGtE14VuENwAQhpxGUQdA0i1HeYakHfALhg1YDQMBjwdAAC5Y2zRFw3VTAAAAABJRU5ErkJggg==',
    type: 'L'
  },
  i: {
    id: 'circle window',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFhJREFUOE9j/P///38GCgAjzQwoTY1GcVf37KVY3YnhAnSN6LrQDUIxgJBmmGHIhlDPAGJtR3cF3AXDwACQ34j1Bm1iARa6hFyBNyEhpzqykzKpGZPi3AgAkBdj0eBUcukAAAAASUVORK5CYII=',
    type: 'X'
  },
  j: {
    id: 'square window',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADxJREFUOE9j/P///38GCgAjTQwoTY3G6qbu2UsxxDFcgEszTCe6IaMGMDCMhgEtwgCU4ihKyqRmTIpzIwCnh2PRXEERmwAAAABJRU5ErkJggg==',
    type: 'H'
  },
  k: {
    id: 'square window left',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADhJREFUOE9j/P///38GCgDjqAEMKGFQmhqNEpzds5cSDF64AeiaYToJGTJqAAMiFkYDEZJsyEmJAE84YNEO1BNiAAAAAElFTkSuQmCC',
    type: 'Q'
  },
  l: {
    id: '',
    color: '#0d8799',
    type: 'X'
  },
  m: {
    id: 'door interior',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERJREFUOE9j/P///38GCgDjMDKAr2MWOCQ+VaSBaWL58DAgVgO6BYy87TPBsUCqzTD11DOA3KQAd8GoAeSGAAPDwAciAAy2V7Fit1hpAAAAAElFTkSuQmCC',
    type: 'L'
  },
  n: {
    id: 'brick wall',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEFJREFUOE9j/P///38GCgDjxf8fUQzQY+BjuMTwCaeR6PKDwACKwwBkACl+Rg8cxsFhAAXJgGEQRCPFKXE0HTAAAG5JbQFIfPCXAAAAAElFTkSuQmCC',
    type: 'L'
  },
  o: {
    id: 'ladder',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADtJREFUOE9j/P///38GCgAjsgGlqdEM3bOX4jUOXQ2KASCdIAX4ALoFGAaQ6hvqGjAaBpAoHE0HQzEMAGqVY9GFHKT2AAAAAElFTkSuQmCC',
    type: 'L'
  },
  p: {
    id: 'ladder from top',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGlJREFUOE9j3Dan+z8DBYDx/////7fP7QEbsdDCjyH+xCa8xiGr8UwuYUAxAGYIPhOQLcBqACm+ob4Bo2EwkOkAFPew1EhsOgClARAAp0SqGACzmZBLYDbD1MNdgO50dIPQNRI0gNiwAAAXq4OxO7IYfwAAAABJRU5ErkJggg==',
    type: 'L'
  },
  q: {
    id: 'stair',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAACdJREFUOE9j/P///38GCgDjwBvw4MyBoe4FigNxNAwYGEfDgPIwAAAjDz2NCL4txQAAAABJRU5ErkJggg==',
    type: 'H'
  },
  r: {
    id: 'art work',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGpJREFUOE9jLEmJ+s9AAWCkmgHds5eS5I7S1GiwergLqGbAor+PGKKZG3C6hplhHlgOpwtABoAALkOINgCXISQZgM0Qkg1AN4QsA5ANIdsAmCEUGQAyJI5ZDn80EpscqZ8SibUZXR3FuREApZtmIapkg0wAAAAASUVORK5CYII=',
    type: 'X'
  },
  s: {
    id: 'tree top left',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFFJREFUOE9jZCADhF+5+R+mjZEU/cgaSTYAm2aQIUS5AJdmogzAp5mgAYQ04zWAGM04DSBWM20MIMV2rC4YWANItR3DCxQZQI5muAvI1QwyAAArKTBBsURgUwAAAABJRU5ErkJggg==',
    type: 'A'
  },
  t: {
    id: 'tree bottom left',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFdJREFUOE9jZGBgYAi/cvM/iCYHMA4OAyhxBdgLVDGAXEPgLkCOAVJiBasBpBhG0ABkw/7///8/4uotlORCsgHoiW0IGQDyP7a8Ql8vgFyA7hKSXIDNCwBbxTYUVVbliQAAAABJRU5ErkJggg==',
    type: 'A'
  },
  u: {
    id: 'flower',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJRJREFUOE9jZCAS/Hxg9x+mlF3hECOMDWfgUgBSCJNjlldm+PvwLlgvzBCwAfgUwORBmmEAZAiGAbgUELKAKBcgG4LsfBCbqDDQ27v0/yXnaEZ0Gm4APgUwf4PUwNggwzBiAZcCQrEMN4mQQlzhgGIAOWkBIxCxJRZ8aQHFAHLSAtEuoDgMcEU13AXkpgWUWCAnLQAAqaK0EZbd8nEAAAAASUVORK5CYII=',
    type: 'X'
  },
  v: {
    id: 'grass',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEpJREFUOE9jZKAQMIL0h1+5+X+ljjpeNi57wJqQDYEZhmwoPkfCDSDXJyPBAEIxRFQYoMcMsqFEGTASopFQSBMVBvhCmigDyM0LAHgNSBGwjzApAAAAAElFTkSuQmCC',
    type: 'X'
  },
  w: {
    id: '',
    color: '#a2fcf0',
    type: 'X'
  },
  x: {
    id: 'path edge top left',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAENJREFUOE9jZMACnv3u/49NHJsYI7IgKRph+uAGkKMZZAjYAHI1U8cASmwHu2DUgMEWBqAMgJK2icgQgygayXE+yIcAwFI5ATyc1IoAAAAASUVORK5CYII=',
    type: 'L'
  },
  y: {
    id: 'path color',
    color: '#e6fb8f',
    type: 'X'
  },
  z: {
    id: 'path end',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAElJREFUOE9jZKAQMFKonwHDgGe/+//jM1SKtRBFD5xDSCO6oTCDwAaQqhlmGMgQyg0g13aYKxgH1ID/DP8ZBtYFoHAYdQEVwgAADhY0Ze2SShoAAAAASUVORK5CYII=',
    type: 'L'
  },
  aa: {
    id: '',
    color: '#d7fbfa',
    type: 'X'
  },
  ab: {
    id: 'sea edge',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFNJREFUOE9jvP77138GCgDjCDRAg4UVJcQIhgG6BvTwxmkAIY0wgzAMIKQx4uot7F7ApRFdA4YX/v//jzUhEdII9wK6AcRqhBsQfuUmZUl51AAGAPsNQky1DCnwAAAAAElFTkSuQmCC',
    type: 'Q',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFNJREFUOE9jvP77138GCgDjCDRAg4UVJcQIhgG6BvTwxmkAIY0wgzAMIKQx4uot7F7ApRFdA4YX/v//jzUhEdII9wK6AcRqhBsQfuUmZUl51AAGAPsNQky1DCnwAAAAAElFTkSuQmCC',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFtJREFUOE9jvP77138GCgAj3Q3QYGFFcS9BF6BrQPctTgMIaYQZhGEAIY0RV29h9wIujegacHoB3QBCGuFe+P//P0o6IFYjhgGkaoQbEH7lJmUpcdQABkZKwwAAc2VDvGXbEwcAAAAASUVORK5CYII=',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIZJREFUOE9jvP77138GCgAjqQbcf/ECxTqCBqBrQHcsTgMQGmE+ZMTqUQwDMG0EGQDR7Ckji2EI3ADsTv3P4CkjhzeIcRqAzTZsJjFue/zwP8yJuJyJrDHi6i3UWNj2+BE4lHDZiK4BIxb+//+PNSER0ggziBHdAGI1wg0Iv3KTsqQ8agADAMkdVllhiQRUAAAAAElFTkSuQmCC'
    ],
    sequence: [0, 0, 1, 1, 2, 0]
  },
  ac: {
    id: 'sea',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAE9JREFUOE9jDL9y8z8DBYCR6gZ8vvII7B5eHTmi3AV3AbpGYg2ivheIcjeSIvq6AFu4EOUCfAFMlAH4wmWQGUBs4kH2EtgL5KZCkEEDHwYA8YtLQRALKCIAAAAASUVORK5CYII=',
    type: 'L',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAE9JREFUOE9jDL9y8z8DBYCR6gZ8vvII7B5eHTmi3AV3AbpGYg2ivheIcjeSIvq6AFu4EOUCfAFMlAH4wmWQGUBs4kH2EtgL5KZCkEEDHwYA8YtLQRALKCIAAAAASUVORK5CYII=',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAE9JREFUOE9jDL9y8z8DBYCRJgZ8vvII7CZeHTmCbkNxAbpGYgyijRcIuhtJAf1dgB4uRLsAVwATbQCucBmEBhCTeJC9A/cCOakQZNDAhwEA60NK6u+iNxUAAAAASUVORK5CYII='
    ],
    sequence: [0, 0, 0, 1, 1, 1]
  },
  ad: {
    id: 'bridge',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAACdJREFUOE9j3Dan+z8DBYBx4A14cObAUPcCxYE4GgYMjKNhQHkYAABkwjANIjVBiwAAAABJRU5ErkJggg==',
    type: 'H',
  },
  ae: {
    id: 'bridge edge',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGNJREFUOE9j3Dan+z8DBYBx4A14cOYAZV4Iv3Lzv+yERngoPC6oxxsi6GoZB48B11wSwU7n1ZHD64XPVx6B5bX2zGcAeZfRa8VucCDCNMIUoBuELg7jg8OAgnTEMGoAwyAIAwB3/VPdwmQ5GQAAAABJRU5ErkJggg==',
    type: 'X',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGNJREFUOE9j3Dan+z8DBYBx4A14cOYAZV4Iv3Lzv+yERngoPC6oxxsi6GoZB48B11wSwU7n1ZHD64XPVx6B5bX2zGcAeZfRa8VucCDCNMIUoBuELg7jg8OAgnTEMGoAwyAIAwB3/VPdwmQ5GQAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAE1JREFUOE9j3Dan+z8DBYBx4A14cOYAZV4Iv3Lzv+yERngoPC6oxxsi6GoZB94ArxW7sYYBr44cilc+X3mE1WtgL1CQDBhGDWAYDmEAAKq0RN2lATVNAAAAAElFTkSuQmCC'
    ],
    sequence: [0, 0, 0, 1, 1, 1]
  },
  af: {
    id: 'horizontal river',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFBJREFUOE9jDL9y8z8DBYCRLgb4aEjgdCNRLqDYAHxBRJQL6GsAPv+CXLLlxgsUB2F4gWIDSE1TgyAQF//5iDMvoAcYNu8xUmwAXTITvpgBAOVBPVm6JXRAAAAAAElFTkSuQmCC',
    type: 'H',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFBJREFUOE9jDL9y8z8DBYCRLgb4aEjgdCNRLqDYAHxBRJQL6GsAPv+CXLLlxgsUB2F4gWIDSE1TgyAQF//5iDMvoAcYNu8xUmwAXTITvpgBAOVBPVm6JXRAAAAAAElFTkSuQmCC',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFRJREFUOE9jDL9y8z8DBYCRqgb4aEgQdMuWGy9Q1KC4gGIDCFqPRQF1w4AsFyz+8xEjGtEDCtlg9HBipNgAqqYDssKA6i4gNTFhpAOKDSA1HChOiQAVxkNZKiRZagAAAABJRU5ErkJggg=='
    ]
  },
  ag: {
    id: 'river corner',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHNJREFUOE9jZCAAwq/c/I9PCSMuSUIaYfowDMCl0UdDAsOuLTdeMKAYgE0zNo0wk1AMIKQZpBgbgLsA2QBkW3FpRAkDdNthBhDSDDIE7AJiQxybwYykagZZiOwyogzA5yWCBhAKD9oaQMh2cCzgC8ShYQAAbx1aQRARbCUAAAAASUVORK5CYII=',
    type: 'L',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHNJREFUOE9jZCAAwq/c/I9PCSMuSUIaYfowDMCl0UdDAsOuLTdeMKAYgE0zNo0wk1AMIKQZpBgbgLsA2QBkW3FpRAkDdNthBhDSDDIE7AJiQxybwYykagZZiOwyogzA5yWCBhAKD9oaQMh2cCzgC8ShYQAAbx1aQRARbCUAAAAASUVORK5CYII=',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIpJREFUOE+lktENgDAIRMsWruAqTqCLuogm6gZuQaMJhNKCbe0v3OO4AoiIwXnLfnnlABbgS0jUDFAjnMaBXSUASywFeh8GeJM1YD3u3EGN9VKar4Ne8QOsBsg1khXm7XTvoBSgCaBmarCmyixAOrAAcmL2jQTQYvd+RZEdtAKovxmgQ+0GUC6/ARER0XRd7DixEgAAAABJRU5ErkJggg=='
    ]
  },
  ah: {
    id: 'duck boat tile 1',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGdJREFUOE9jDL9y8z8DBYCR6gZ8vvII7B5eHTmC7lohs5EB7gJ0jYQMAmkGAZK8sEJbDeGqj90DYAByoJDlhWFmAMg7KOmAYKrBogDDAEKJB5sl4IREaipENoiklIisEWYp2QbADAMAjiBVfCMVU9AAAAAASUVORK5CYII=',
    type: 'A',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGdJREFUOE9jDL9y8z8DBYCR6gZ8vvII7B5eHTmC7lohs5EB7gJ0jYQMAmkGAZK8sEJbDeGqj90DYAByoJDlhWFmAMg7KOmAYKrBogDDAEKJB5sl4IREaipENoiklIisEWYp2QbADAMAjiBVfCMVU9AAAAAASUVORK5CYII=',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGVJREFUOE9jDL9y8z8DBYCRJgZ8vvII7CZeHTm8blshs5EBxQXoGvEZBNIMAiR5YYW2GsJFH7sHwADkACHLC8PMAJB3MNIBqSkaqwHEpkKYZfCEREoqRHYpSSkR3YsgSykyAGQgADt8VXyzCD2OAAAAAElFTkSuQmCC'
    ],
    sequence: [0, 0, 0, 1, 1, 1]
  },
  ai: {
    id: 'duck boat tile 2',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJJJREFUOE9j3Dan+z8DBYCRYgP+f+iCu2D7GkaS3cKIbABI97075iQZArLy//8PXXBNEU/88RogO6ERLv+4oJ6BcgPQvUCsC7p7DMAuwQgDkCA+Q0BegGnGaQApoYjVBSPNAK8Vu8FJeavHeaxe995hCBbHJc8YfuUm2IDPVx6hKIRp5NWRA4vjkocbQErII6sFAF28WYPTAkxfAAAAAElFTkSuQmCC',
    type: 'A',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJJJREFUOE9j3Dan+z8DBYCRYgP+f+iCu2D7GkaS3cKIbABI97075iQZArLy//8PXXBNEU/88RogO6ERLv+4oJ6BcgPQvUCsC7p7DMAuwQgDkCA+Q0BegGnGaQApoYjVBSPNAK8Vu8FJeavHeaxe995hCBbHJc8YfuUm2IDPVx6hKIRp5NWRA4vjkocbQErII6sFAF28WYPTAkxfAAAAAElFTkSuQmCC',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJFJREFUOE9j3Dan+z8DBYCRYgP+f+iCu2D7GkaS3cKIbABI97075iQZArLy//8PXXBNEU/88RogO6ERLv+4oJ6BcgPQvUCsC7p7DMAuwQgDkCA+Q0BegGnGaQApoYjVBSPNgPArN/9/vvII7O2tHuexet97hyFOeUavFbv/8+rIgRWgGwTTiE+eEeQCUkIdXS0AUwZcg3hDBToAAAAASUVORK5CYII='
    ],
    sequence: [0, 0, 0, 1, 1, 1]
  },
  aj: {
    id: 'duck boat tile 3',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGxJREFUOE9jDL9y8z8DBYCR6gZ8vvII7B5eHTmi3AV3AbpGYg2ivheIcjeSIspd8P9D1/+IJ/6kWgxXzwgyAMQjxhBsAUuUAfhiiCgD8PmPOgYQ439crmD0WrEbHIjEJl10g3AmZWLjleKEBAByP1FBRxKm8wAAAABJRU5ErkJggg==',
    type: 'A',
    frames: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGxJREFUOE9jDL9y8z8DBYCR6gZ8vvII7B5eHTmi3AV3AbpGYg2ivheIcjeSIspd8P9D1/+IJ/6kWgxXzwgyAMQjxhBsAUuUAfhiiCgD8PmPOgYQ439crmD0WrEbHIjEJl10g3AmZWLjleKEBAByP1FBRxKm8wAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHJJREFUOE9jDL9y8z8DBYCRJgZ8vvII7CZeHTmCbkNxAbpGYgyijRcIuhtJAeUu+P+h63/EE39SLEVRywgyACRCrCHoAUu0AbhiiGgDcPmROgYQ639srgC7wHuHIdFJF90QRq8Vu//D0jwxSRfDAEpzIwAVpFLqfCBXTQAAAABJRU5ErkJggg=='
    ],
    sequence: [0, 0, 0, 1, 1, 1]
  },
  zz: {
    id: '',
    color: 'transparent',
    type: 'X',
  },
  $: {
    id: 'wall',
    color: '#ff8fe1',
    type: 'X',
  },
}

const tilesList = Object.keys(tiles).map(tile => {
  return {
    tile,
    frames: tiles[tile]?.frames ? tiles[tile].frames.map((_, i) => i) : [0]
  }
}).map(tileData => {
  return tileTypes[tiles[tileData.tile].type].map(append => {
    return tileData.frames.map(frameIndex => {
      return [`${tileData.tile}${append ? `.${append}` : ''}`, frameIndex]
    })
  }).flat(1)
}).flat(1)

const tileSheetData = {
  column: tilesList.length,
  row:  1,
  d: 16
}

const tileX = index => (index % tileSheetData.column) * tileSheetData.d
const tileY = index => Math.floor(index / tileSheetData.column) * tileSheetData.d

export {
  tiles,
  editConfig,
  tileTypes,
  tilesList,
  tileSheetData,
  tileX,
  tileY
}