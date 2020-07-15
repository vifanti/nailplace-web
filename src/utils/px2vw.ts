const px2vw = (size: number, width = 1366): string =>
  `${(size / width) * 100}vw`;

export default px2vw;
