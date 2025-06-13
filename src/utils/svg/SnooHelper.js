import {combineTogether} from "./CombineHelper";
import {replaceColors, toPngSrc} from "./SvgHelper";

export const getHexSrc = (base64Png) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 120 120" fill="none">
  <g transform="translate(10, 20)">
    <image x="-3" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIHZpZXdCb3g9JzAgMCA2NCA2NCcgZmlsbD0nbm9uZSc+CiAgPHBhdGggZD0nTTI5IDEuNzMyMDVDMzAuODU2NCAwLjY2MDI1NCAzMy4xNDM2IDAuNjYwMjU0IDM1IDEuNzMyMDVMNTYuNzEyOCAxNC4yNjc5QzU4LjU2OTIgMTUuMzM5NyA1OS43MTI4IDE3LjMyMDUgNTkuNzEyOCAxOS40NjQxVjQ0LjUzNTlDNTkuNzEyOCA0Ni42Nzk1IDU4LjU2OTIgNDguNjYwMyA1Ni43MTI4IDQ5LjczMjFMMzUgNjIuMjY3OUMzMy4xNDM2IDYzLjMzOTcgMzAuODU2NCA2My4zMzk3IDI5IDYyLjI2NzlMNy4yODcxOSA0OS43MzIxQzUuNDMwNzggNDguNjYwMyA0LjI4NzE5IDQ2LjY3OTUgNC4yODcxOSA0NC41MzU5VjE5LjQ2NDFDNC4yODcxOSAxNy4zMjA1IDUuNDMwNzggMTUuMzM5NyA3LjI4NzE5IDE0LjI2NzlMMjkgMS43MzIwNVonIGZpbGw9J3VybCgjcGFpbnQwX2RpYW1vbmRfMjYwMjZfMTczOTQ0KScvPgogIDxwYXRoIGQ9J00yOSAxLjczMjA1QzMwLjg1NjQgMC42NjAyNTQgMzMuMTQzNiAwLjY2MDI1NCAzNSAxLjczMjA1TDU2LjcxMjggMTQuMjY3OUM1OC41NjkyIDE1LjMzOTcgNTkuNzEyOCAxNy4zMjA1IDU5LjcxMjggMTkuNDY0MVY0NC41MzU5QzU5LjcxMjggNDYuNjc5NSA1OC41NjkyIDQ4LjY2MDMgNTYuNzEyOCA0OS43MzIxTDM1IDYyLjI2NzlDMzMuMTQzNiA2My4zMzk3IDMwLjg1NjQgNjMuMzM5NyAyOSA2Mi4yNjc5TDcuMjg3MTkgNDkuNzMyMUM1LjQzMDc4IDQ4LjY2MDMgNC4yODcxOSA0Ni42Nzk1IDQuMjg3MTkgNDQuNTM1OVYxOS40NjQxQzQuMjg3MTkgMTcuMzIwNSA1LjQzMDc4IDE1LjMzOTcgNy4yODcxOSAxNC4yNjc5TDI5IDEuNzMyMDVaJyBmaWxsPSd1cmwoI3BhaW50MV9saW5lYXJfMjYwMjZfMTczOTQ0KScvPgogIDxkZWZzPgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSdwYWludDBfZGlhbW9uZF8yNjAyNl8xNzM5NDQnIGN4PScwJyBjeT0nMCcgcj0nMScgZ3JhZGllbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIGdyYWRpZW50VHJhbnNmb3JtPSd0cmFuc2xhdGUoLTYuNTk5NzQgMjMuMTk5OSkgcm90YXRlKDE1LjkwOTcpIHNjYWxlKDQ0LjUwNTEgMjE0MDYuNyknPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPScjMTE4NUI1Jy8+CiAgICAgIDxzdG9wIG9mZnNldD0nMC4yOTQ1Micgc3RvcC1jb2xvcj0nI0Q3RjdGRicvPgogICAgICA8c3RvcCBvZmZzZXQ9JzAuNTI2MDQyJyBzdG9wLWNvbG9yPScjNUVGNkQ4Jy8+CiAgICAgIDxzdG9wIG9mZnNldD0nMC44Mzg0MzQnIHN0b3AtY29sb3I9JyM1RUY2RDgnLz4KICAgICAgPHN0b3Agb2Zmc2V0PScwLjg2NzI0Nicgc3RvcC1jb2xvcj0nIzE5OTBCOScvPgogICAgICA8c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyMzRjlGQzYnLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9J3BhaW50MV9saW5lYXJfMjYwMjZfMTczOTQ0JyB4MT0nMjMuNTY4NycgeTE9JzIyLjcwNjEnIHgyPSc0NC4xMTgzJyB5Mj0nNTMuNDgxNycgZ3JhZGllbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPScjMDA0RTVGJy8+CiAgICAgIDxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nIzcyN0NEOCcgc3RvcC1vcGFjaXR5PScwLjgxJy8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KPC9zdmc+"/>
    <image x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJhZGlhbEdyYWRpZW50IGlkPSJhIiBjeD0iMCIgY3k9IjAiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMjAuMDYyNjggNi4wOTk5IC0zMDk3LjU1ODE1IDEwMTg3LjkxMjI1IC0zLjEgMTEuNikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiByPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxMTg1YjUiLz48c3RvcCBvZmZzZXQ9Ii4yOSIgc3RvcC1jb2xvcj0iI2Q3ZjdmZiIvPjxzdG9wIG9mZnNldD0iLjUzIiBzdG9wLWNvbG9yPSIjNWVmNmQ4Ii8+PHN0b3Agb2Zmc2V0PSIuODQiIHN0b3AtY29sb3I9IiM1ZWY2ZDgiLz48c3RvcCBvZmZzZXQ9Ii44NyIgc3RvcC1jb2xvcj0iIzE5OTBiOSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzNmOWZjNiIvPjwvcmFkaWFsR3JhZGllbnQ+PHBhdGggZD0iTTEzLjc3IDEuMWMuNzYtLjQxIDEuNy0uNDEgMi40NiAwTDI4IDcuNThjLjc1LjQyIDEuMiAxLjE3IDEuMiAxLjk2djEyLjk0YzAgLjc5LS40NSAxLjU0LTEuMiAxLjk1TDE2LjIzIDMwLjljLS43Ni40Mi0xLjcuNDItMi40NiAwTDIgMjQuNDJhMi4yNSAyLjI1IDAgMCAxLTEuMi0xLjk1VjkuNTNDLjggOC43NCAxLjI0IDggMiA3LjU3eiIgc3Ryb2tlPSJ1cmwoI2EpIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNTkiLz48L3N2Zz4="/>
  </g>
  
  <g clip-path="url(#clip-shape-img)" transform="scale(1.2)">
  <image href="${base64Png}" x="0" y="3" height="100" width="100" preserveAspectRatio="xMidYMid slice" />
