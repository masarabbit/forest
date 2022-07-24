const avatars = {
  // frames are right to left
  // TODO possible refactor, change it left to right?
  avatar: {
    sprite: `
    <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 87.64 87.64">
      <ellipse cx="43.82" cy="43.82" rx="28.191" ry="38.099"/>
    </svg>`,
    animation: 'udlr',
    speed: 5000
  },
  bunny: {
    sprite: 'D 4 0h2v1hTvN"/D 10 0h2v1hTvN"/D 20 0h2v1hTvN"/D 26 0h2v1hTvN"/D 36 0h2v1hTvN"/D 42 0h2v1hTvN"/D 52 0h2v1hTvN"/D 58 0h2v1hTvN"/D 70 0h2v1hTvN"/D 73 0h2v1hTvN"/D 86 0h2v1hTvN"/D 89 0h2v1hTvN"/D 102 0h2v1hTvN"/D 105 0h2v1hTvN"/D 3 1h1v4hNv-4"/>F 4 1h2v2hNv1h1vNh1v1h2vNh1vTh2v4hTv2h2vTh1v8hNv2hTvNhNvNhTvNhNv2hTvNhNv-8h1v-4"/D 6 1h1v2hNvT"/D 9 1h1v2hNvT"/D 12 1h1v4hNv-4"/D 19 1h1v4hNv-4"/>F 20 1h2v2hNv1h1vNh1v1h2vNh1vTh2v4hTv2h2vTh1v8hNv1hTvNh1vNh1v-3hTv2h1v1hNv1h-3vNhNv2hTvNhNv-8h1v-4"/D 22 1h1v2hNvT"/D 25 1h1v2hNvT"/D 28 1h1v4hNv-4"/D 35 1h1v4hNv-4"/>F 36 1h2v2h1v1h2vNh1vTh2v4h1v9hNv1hTvNhNvNh1vThNvNhTv1hNv2h1v1h-3vNhNv-8h1v-4"/D 38 1h1v2hNvT"/D 41 1h1v2hNvT"/D 44 1h1v4hNv-4"/D 51 1h1v4hNv-4"/>F 52 1h2v2h1v1h2vNh1vTh2v4h1v8hNv1h-3vNh1vThNvNhTv1hNv2h1v1h-3vNhNv-8h1v-4"/D 54 1h1v2hNvT"/D 57 1h1v2hNvT"/D 60 1h1v4hNv-4"/D 69 1h1v3hNv-3"/>F 70 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1h-3vNhNvNhNvNh1vNhNv1hNv1h1v1h1v2hTvNhNv-4hNvNh1vNhNvTh1vNh1v-3"/D 72 1h1v3hNv-3"/D 75 1h1v3hNv-3"/D 85 1h1v3hNv-3"/>F 86 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1hNv1hTvNhNv1hTvNhNv-4hNvNh1vNhNvTh1vNh1v-3"/D 88 1h1v3hNv-3"/D 91 1h1v3hNv-3"/D 101 1h1v3hNv-3"/>F 102 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1hNv1hTvThNvNhNvNh1vNhNv1hNv1h1v1h1v1h-3v-4hNvNh1vNhNvTh1vNh1v-3"/D 104 1h1v3hNv-3"/D 107 1h1v3hNv-3"/>F 5 3h1v1hNvN"/D 7 3h2v1hTvN"/>F 21 3h1v1hNvN"/D 23 3h2v1hTvN"/D 39 3h2v1hTvN"/D 55 3h2v1hTvN"/D 68 4h1v1hNvN"/D 76 4h1v1hNvN"/D 84 4h1v1hNvN"/D 92 4h1v1hNvN"/D 100 4h1v1hNvN"/D 108 4h1v1hNvN"/D 2 5h1v3hNv-3"/D 5 5h1v2hNvT"/D 10 5h1v2hNvT"/>F 11 5h1v2hNvT"/D 13 5h1v3hNv-3"/D 18 5h1v3hNv-3"/D 21 5h1v2hNvT"/D 26 5h1v2hNvT"/>F 27 5h1v2hNvT"/D 29 5h1v3hNv-3"/D 34 5h1v3hNv-3"/D 45 5h1v3hNv-3"/D 50 5h1v3hNv-3"/D 61 5h1v3hNv-3"/D 67 5h1v2h1v1hTv-3"/D 70 5h1v2hNvT"/D 77 5h1v3hNv-3"/D 83 5h1v2h1v1hTv-3"/D 86 5h1v2hNvT"/D 93 5h1v3hNv-3"/D 99 5h1v2h1v1hTv-3"/D 102 5h1v2hNvT"/D 109 5h1v3hNv-3"/>F 4 6h1v1hNvN"/>F 20 6h1v1hNvN"/D 7 7h2v1hTvN"/D 23 7h2v1hTvN"/>F 6 8h1v1hNvN"/>F 22 8h1v1hNvN"/D 76 8h1v2hNvT"/D 92 8h1v2hNvT"/D 108 8h1v2hNvT"/D 2 9h1v4hNv-4"/D 4 9h1v1hNvN"/>F 5 9h1v1hNvN"/>F 10 9h1v1hNvN"/D 11 9h1v1hNvN"/D 13 9h1v5hNv-5"/D 18 9h1v4hNv-4"/D 20 9h1v1hNvN"/>F 21 9h1v1hNvN"/>F 26 9h1v1hNvN"/D 27 9h1v1hNvN"/D 29 9h1v4hNv-4"/D 34 9h1v4hNv-4"/D 45 9h1v5hNv-5"/D 50 9h1v4hNv-4"/D 61 9h1v4hNv-4"/D 68 9h1v4hNv-4"/D 71 9h1v1hNvN"/D 84 9h1v4hNv-4"/D 87 9h1v1hNvN"/D 100 9h1v4hNv-4"/D 103 9h1v1hNvN"/D 5 10h1v1hNvN"/D 10 10h1v1hNvN"/>F 11 10h1v1hNvN"/D 21 10h1v1hNvN"/D 26 10h1v1hNvN"/>F 27 10h1v1hNvN"/D 39 10h2v1hTvN"/D 55 10h2v1hTvN"/D 70 10h1v1hNvN"/D 77 10h1v2hNvT"/D 86 10h1v1hNvN"/D 93 10h1v2hNvT"/D 102 10h1v1hNvN"/D 109 10h1v2hNvT"/D 4 11h1v1hNvN"/D 11 11h1v1hNvN"/D 20 11h1v1hNvN"/D 27 11h1v1hNvN"/D 38 11h1v2hNvT"/>F 39 11h2v2hTvT"/D 41 11h1v2hNvT"/D 54 11h1v2hNvT"/>F 55 11h2v2hTvT"/D 57 11h1v2hNvT"/D 71 11h1v1hNvN"/D 87 11h1v1hNvN"/D 103 11h1v1hNvN"/>F 6 12h1v1hNvN"/>F 10 12h1v1hNvN"/>F 22 12h1v1hNvN"/>F 26 12h1v1hNvN"/D 72 12h1v1h3v1h-4vT"/D 76 12h1v1hNvN"/D 92 12h1v1hNvN"/D 104 12h1v2h-4vNh3vN"/D 108 12h1v1hNvN"/D 3 13h1v1hNvN"/D 6 13h3v1h-3vN"/>F 12 13h1v1hNvN"/D 19 13h1v1hNvN"/D 22 13h4v1h-4vN"/D 28 13h1v1hNvN"/D 35 13h1v1hNvN"/D 39 13h2v1hTvN"/D 51 13h1v1hNvN"/D 55 13h2v1hTvN"/D 60 13h1v1hNvN"/D 69 13h1v1hNvN"/D 85 13h1v1hNvN"/D 88 13h1v1hNvN"/D 91 13h1v1hNvN"/D 107 13h1v1hNvN"/D 4 14h2v1hTvN"/D 9 14h1v1hNvN"/D 12 14h1v1hNvN"/D 20 14h2v1hTvN"/D 26 14h2v1hTvN"/D 36 14h2v1hTvN"/D 41 14h1v1hNvN"/D 44 14h1v1hNvN"/D 52 14h2v1hTvN"/D 58 14h2v1hTvN"/D 70 14h2v1hTvN"/D 86 14h2v1hTvN"/D 89 14h2v1hTvN"/D 105 14h2v1hTvN"/D 10 15h2v1hTvN"/D 42 15h2v1hTvN"/>',
    speed: 2000,
    face: {
      happy: {
        sprite: `D 8 5h4v1h-4vN"/ D 20 5h4v1h-4vN"/ D 40 5h4v1h-4vN"/ D 52 5h4v1h-4vN"/ D 7 6h1v2hNvT"/ F 8 6h4v2h1v5h1v1h1v1h2vNh1vNh1v-5h1vTh4v2h1v9h1v1h1v2h1v5hNv2hNv3h1v2hT2vTh1v-3hNvThNv-5h1vTh1vNh1v-9h1vT"/ D 12 6h1v2hNvT"/ D 19 6h1v2hNvT"/ D 24 6h1v2hNvT"/ D 39 6h1v2hNvT"/ F 40 6h4v2h1v5h1v1h1v1h2vNh1vNh1v-5h1vTh4v2h1v9h1v1h1v2h1v5hNv2hNv3h1v2hT2vTh1v-3hNvThNv-5h1vTh1vNh1v-9h1vT"/ D 44 6h1v2hNvT"/ D 51 6h1v2hNvT"/ D 56 6h1v2hNvT"/ D 6 8h1v9hNv-9"/ D 13 8h1v5hNv-5"/ D 18 8h1v5hNv-5"/ D 25 8h1v9hNv-9"/ D 38 8h1v9hNv-9"/ D 45 8h1v5hNv-5"/ D 50 8h1v5hNv-5"/ D 57 8h1v9hNv-9"/ D 14 13h1v1hNvN"/ D 17 13h1v1hNvN"/ D 46 13h1v1hNvN"/ D 49 13h1v1hNvN"/ D 15 14h2v1hTvN"/ D 47 14h2v1hTvN"/ D 5 17h1v1hNvN"/ D 26 17h1v1hNvN"/ D 37 17h1v1hNvN"/ D 58 17h1v1hNvN"/ D 4 18h1v2hNvT"/ D 9 18h2v4hTv-4"/ D 21 18h2v4hTv-4"/ D 27 18h1v2hNvT"/ D 36 18h1v2hNvT"/ D 41 18h2v4hTv-4"/ D 53 18h2v4hTv-4"/ D 59 18h1v2hNvT"/ D 3 20h1v5hNv-5"/ D 28 20h1v5hNv-5"/ D 35 20h1v5hNv-5"/ D 60 20h1v5hNv-5"/ D 47 21h2v1hTvN"/ D 14 22h1v1hNvN"/ D 17 22h1v1hNvN"/ D 46 22h1v1hNvN"/ <path fill="#ffc2c2" d="M 47 22h2v1hTvN"/ D 49 22h1v1hNvN"/ D 15 23h2v1hTvN"/ D 47 23h2v1hTvN"/ D 4 25h1v2hNvT"/ D 27 25h1v2hNvT"/ D 36 25h1v2hNvT"/ D 59 25h1v2hNvT"/ D 5 27h1v3hNv-3"/ D 26 27h1v3hNv-3"/ D 37 27h1v3hNv-3"/ D 58 27h1v3hNv-3"/ D 4 30h1v2hNvT"/ D 27 30h1v2hNvT"/ D 36 30h1v2hNvT"/ D 59 30h1v2hNvT"/`,
        frameNo: 2
      },
      sad: {
        sprite: `D 8 5h4v1h-4vN"/ D 20 5h4v1h-4vN"/ D 40 5h4v1h-4vN"/ D 52 5h4v1h-4vN"/ D 72 5h4v1h-4vN"/ D 84 5h4v1h-4vN"/ D 7 6h1v2hNvT"/ F 8 6h4v2h1v5h1v1h1v1h2vNh1vNh1v-5h1vTh4v2h1v9h1v1h1v2h1v5hNv2hNv3h1v2hT2vTh1v-3hNvThNv-5h1vTh1vNh1v-9h1vT"/ D 12 6h1v2hNvT"/ D 19 6h1v2hNvT"/ D 24 6h1v2hNvT"/ D 39 6h1v2hNvT"/ F 40 6h4v2h1v5h1v1h1v1h2vNh1vNh1v-5h1vTh4v2h1v9h1v1h1v2h1v5hNv2hNv3h1v2hT2vTh1v-3hNvThNv-5h1vTh1vNh1v-9h1vT"/ D 44 6h1v2hNvT"/ D 51 6h1v2hNvT"/ D 56 6h1v2hNvT"/ D 71 6h1v2hNvT"/ F 72 6h4v2h1v5h1v1h1v1h2vNh1vNh1v-5h1vTh4v2h1v9h1v1h1v2h1v5hNv2hNv3h1v2hT2vTh1v-3hNvThNv-5h1vTh1vNh1v-9h1vT"/ D 76 6h1v2hNvT"/ D 83 6h1v2hNvT"/ D 88 6h1v2hNvT"/ D 6 8h1v9hNv-9"/ D 13 8h1v5hNv-5"/ D 18 8h1v5hNv-5"/ D 25 8h1v9hNv-9"/ D 38 8h1v9hNv-9"/ D 45 8h1v5hNv-5"/ D 50 8h1v5hNv-5"/ D 57 8h1v9hNv-9"/ D 70 8h1v9hNv-9"/ D 77 8h1v5hNv-5"/ D 82 8h1v5hNv-5"/ D 89 8h1v9hNv-9"/ D 14 13h1v1hNvN"/ D 17 13h1v1hNvN"/ D 46 13h1v1hNvN"/ D 49 13h1v1hNvN"/ D 78 13h1v1hNvN"/ D 81 13h1v1hNvN"/ D 15 14h2v1hTvN"/ D 47 14h2v1hTvN"/ D 79 14h2v1hTvN"/ D 5 17h1v1hNvN"/ D 26 17h1v1hNvN"/ D 37 17h1v1hNvN"/ D 58 17h1v1hNvN"/ D 69 17h1v1hNvN"/ D 90 17h1v1hNvN"/ D 4 18h1v2hNvT"/ D 27 18h1v2hNvT"/ D 36 18h1v2hNvT"/ D 59 18h1v2hNvT"/ D 68 18h1v2hNvT"/ D 74 18h2v2hTv1hTvTh2vN"/ D 84 18h2v1h2v2hTvNhTvT"/ D 91 18h1v2hNvT"/ D 8 19h4v2h-4vT"/ D 20 19h4v2h-4vT"/ D 40 19h4v2h-4vT"/ D 52 19h4v2h-4vT"/ D 3 20h1v5hNv-5"/ D 28 20h1v5hNv-5"/ D 35 20h1v5hNv-5"/ D 60 20h1v5hNv-5"/ D 67 20h1v5hNv-5"/ D 92 20h1v5hNv-5"/ D 15 21h2v1hTvN"/ D 47 21h2v1hTvN"/ D 79 21h2v1hTvN"/ D 14 22h1v1hNvN"/ D 17 22h1v1hNvN"/ D 46 22h1v1hNvN"/ <path fill="#ffc2c2" d="M 47 22h2v1hTvN"/ D 49 22h1v1hNvN"/ D 78 22h1v1hNvN"/ D 81 22h1v1hNvN"/ D 47 23h2v1hTvN"/ D 4 25h1v2hNvT"/ D 27 25h1v2hNvT"/ D 36 25h1v2hNvT"/ D 59 25h1v2hNvT"/ D 68 25h1v2hNvT"/ D 91 25h1v2hNvT"/ D 5 27h1v3hNv-3"/ D 26 27h1v3hNv-3"/ D 37 27h1v3hNv-3"/ D 58 27h1v3hNv-3"/ D 69 27h1v3hNv-3"/ D 90 27h1v3hNv-3"/ D 4 30h1v2hNvT"/ D 27 30h1v2hNvT"/ D 36 30h1v2hNvT"/ D 59 30h1v2hNvT"/ D 68 30h1v2hNvT"/ D 91 30h1v2hNvT"/`,
        frameNo: 3
      }
    }
  }     
}

export default avatars