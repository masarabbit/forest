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
    sprite: 'bunny',
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