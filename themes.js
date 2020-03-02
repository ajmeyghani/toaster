const baseStyles = `
.ajmtoaster,
.ajmtoaster__inner,
.ajmtoaster__title,
.ajmtoaster__message,
.ajmtoaster__dismiss {
  box-sizing: border-box;
}

.ajmtoaster {
  position: fixed;
  width: 325px;
  top: 10px;
  right: 10px;
  z-index: 999999;
}

.ajmtoaster.--animation-appear,
.ajmtoaster.--animation-appear.--active {
    transition: transform var(--ajmt-duration) var(--ajmt-easing) 0ms,
    opacity var(--ajmt-duration) var(--ajmt-easing) 50ms;
}

.ajmtoaster.--animation-appear {
  opacity: 0;
  transform: scale(1.1);
}

.ajmtoaster.--animation-appear.--active {
  opacity: 1;
  transform: scale(1);
}


.ajmtoaster.--animation-slide-down,
.ajmtoaster.--animation-slide-down.--active {
    transition: transform var(--ajmt-duration) var(--ajmt-easing) 0ms,
    opacity var(--ajmt-duration) var(--ajmt-easing) 50ms;
}

.ajmtoaster.--animation-slide-down {
  opacity: 0;
  transform: translateY(-20px);
}

.ajmtoaster.--animation-slide-down.--active {
  opacity: 1;
  transform: translateY(0);
}

.ajmtoaster__inner {
  min-height: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: 16px;
  font-family: "Roboto", sans-serif;
  font-weight: 100;

  padding: 15px 26px 15px 15px;
  border-radius: 3px;
}

.ajmtoaster__inner.--success {
  background: var(--ajmt-success);
}

.ajmtoaster__inner.--failure {
  background: var(--ajmt-failure);
}

.ajmtoaster__inner.--warning {
  background: var(--ajmt-warning);
}

.ajmtoaster__inner.--info {
  background: var(--ajmt-info);
}

.ajmtoaster__inner {
  color: var(--ajmt-white);
}

.ajmtoaster__title,
.ajmtoaster__message,
.ajmtoaster__dismiss {
  margin: 0;
  padding: 0;
}

.ajmtoaster__title {
  line-height: 1.1;
  font-weight: 400;
}

.ajmtoaster__message {
  line-height: 1.3;
}

.ajmtoaster__message {
  max-width: 100%;
  max-height: 100px;
  overflow: auto;
  margin-top: 0;

  font-size: 80%;
  word-break: break-word;
}

.ajmtoaster__message.with-message {
  margin-top: 10px;
  margin-right: 10px;
}

.ajmtoaster__dismiss {
  box-sizing: border-box;
  border: none;
  color: rgba(255, 255, 255, 0.81);
  line-height: 1;
  margin: 0;
  height: 100%;
  display: block;
  font-weight: 100;
  border-radius: 0;
  min-height: 0;
  padding: 0;
  font-family: sans-serif;
  padding: 0 8px;
  font-size: 16px;

  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.ajmtoaster__dismiss,
.ajmtoaster__dismiss:hover {
  transition: background-color 200ms ease-in-out;
}

.ajmtoaster__dismiss {
  background-color: rgba(0, 0, 0, 0.08);
}

.ajmtoaster__dismiss:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.07);
}

.ajmtoaster__dismiss:active {
  background-color: rgba(0, 0, 0, 0.08);
}

.ajmtoaster__dismiss:focus {
  outline: 0;
}
`;

const themeDefault = `
.ajmtoaster,
.ajmtoaster.theme-default {
  --ajmt-white: #fff;
  --ajmt-success: #41d888;
  --ajmt-failure: #f94416;
  --ajmt-info: #0387d7;
  --ajmt-warning: #ffbd02;
  --ajmt-duration: 300ms;
  --ajmt-easing: ease-in-out;
}
`;

const darkTheme = `
.ajmtoaster,
.ajmtoaster.theme-default,
.ajmtoaster.theme-dark {
  --ajmt-white: #f6f6f6;
  --ajmt-success: #032503;
  --ajmt-failure: #6f1010;
  --ajmt-warning: #795615;
  --ajmt-info: #191977;
  --ajmt-duration: 300ms;
  --ajmt-easing: ease-in-out;
}
`;

const themes = {
  baseCss: baseStyles,
  dark: darkTheme + baseStyles,
  default: themeDefault + baseStyles
};

export default themes;
export { baseStyles as baseCss, darkTheme as themeDark, themeDefault };
