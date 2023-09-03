// TODO nowall list probably has excess code so need to tidy.

import { testAct } from '../state.js'

const mapData = {
  one: {
    iWidth: 30,
    iHeight: 20,
    characters: [
      { pos: 152, avatar: 'bunny', defaultDir: 'down', event: 'apple', name: 'bunnio', motion: 'randomWalk' },
      // { pos: 156, avatar: 'bunny', spritePos: 0, event: 'apple', name: 'usabon', motion: 'randomWalk' },
      { pos: 313, avatar: 'bunny', defaultDir: 'right', event: 'tomato', name: 'tololo', motion: [0] },
    ],
    events: {
      14: { event: 'transport', gateway: 'portal1' },
      15: { event: 'transport', gateway: 'portal1' },
      464: { event: 'event-animation', act: 'greeting' },
    },
    map: 'zz14,w2,zz5,f1,i1,f3,i1,f1,zz3,s1,s.h1,w8,s1,s.h1,w8,f7,w1,zz2,t1,t.h1,w8,t1,t.h1,w5,s1,s.h1,w1,g.c1,f2,h1,f2,g.b1,w1,zz2,w5,a1,a.a1,w10,t1,t.h1,w4,z1,w4,zz2,1,v1,w2,a1,b.c1,b.b1,a.a1,w1,1,w6,v1,w4,v1,w1,y1,s1,s.h1,w2,zz2,w4,c.c1,e.c1,e.b1,c.c1,w15,y1,t1,t.h1,w2,zz2,w4,b.c1,c.c2,b.b1,s1,s.h1,w3,x1,y9,x.b1,w2,v1,w1,zz2,w4,f.c4,t1,t.h1,w3,y1,w14,zz2,s1,s.h1,w2,k.h1,f.c2,k1,w5,y1,w14,zz2,t1,t.h1,v1,w1,g.c1,h1,f.c1,g.b1,w5,y1,w14,zz2,w13,y1,w14,zz2,aa13,ad1,aa14,zz2,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ad1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,zz2,c8,ac2,c3,ad1,c2,ac2,c1,ac2,c7,zz2,c11,ac1,c1,ad1,c6,ac2,c6,zz2,c2,ac2,c6,ac2,c1,ad1,c10,ac2,c2,zz2,c1,ac2,c4,ac2,c3,ac1,ae1,c4,ac2,c3,ac2,c3,zz2,c6,ac2,c5,ac1,c1,ac1,c2,ac1,c7,ac1,c1,zz2,c12,ac1,c8,ac1,c6,zz31',
    // map: 'c,c,c,c',
    eventContents: {
      hello: { first: { text: ['hello!'], }, },
      tomato: {
        first: { 
          text: ['hello!', 'test'], 
          face: ['happy', 'sad'], 
        },
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
          event: {
            act: testAct,
          },
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
          event: {
            act: testAct,
          },
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
        cell: 464,
        direction: 'up',
        noWall: ['i','j','u','zd','br','as', 'ao', 'bh','av','ax','bg'],
      },
      portal1: {
        map: 'test',
        cell: 81,
        direction: 'right',
        noWall: ['bq', 'ao'],
      },
    },
  },
  // test: {
  //   iWidth: 20,
  //   iHeight: 10,
  //   events: {
  //     80: { event: 'transport', gateway: 'portal2' },
  //     100: { event: 'transport', gateway: 'portal2' },
  //   },
  //   map: 'ap42,bq12,ap8,bq2,ao1,bq6,ao1,bq2,ap6,bq7,ao1,bq10,ap2,bq2,ao1,bq3,ao1,bq3,ao1,bq5,ao1,bq1,ap4,bq10,ao1,bq2,ao1,bq2,ap4,bq3,ao1,bq12,ap42',
  //   entry: {
  //     portal2: {
  //       map: 'one',
  //       cell: 44,
  //       direction: 'down',
  //       noWall: ['i','j','u','zd','br','as', 'ao', 'bh','av','ax','bg'],
  //     },
  //   }
  // },
}

export default mapData