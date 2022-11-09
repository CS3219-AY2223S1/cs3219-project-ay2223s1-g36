export const isMobile = (userAgent) =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

export const getUserAgent = (navigator) =>
  typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
