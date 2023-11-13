
const mapData = {
  one: {
    column: 30,
    row: 20,
    map: 'zz14,w2,zz5,f1,i1,f3,i1,f1,zz3,s1,s.h1,w8,s1,s.h1,w8,f7,w1,zz2,t1,t.h1,w8,t1,t.h1,w5,s1,s.h1,w1,g.c1,f2,h1,f2,g.b1,w1,zz2,w5,a1,a.a1,w10,t1,t.h1,w4,z1,w4,zz2,w1,v1,w2,a1,b.c1,b.b1,a.a1,w8,v1,w4,v1,w1,y1,s1,s.h1,w2,zz2,w4,c1,e.c1,e.b1,c1,w15,y1,t1,t.h1,w2,zz2,w4,b.c1,c2,b.b1,s1,s.h1,w3,x1,y9,x.b1,w2,v1,w1,zz2,w4,f4,t1,t.h1,w3,y1,w14,zz2,s1,s.h1,w2,k.h1,f2,k1,w5,y1,w14,zz2,t1,t.h1,v1,w1,g.c1,h1,f1,g.b1,w5,y1,w14,zz2,w13,z.b1,w14,zz2,aa13,ad1,aa14,zz2,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ad1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,zz2,c8,ac2,c3,ad1,c2,ac2,c1,ac2,c7,zz2,c11,ac1,c1,ad1,c6,ac2,c6,zz2,c2,ac2,c6,ac2,c1,ad1,c10,ac2,c2,zz2,c1,ac2,c4,ac2,c3,ah1,ai1,aj1,c3,ac2,c3,ac2,c3,zz2,c6,ac2,c7,ac1,c2,ac1,c7,ac1,c1,zz2,c12,ac1,c8,ac1,c6,zz31',
    walls: '$14,2,$17,8,$2,8,$7,1,$4,8,$2,5,$2,1,$3,1,$3,1,$2,5,$2,10,$2,9,$2,4,$4,16,$2,2,$2,4,$4,16,$2,2,$2,4,$6,18,$2,4,$6,18,$4,2,$4,20,$4,2,$1,1,$2,20,$2,28,$2,28,$2,28,$15,1,$29,1,$29,1,$135',
    npcs: [
      // { pos: 313, avatar: 'bunny', defaultDir: 'down', event: 'apple', name: 'bunnio', motion: 'randomWalk' },
      // { pos: 313, avatar: 'bunny', defaultDir: 'down', event: 'apple', name: 'bunnio', motion: 'facing-l' },
      { pos: 152, avatar: 'bunny', defaultDir: 'down', event: 'apple', name: 'bunnio', motion: ['u', 'r', 'd', 'l'] },
      { pos: 313, avatar: 'bunny', defaultDir: 'right', event: 'tomato', name: 'tololo', motion: [0] },
    ],
    events: {
      14: { event: 'transport', gateway: 'portal1' },
      15: { event: 'transport', gateway: 'portal1' },
      // 464: { event: 'event-animation', act: 'greeting' },
      249: { event: 'check', key: 'art1' },
    },
    eventContents: {
      hello: { first: { text: ['hello!'], }, },
      tomato: {
        first: { 
          text: ['hello!', 'test'], 
          face: ['happy', 'sad'], 
        },
      },
      art1: {
        text: [
          'hello! I\'m a tree!',
          'yeah!'
        ],
        art: 'http://masahito.co.uk/img/icecream_bunny.png',
        // item: null,
        direction: 'up'
      },
      apple: {
        first: { 
          text: ['how are you?', 'test'], 
          choice: {
            'okay': 's_1',
            'not so good': 's_2',
            'banana': 'banana'
          }
        },
        s_1: {
          text: ['yeah!'], 
          choice: {
            'yes': 's_3',
            'no': 's_4'
          }
        },
        s_2: {
          text: ['really?'], 
          choice: {
            'yes': 's_3',
            'no': 's_4'
          }
        },
        s_3: { text: ['cool!','cool two'] },
        s_4: { 
          text: ['whatever'],
          face: ['sad'] 
        },  
        banana: { 
          text: ['banana!', 'bananananana!'],
          // event: {
          //   act: testAct,
          // },
        }  
      },
      test_event: {
        first: { 
          text: ['this is a test event', 'test test test'], 
          choice: {
            'yeah!': 's_1',
            'yo!': 's_2',
          },
        },
        s_1: {
          text: ['ho!'], 
          // event: {
          //   act: testAct,
          // },
        },
        s_2: {
          text: ['takoyaki!'], 
        },  
      },
      greeting: {
        sequences: [
          {
            tololo: ['r', 'tr' ,'d4'],
          },
          {
            tololo: { dialog: 'welcome' },
          },
        ],
        repeat: false,
      },
      welcome: {
        first: { 
          text: ['welcome!', `is it the first time you've come here?`], 
          choice: {
            'yes': 's_1',
            'no': 's_2',
          },
        },
        s_1: {
          text: ['I see,', `in that case, here's an intro...`], 
          event: {
            act: {
              sequences: [ 
                {
                  tololo: ['u4', 'tl', 'tl', 'l', 'tr']
                },
              ],
              repeat: false,
            }
          },  
        },
        s_2: {
          text: ['ok! in that case, enjoy!'], 
          event: {
            act: {
              sequences: [ 
                {
                  tololo: ['u4', 'tl', 'tl', 'l', 'tr']
                },
              ],
              repeat: false,
            }
          },  
        },
      },
    },
    entry: {
      //* change this to set where bear starts
      start: {
        map: 'one',
        pos: 464,
        dir: 'up',
      },
      portal1: {
        map: 'test',
        pos: 81,
        dir: 'right',
      },
    },
  },
  test: {
    column: 20,
    row: 10,
    events: {
      80: { event: 'transport', gateway: 'portal2' },
      100: { event: 'transport', gateway: 'portal2' },
    },
    map: 'ac1,c2,ac1,c7,ac2,c9,ac1,c4,ac1,c2,ac1,c6,ac2,c3,w12,c1,ac1,c6,w3,v1,w6,v1,w1,ac1,c5,w18,c2,w2,v1,w6,v1,w8,c2,ac1,c1,w3,v1,w9,v1,w2,c1,ac1,c2,w16,ac2,c1,ac2,c2,ac2,c3,ac1,c13,ac1,c6,ac2,c3,ac2,c2',
    walls: '$42,12,$8,12,$6,18,$2,18,$4,16,$4,16,$42',
    entry: {
      portal2: {
        map: 'one',
        pos: 44,
        dir: 'down',
      },
    }
  },
}

export {
  mapData
}