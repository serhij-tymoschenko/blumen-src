export const backgroundSrc = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 64 64" fill="none">
    <path d="M29 1.73205C30.8564 0.660254 33.1436 0.660254 35 1.73205L56.7128 14.2679C58.5692 15.3397 59.7128 17.3205 59.7128 19.4641V44.5359C59.7128 46.6795 58.5692 48.6603 56.7128 49.7321L35 62.2679C33.1436 63.3397 30.8564 63.3397 29 62.2679L7.28719 49.7321C5.43078 48.6603 4.28719 46.6795 4.28719 44.5359V19.4641C4.28719 17.3205 5.43078 15.3397 7.28719 14.2679L29 1.73205Z"
          fill="url(#paint0_diamond_26026_173944)"></path>
    <path d="M29 1.73205C30.8564 0.660254 33.1436 0.660254 35 1.73205L56.7128 14.2679C58.5692 15.3397 59.7128 17.3205 59.7128 19.4641V44.5359C59.7128 46.6795 58.5692 48.6603 56.7128 49.7321L35 62.2679C33.1436 63.3397 30.8564 63.3397 29 62.2679L7.28719 49.7321C5.43078 48.6603 4.28719 46.6795 4.28719 44.5359V19.4641C4.28719 17.3205 5.43078 15.3397 7.28719 14.2679L29 1.73205Z"
          fill="url(#paint1_linear_26026_173944)"></path>
    <defs>
        <radialGradient id="paint0_diamond_26026_173944" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(-6.59974 23.1999) rotate(15.9097) scale(44.5051 21406.7)">
            <stop stop-color="#1185B5"></stop>
            <stop offset="0.29452" stop-color="#D7F7FF"></stop>
            <stop offset="0.526042" stop-color="#5EF6D8"></stop>
            <stop offset="0.838434" stop-color="#5EF6D8"></stop>
            <stop offset="0.867246" stop-color="#1990B9"></stop>
            <stop offset="1" stop-color="#3F9FC6"></stop>
        </radialGradient>
        <linearGradient id="paint1_linear_26026_173944" x1="23.5687" y1="22.7061" x2="44.1183" y2="53.4817"
                        gradientUnits="userSpaceOnUse">
            <stop stop-color="#004E5F"></stop>
            <stop offset="1" stop-color="#727CD8" stop-opacity="0.81"></stop>
        </linearGradient>
    </defs>
</svg>`

export const hexSrc = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 72 72" fill="none">
    <path d="M34 3.4641C35.2376 2.74957 36.7624 2.74957 38 3.4641L63.1769 18C64.4145 18.7145 65.1769 20.035 65.1769 21.4641V50.5359C65.1769 51.965 64.4145 53.2855 63.1769 54L38 68.5359C36.7624 69.2504 35.2376 69.2504 34 68.5359L8.82309 54C7.58548 53.2855 6.82309 51.965 6.82309 50.5359V21.4641C6.82309 20.035 7.58548 18.7145 8.82309 18L34 3.4641Z"
          stroke="url(#paint0_diamond_26526_186798)" stroke-width="4" stroke-linejoin="round"></path>
    <defs>
        <radialGradient id="paint0_diamond_26526_186798" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(-7.4247 26.0998) rotate(15.9097) scale(50.0682 24082.5)">
            <stop stop-color="#1185B5"></stop>
            <stop offset="0.29452" stop-color="#D7F7FF"></stop>
            <stop offset="0.526042" stop-color="#5EF6D8"></stop>
            <stop offset="0.838434" stop-color="#5EF6D8"></stop>
            <stop offset="0.867246" stop-color="#1990B9"></stop>
            <stop offset="1" stop-color="#3F9FC6"></stop>
        </radialGradient>
    </defs>
</svg>`

export const getSvgSrc = (base64Png) => {
    return `<svg width="100%" height="107%" viewBox="0 0 120 124.5" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <clipPath id="clip-shape">
                <path d="M120 0H0V96H22.0602C22.5169 98.2109 23.896 100.155 25.8949 101.309L56
                    118.691C58.4752 120.12 61.5248 120.12 64 118.691L94.1051 101.309C96.104 100.155 97.4831
                    98.2109 97.9398 96H120V0Z" />
            </clipPath>
        </defs>
        <image href="${base64Png}" clip-path="url(#clip-shape)" height="100%" width="100%" preserveAspectRatio="xMidYMid slice" />
    </svg>`;
}