const defaultStyles = `
.ajmey-toaster {
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
  width: 43%;
  z-index: 5;
  background: #fff;
}

.ajmey-toaster__inner.--success {
  border: 1px solid green;
  color: green;
}

.ajmey-toaster__inner.--failure {
  border: 1px solid red;
  color: red;
}
`;

export default defaultStyles;
