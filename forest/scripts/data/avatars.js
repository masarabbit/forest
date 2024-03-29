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
        sprite: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAAXNSR0IArs4c6QAAAWBJREFUaEPtWMENwjAMbNcEiRdIDECngAGQ4IUEa4KCZCkNduwLSfuIeVXkmqvPZ8ftOHT+GzuPf3AB3AGdK6CWwGm/eccaXe6v7D0oXtMf3Q/Fq8Gcb8/ZM06H7SCJEMgRvCV4ZL8SfhdAygKnJmE5F6D4kuy34BcdgAaE4l0ARQFUUBRP9O4A7wGCAjlLhVviRohgtdqndWRPBJvyF5VA3I3DdXpWpyS52aHEgTX5/xLAms1WAtTgdwE4FbWasiof4xAXLMn/4wBpnrbUulabFhGW5ncBYptK1guZq+GA9PhMS2kN/pkD1niAtRNgEoBresEVdP7H11qDRL8nSPuRK2ldm0WkN8liAcjOSGmUloCYgN3xuzQ9ruow1kQALdvSgyNflHIcaG/iEmA6BUoCRYMnfIsZQMp++N8F8EmQUaCFDS1TYMsykPjZl6GuBWgRfK4JWafBGo2Yc0H3TfADlYM3PxYEv/kAAAAASUVORK5CYII=`,
        frameNo: 2
      },
      sad: {
        sprite: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAAXNSR0IArs4c6QAAAWRJREFUaEPtmFEKwjAMhrdrKvik4AHcKfQAgj4Jek2lg0JXmyZ/bAbS7GmwrH/75U/Wbhw6v8bO1z84AHdA5wTYEjjtN++U0eX+qr6DxnP80fHQeHYx59tzMcfpsB0oCEEciZcsHhlPo+8AqCyUaMbYkgvQeE32LfRJB6ALQuMdAEMABYrGR3l3gPcAgkDNUuGVtBEisVztx+fImEhsrq8qgbQbh/v8W52L1PYOGge21P8JgDSbVgBa6DuAEkWupqTk0zjEBWvqfznAQry2g8thrq3PAgiZSy9Jw6PiJS7IAVjrLwBQp6lWAPLPpyT7LQGU9FkAtXqPk+NcIe0FqP1b6KsBBPG48PSea5Do/wRqvFlzd5wfT48ruxeh+pAaALfQ2sSRHyrWDvxrAJok5A5kvwIaEU324ztoH0DmVyo/B+A7wQIBCxtKNkGWZUDpFw9DXQOwWPxfnwWQLsvFSspg7QR8AJ36Hz/x7QDQAAAAAElFTkSuQmCC`,
        frameNo: 2
      }
    }
  }     
}

export default avatars