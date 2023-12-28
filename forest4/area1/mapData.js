
const mapData = {
  one: {
    column: 30,
    row: 20,
    map: 'zz14,w2,zz5,f1,i1,f3,i1,f1,zz3,aw4,w6,s1,s.h1,w8,f7,w1,zz2,aw1,ao2,aw1,w6,t1,t.h1,w5,s1,s.h1,w1,g.c1,f2,h1,f2,g.b1,w1,zz2,ap.a1,ax1,aq1,ao1,w2,v1,w1,v1,w8,t1,t.h1,w4,z1,w4,zz2,aa2,ap.b1,aq1,w3,v1,w8,v1,w4,v1,w1,y1,s1,s.h1,w2,zz2,ap.b1,ax.a1,ao1,ax.c1,aa1,az.a1,w17,y1,t1,t.h1,w2,zz2,ao1,aq1,ax.c1,aa3,w2,s1,s.h1,w3,x1,y9,x.b1,w2,v1,w1,zz2,ax.c1,aa4,ap.b1,w2,t1,t.h1,w3,y1,w3,az1,az.a1,w9,zz2,aa1,ap.b1,ax.a1,ao1,aw2,w7,y1,w3,ap.c1,ap.b1,w9,zz2,aw2,aq2,ao1,aw1,w7,y1,w3,ba1,ba.c1,w9,zz2,aw2,aq3,ao1,w7,z.b1,w7,bc1,bb6,zz2,ao1,aw1,aq4,bb7,ad1,bb7,aa7,zz2,aq1,ao1,ap.c1,aa1,ap.b1,aq1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ad1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,zz2,aq2,ao1,aw2,aq1,c2,ac2,c3,ad1,c2,ac2,c1,ac2,c7,zz2,aq3,ao2,bg.bvh1,bf.b5,bg.bv1,c1,ad1,c3,bd1,be1,bd.bv1,ac2,bg.ch1,be2,bg.a1,c2,zz2,ac2,an1,aq1,an.h1,be.a1,f1,bd1,be1,bd.h1,f1,be.a1,c1,ad1,c3,be.a1,f1,be.a1,c2,be.a1,f2,be.a1,c2,zz2,c1,ac3,c1,bg.bh1,bf1,be.a1,f1,be.a1,bf1,bg.b1,ah1,ai1,aj1,c2,bg.v1,bf1,bg.b1,c2,be.a1,f2,be.a1,c2,zz2,c6,ac1,bg.v1,bf1,bg.b1,c5,ac1,c2,ac1,c3,bg.bh1,bf2,bg.b1,ac1,c1,zz2,c12,ac1,c8,ac1,c6,zz31',
    walls: '$14,2,$19,6,$2,8,$7,1,$6,6,$2,5,$2,1,$3,1,$3,1,$6,13,$2,9,$6,20,$2,2,$8,18,$2,2,$8,2,$2,18,$8,2,$2,7,$2,9,$8,11,$2,9,$8,11,$2,9,$8,22,$8,22,$8,22,$15,1,$29,1,$29,1,$135',
    npcs: [
      // { pos: 313, avatar: 'bunny', defaultDir: 'down', event: 'apple', name: 'bunnio', motion: 'randomWalk' },
      // { pos: 313, avatar: 'bunny', defaultDir: 'down', event: 'apple', name: 'bunnio', motion: 'facing-l' },
      { pos: 152, avatar: 'bunny', defaultDir: 'down', event: 'apple', name: 'bunnio', motion: ['u', 'r', 'd', 'l'] },
      { pos: 313, avatar: 'bunny', defaultDir: 'right', event: 'tomato', name: 'tololo', motion: [0] },
    ],
    events: {
      14: { event: 'transport', url: '#area2' },
      15: { event: 'transport', url: '#area2' },
      // 464: { event: 'event-animation', act: 'greeting' },
      249: { event: 'check', key: 'art1' },
    },
    mapAssets: [
      {
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAA8CAYAAAAgwDn8AAAAAXNSR0IArs4c6QAAAS1JREFUaEPtmOESgjAMg+H9H1pPlDv1gKZL2NZe/ctWm3xxK66L/vMwSq7Kr5QW+zQWVoDV+L/xEvMkRUDnpxXgdV4qREEgrAC2cQkJhkBYAerGKRItBMIKuLvxJhIeAmEF9G7cRQIhEFbA6MYhElcEwgqYrfFLEkcESoDyjeug1o/pKQmcGdg7WsgRv0CLGt+42CRBvSGLejsPnf/7otQCRjsPkaibmP2lNuzPew/MlnkLzkbiG0cJsCwTP89HwDKod8SQS7ZmIYua4vklCQRT7+hAIwQyzI1uHBJSs5Ai5M4aNQs5DbtteZ6beLbTxoXshaEEuCwTL05BYPckWpTynEJsKllyyEB52iO1WfSfKdUDtbkEvB2gTKQ2F4EiQOavIlQRqghtGRg6SjwBzME8OQGJzeQAAAAASUVORK5CYII=',
        w: 48,
        h: 60,
        pos: 50,
      }
    ],
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
  room: {
    column: 12,
    row: 10,
    events: {
      80: { event: 'transport', gateway: 'portal2' },
      100: { event: 'transport', gateway: 'portal2' },
    },
    map: 'l13,al1,am8,al.a1,l2,am.c1,n8,am.a1,l2,am.c1,n8,am.a1,l2,am.c1,n8,am.a1,l2,am.c1,f8,am.a1,l2,am.c1,f8,am.a1,l2,am.c1,f8,am.a1,l2,al.c1,am.b3,m1,am.b4,al.b1,l14,am.c1,f10,am.a1,l4,w1,c1,ac1,l1,am.c1,f10,am.a1,l4,w1,ac2,l1,al.c1,am.b4,m1,am.b5,al.b1,l4,c3,l18,c2',
    walls: '',
    entry: {
      portal2: {
        map: 'one',
        pos: 44,
        dir: 'down',
      },
    }
  },
  two: {
    column: 30,
    row: 20,
    map: 'zz14,w2,zz5,f1,i1,f3,i1,f1,zz3,ao4,w6,s1,s.h1,w8,f7,w1,zz2,ao4,w6,t1,t.h1,w5,s1,s.h1,w1,g.c1,f2,h1,f2,g.b1,w1,zz2,ao4,w13,t1,t.h1,w4,z1,w4,zz2,v1,w1,ap.b1,ao1,v1,ap.a1,y1,x.a1,w8,v1,w4,v1,w1,y1,s1,s.h1,w2,zz2,ao3,an.b1,w2,y1,x.b1,w15,y1,t1,t.h1,w2,zz2,ao2,an.b1,w1,v1,w1,y1,w1,s1,s.h1,w3,x1,y9,x.b1,w2,v1,w1,zz2,v1,w4,ap.b1,y1,w1,t1,t.h1,w3,y1,w14,zz2,w1,ap.b1,ao4,y1,w6,y1,w14,zz2,ao6,x.b1,w6,y1,w14,zz2,ao6,w7,z.b1,w14,zz2,ao6,aa7,ad1,aa14,zz2,ao2,ap.c1,w1,ap.b1,ao1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ad1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,zz2,ao6,c2,ac2,c3,ad1,c2,ac2,c1,ac2,c7,zz2,ao5,an.b1,c5,ac1,c1,ad1,c6,ac2,c6,zz2,c2,an.c1,ao1,an.b1,c5,ac2,c1,ad1,c10,ac2,c2,zz2,c1,ac2,c4,ac2,c3,ah1,ai1,aj1,c3,ac2,c3,ac2,c3,zz2,c6,ac2,c7,ac1,c2,ac1,c7,ac1,c1,zz2,c12,ac1,c8,ac1,c6,zz31',
    walls: '$14,2,$17,8,$2,8,$7,1,$4,8,$2,5,$2,1,$3,1,$3,1,$2,5,$2,10,$2,9,$2,4,$4,16,$2,2,$2,4,$4,16,$2,2,$2,4,$6,18,$2,4,$6,18,$4,2,$4,20,$4,2,$1,1,$2,20,$2,28,$2,28,$2,28,$15,1,$29,1,$29,1,$135',
    // entry: {
    //   portal2: {
    //     map: 'one',
    //     pos: 44,
    //     dir: 'down',
    //   },
    // }
  },

}

export default mapData