</g>
  
  <defs>
    <clipPath id="clip-shape-img">
  <polygon points="0,0 100,2 100,50 100,70 47,96 6,75" />
</clipPath>
  </defs>
</svg>`
}

const snooSrc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 600">
    <path d="M244.5 500.5c3.5-8 4-9.5 6-19 1.614-7.664 1-16.5 1-16.5l-49.252 24.18-6.748 29.32c-.665 3.077-.748 11.5 2.5 17.5s12.782 16.357 25.5 17.5c26.932 2.42 25-20 12.5-35 1.156-2.285 5-10 8.5-18ZM246.5 448c7.75 15.5 17.479 21.542 23 19.5 19.5-7.212 13.279-40.03 7-56-5.847-14.87-17-33.5-27-44s-23.865-2.671-22.5 13.5c1.365 16.171 11.75 51.5 19.5 67Z"
          fill="rgba(246,248,249,0.8)" stroke="#A0B0B5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="10 10"></path>
    <path d="M187.619 531.491c9.505 11.509 6.381 35.643-8.214 35.643-31.405 1.366-37.067-27.458-35.398-50.824L146.5 494s-12.802-18.66-13.5-30.5c-.698-11.84 6.351-62.291 10.007-73.258 3.655-10.967 11.822-19.392 24.858-24.318 13.036-4.927 58.936-11.753 58.936-11.753C239 372 253.139 405.072 255.582 420.54c2.214 14.021-.995 42.515-6.582 55.086-7.773 17.489-18.5 24.874-32.5 32.374-6.081 3.258-23.79 7.31-26 7.31.897-2.267 5-17.81 5-17.81-4 12.049-7.881 26-7.881 33.991Z"
          fill="rgba(246,248,249,0.8)" stroke="#A0B0B5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="10 10"></path>
    <path d="M123.5 458.825c-2.111-13.676-1.155-29.944 2.532-48.145 2.676-13.212 12.156-27.975 18.812-34.599 26.587-26.458 28.603 7.202 22.282 25.913 0 0-3.33 22.805-4.626 34.006l-.002.013c-1.319 11.4-5.786 49.987-22.622 49.987-9.076 0-14.265-13.5-16.376-27.175Z"
          fill="rgba(246,248,249,0.8)" stroke="#A0B0B5" stroke-width="4" stroke-linecap="round"
          stroke-dasharray="10 10"></path>
    <path d="m178 376.5-22-1.967c-4.054 6.921-5.5 16.467-5.5 23.467s3.318 16.679 13.781 13.91c10.464-2.769 13.078-25.72 13.719-35.41Z"
          fill="rgba(246,248,249,0.8)"></path>
    <path d="M180.5 188c-40.511 2.868-70.5 19.878-84.0528 33.739-12.9472-2.239-18.9019 2.848-23.8355 5.184-7.9879 4.674-20.6818 19.506-19.5541 37.451 1.1277 17.945 8.777 22.83 15.1203 29.139 0 1.402 2.0828 8.262 2.7876 13.169 10.5722 39.955 41.3485 52.595 62.0225 59.605 16.681 6.309 60.553 16.606 104.533 1.465 50.979-17.55 59.976-43.507 64.205-64.536 1.409-7.009 0-22.716-2.879-31.654 0 0-.023-1.339 2.091-5.545 8.195-16.301 2.919-33.747.1-38.654-2.819-4.907-16.009-18.383-26.582-20.485-8.457-1.683-15.299-1.087-18.119-.387-9.632-6.075-35.326-21.359-75.837-18.491Z"
          fill="rgba(246,248,249,0.8)" stroke="#A0B0B5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
          stroke-dasharray="10 10"></path>
    <path d="M81.2566 127.925c8.1918.546 17.7434 8.575 24.5664 17.973 5.177 9.602 5.2 16.039 2.214 24.995-2.985 8.956-12.8804 19.711-25.5686 19.711-12.7514 0-24.3109-8.008-28.1076-17.711-2.2391-5.722-3.4779-20.292.9995-29.995 5.1661-11.195 14.7009-15.719 25.8963-14.973Z"
          fill="rgba(246,248,249,0.8)"></path>
    <path d="M178.5 187c.738-39.85-23.398-79-28.612-79-3.689 0-25.615 24.615-44.065 37.898m0 0C99 136.5 89.4484 128.471 81.2566 127.925c-11.1954-.746-20.7302 3.778-25.8963 14.973-4.4774 9.703-3.2386 24.273-.9995 29.995 3.7967 9.703 15.3562 17.711 28.1076 17.711 12.6882 0 22.5836-10.755 25.5686-19.711 2.986-8.956 2.963-15.393-2.214-24.995Z"
          stroke="#A0B0B5" stroke-width="4" stroke-linejoin="round" stroke-dasharray="10 10"></path>
</svg>`

const getTop = (item, index) => {
    return (index !== 9 && index !== 6) ? item : snooSrc
}

const getBottom = (item, index) => {
    return (index !== 9 && index !== 6) ? snooSrc : item
}

export const getSnooItems = (items, bodyColor, hairColor, eyesColor) => {
    let snooItems = replaceColors(items, bodyColor, hairColor, eyesColor)
    return snooItems.map((item, index) => {
        const top = getTop(item, index)
        const bottom = getBottom(item, index)
        const backgroundIndex = index === 9
        return combineTogether([bottom, top], 552, 736, backgroundIndex ? 0 : null)
    })
}

export const getShowcaseAndHex = async (items, bodyColor, hairColor, eyesColor) => {
    let localItems = [
        items[9],
        items[6],
        items[3],
        items[2],
        items[0],
        items[1],
        items[5],
        items[4],
        items[7],
        items[8],
    ]

    localItems = replaceColors(localItems, bodyColor, hairColor, eyesColor);
    const showcase = combineTogether(localItems, 552, 736, 0)
    const combinedTraits = combineTogether(localItems.slice(1), 552, 736)

    const hex = getHexSrc(await toPngSrc(combinedTraits))
    return [showcase, hex]
}
