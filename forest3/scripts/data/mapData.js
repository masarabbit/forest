// TODO nowall list probably has excess code so need to tidy.

import { testAct } from '../state.js'

const mapData = {
  one: {
    iWidth: 30,
    iHeight: 20,
    characters: [
      { pos: 152, avatar: 'bunny', spritePos: 0, event: 'apple', name: 'bunnio', motion: 'randomWalk' },
      // { pos: 156, avatar: 'bunny', spritePos: 0, event: 'apple', name: 'usabon', motion: 'randomWalk' },
      { pos: 309, avatar: 'bunny', spritePos: 0, event: 'tomato', name: 'tololo', motion: 'randomWalk' },
    ],
    events: {
      14: { event: 'transport', gateway: 'portal1' },
      15: { event: 'transport', gateway: 'portal1' },
    },
    map: 'zz14,br2,zz5,za1,v1,za3,v1,za1,zz3,a1,b1,br8,a1,b1,br8,za7,br1,zz2,c1,d1,br8,c1,d1,br5,a1,b1,br1,z1,za2,u1,za2,aa1,br1,zz2,br5,g1,h1,br10,c1,d1,br4,bh1,br4,zz2,br4,g1,r1,s1,h1,br8,ao1,br4,ao1,br1,bh1,a1,b1,br2,zz2,br1,ao1,br2,zb1,o1,p1,zb1,br15,bh1,c1,d1,br2,zz2,br4,r1,zb2,s1,a1,b1,br3,av1,ax9,bg1,br2,ao1,br1,zz2,br4,za4,c1,d1,br3,bh1,br14,zz2,a1,b1,br2,x1,za2,y1,br5,bh1,br6,e1,br3,e1,br3,zz2,c1,d1,ao1,br1,z1,u1,za1,aa1,br5,bh1,br14,zz2,br13,bh1,br14,zz2,zd13,as1,zd14,zz2,i1,j1,i1,j1,i1,j1,i1,j1,i1,j1,i1,j1,i1,as1,j1,i1,j1,i1,j1,i1,j1,i1,j1,i1,j1,i1,j1,i1,zz2,zb8,ap2,zb3,as1,zb2,ap2,zb1,ap2,zb7,zz2,zb11,ap1,zb1,as1,zb6,ap2,zb6,zz2,zb2,ap2,zb6,ap2,zb1,as1,zb10,ap2,zb2,zz2,zb1,ap2,zb4,ap2,zb3,ap1,at1,zb4,ap2,zb3,ap2,zb3,zz2,zb6,ap2,zb5,ap1,zb1,ap1,zb2,ap1,zb7,ap1,zb1,zz2,zb12,ap1,zb8,ap1,zb6,zz31',
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
      }
    },
    entry: {
      //* change this to set where bear starts
      start: {
        map: 'one',
        cell: 464,
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
  test: {
    iWidth: 20,
    iHeight: 10,
    events: {
      80: { event: 'transport', gateway: 'portal2' },
      100: { event: 'transport', gateway: 'portal2' },
    },
    map: 'ap42,bq12,ap8,bq2,ao1,bq6,ao1,bq2,ap6,bq7,ao1,bq10,ap2,bq2,ao1,bq3,ao1,bq3,ao1,bq5,ao1,bq1,ap4,bq10,ao1,bq2,ao1,bq2,ap4,bq3,ao1,bq12,ap42',
    entry: {
      portal2: {
        map: 'one',
        cell: 44,
        direction: 'down',
        noWall: ['i','j','u','zd','br','as', 'ao', 'bh','av','ax','bg'],
      },
    }
  },
}

export default mapData