import '../styles/options.scss';

const button = document.getElementById('requestPermission');

button.onclick = () => {
  console.log('ya');
  // @ts-ignore
  navigator.getUserMedia =
    // @ts-ignore
    navigator.getUserMedia ||
    // @ts-ignore
    navigator.webkitGetUserMedia ||
    // @ts-ignore
    navigator.mozGetUserMedia;

  // @ts-ignore
  if (navigator.getUserMedia) {
    // @ts-ignore
    navigator.getUserMedia(
      { audio: false, video: { width: 1280, height: 720 } },

      // @ts-ignore
      (stream) => {
        {
          console.log('success');
        }
      },

      // @ts-ignore
      (err) => {
        console.error(`The following error occurred: ${err.name}`);
      },
    );
  } else {
    console.log('getUserMedia not supported');
  }
};
