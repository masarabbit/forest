import { tileTypes } from '../scripts/data/config.js'

const tiles = {
  a: {
    id: 'green rounded corner',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADZJREFUOE9jZMACwq/c/I9NHJsYI7IgKRph+uAGkKMZZAjYAHI1U8cASmwHu2DUgNEwGBTpAAATSTBBsjy3lAAAAABJRU5ErkJggg==',
    type: 'L'
  },
  b: {
    id: 'green rounded corner white background',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADZJREFUOE9jZMACwq/c/I9NHJsYI7IgKRph+uAGkKMZZAjYAHI1U8cASmwHu2DUgNEwGBTpAAATSTBBsjy3lAAAAABJRU5ErkJggg==',
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
    type: 'X'
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
    type: 'X'
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
    type: 'A'
  },
  l: {
    id: '',
    color: '#0d8799',
    type: 'X'
  },
  m: {
    id: 'door interior',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERJREFUOE9j/P///38GCgDjMDKAr2MWOCQ+VaSBaWL58DAgVgO6BYy87TPBsUCqzTD11DOA3KQAd8GoAeSGAAPDwAciAAy2V7Fit1hpAAAAAElFTkSuQmCC',
    type: 'X'
  },
  n: {
    id: 'brick wall',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEFJREFUOE9j/P///38GCgDjxf8fUQzQY+BjuMTwCaeR6PKDwACKwwBkACl+Rg8cxsFhAAXJgGEQRCPFKXE0HTAAAG5JbQFIfPCXAAAAAElFTkSuQmCC',
    type: 'X'
  },
  o: {
    id: 'ladder',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADtJREFUOE9j/P///38GCgAjsgGlqdEM3bOX4jUOXQ2KASCdIAX4ALoFGAaQ6hvqGjAaBpAoHE0HQzEMAGqVY9GFHKT2AAAAAElFTkSuQmCC',
    type: 'X'
  },
  p: {
    id: 'ladder from top',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGlJREFUOE9j3Dan+z8DBYDx/////7fP7QEbsdDCjyH+xCa8xiGr8UwuYUAxAGYIPhOQLcBqACm+ob4Bo2EwkOkAFPew1EhsOgClARAAp0SqGACzmZBLYDbD1MNdgO50dIPQNRI0gNiwAAAXq4OxO7IYfwAAAABJRU5ErkJggg==',
    type: 'X'
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
    // img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFdJREFUOE9jZGBgYAi/cvM/iCYHMA4OAyhxBdgLVDGAXEPgLkCOAVJiBasBpBhG0ABkw/7///8/4uotlORCsgHoiW0IGQDyP7a8Ql8vgFyA7hKSXIDNCwBbxTYUVVbliQAAAABJRU5ErkJggg==',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGhJREFUOE9jZGBgYAi/cvM/iCYHMA4OAyhxBdgLVDGAXIPgLkCPAfSYWamjzogttnAagC1K/////z/i6i0UKZINgOmGGUS2ATCD6GcAyP/YwoVoF1BsAMh2bIYQ7QJk5yMbRJYByK4BAOTwQRDpIwyDAAAAAElFTkSuQmCC',
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
    id: 'sand',
    color: '#d7fbfa',
    type: 'X'
  },
  ab: {
    id: 'sea edge',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFNJREFUOE9jvP77138GCgDjCDRAg4UVJcQIhgG6BvTwxmkAIY0wgzAMIKQx4uot7F7ApRFdA4YX/v//jzUhEdII9wK6AcRqhBsQfuUmZUl51AAGAPsNQky1DCnwAAAAAElFTkSuQmCC',
    type: 'A',
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
    type: 'X',
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
  ak: {
    id: 'white round corner dark green background',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADZJREFUOE9jZMAC/v///x+bODYxRmRBUjTC9MENIEczyBCwAeRqpo4BlNgOdsGoAaNhMCjSAQBl0D/RLovMkAAAAABJRU5ErkJggg==',
    type: 'L',
    color: '#0d8799',
  },
  al: {
    id: 'green rounded half-corner',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERJREFUOE9jZKAQMFKon2HUAIahGAahV678Z2Jghcc+0dGIrhFmAlEG4NIMMoQoA8Kv3PyPK8USNACf7US5AJ/tg8MAAAdsGCm+oom3AAAAAElFTkSuQmCC',
    type: 'L',
    color: '#0d8799',
  },
  am: {
    id: 'green half-wall',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEdJREFUOE9jZKAQMFKon2HUAIbBEAbhV27+JyUq/zH8ZmBiYIVrYSTVAHTLiDIA3VZkQ4gyAJ8XCRqAz3aQwQQNIBTAA28AAJuNHimSWaKCAAAAAElFTkSuQmCC',
    type: 'L',
    color: '#0d8799',
  },
  an: {
    id: 'rock corner',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAC1JREFUOE9j3Hrm/H8GCgDjqAEMo2HAMCzCAJQNKEnOjFQxgBJDwC5ABqR6BwB37zUBurEQMAAAAABJRU5ErkJggg==',
    type: 'A',
    color: '#57d4d9',
  },
  ao: {
    id: 'rock',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEVJREFUOE9j3LL/wH8GCgDjqAEMGGHAyMuPEqT/P3/EG8QDawDItYxbz5zHmw4IeoHmBqCHILqLCHph8BmA7iKSvUB1AwB2t0ulp0cLAQAAAABJRU5ErkJggg==',
    // color: '#e0ccc0',
    type: 'A',
  },
  ap: {
    id: 'grass corner',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZEAD13//+o8uho/PCJMkVSNMH9gAcjWD9FJuACW2g10wasBoGAyPdAAAEz48wSGi3XsAAAAASUVORK5CYII=',
    color: '#b4bfc0',
    type: 'L',
  },
  aq: {
    id: 'rock plain',
    color: '#b5cccf',
    type: 'X',
  },
  aw: {
    id: 'rock dark plain',
    color: '#b4bfc0',
    type: 'X'
  },
  ax: {
    id: 'rock corner sand',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAC1JREFUOE9j3Hrm/H8GCgDjqAEMo2HAMCzCAJQNKEnOjFQxgBJDwC5ABqR6BwB37zUBurEQMAAAAABJRU5ErkJggg==',
    type: 'L',
    color: '#d7fbfa',
  },
  ay: {
    id: 'grass2',
    color: '#c2bdb2',
    type: 'X'
  },
  az: {
    id: 'sand corner',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZEAD13//+o8uho/PCJMkVSNMH9gAcjWD9FJuACW2g10wasBoGAyPdAAAEz48wSGi3XsAAAAASUVORK5CYII=',
    type: 'L',
    color: '#a2fcf0',
  },
  ba: {
    id: 'rock corner grass',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAC1JREFUOE9j3Hrm/H8GCgDjqAEMo2HAMCzCAJQNKEnOjFQxgBJDwC5ABqR6BwB37zUBurEQMAAAAABJRU5ErkJggg==',
    type: 'L',
    color: '#a2fcf0',
  },
  bb: {
    id: 'sand edge',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADlJREFUOE9jXPTnw38GCgDj9d+/UAw4zfiNJOMwDEDXjW6g6X8uFCUEDSDknFEDGBhGw2A0DED5BABULkFFb2n5SQAAAABJRU5ErkJggg==',
    type: 'L'
  },
  bc: {
    id: 'grass corner sand',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEVJREFUOE9jXPTnw38GCgDjgBgQxyLACHM0XhcgK8TlS6wGEKMRpwtI0QwyBMMFFBlAqmYMF4wawMBAURiQoxklFgbMAAC//j8rLjXbKQAAAABJRU5ErkJggg==',
    type: 'L',
    color: '#d7fbfa',
  },
  bd: {
    id: 'green rounded corner green background',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADZJREFUOE9jZMACwq/c/I9NHJsYI7IgKRph+uAGkKMZZAjYAHI1U8cASmwHu2DUgNEwGBTpAAATSTBBsjy3lAAAAABJRU5ErkJggg==',
    color: '#a2fcf0',
    type: 'L'
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
  row: 1,
  d: 16
}

const tileX = index => (index % tileSheetData.column) * tileSheetData.d
const tileY = index => Math.floor(index / tileSheetData.column) * tileSheetData.d

const tileData = {
  tiles,
  tilesList,
  tileSheetData,
  tileX,
  tileY
}

export default tileData