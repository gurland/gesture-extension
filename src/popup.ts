import '../styles/popup.scss';

import * as handpose from '@tensorflow-models/handpose';

import '@tensorflow/tfjs-backend-webgl';
// @ts-ignore
import { GestureEstimator } from 'fingerpose';
import { PaperGesture, RockGesture, ScissorsGesture } from './gestures';

document.getElementById('go-to-options').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

// @ts-ignore
let handposeModel, gestureEstimator;

const video = document.querySelector('#videoElement');

document.getElementById('start').addEventListener('click', () => {
  // @ts-ignore
  if (navigator.getUserMedia) {
    // @ts-ignore
    navigator.getUserMedia(
      { audio: false, video: { width: 1280, height: 720 } },

      // @ts-ignore
      async (stream) => {
        {
          // @ts-ignore
          video.srcObject = stream;
          await init();

          console.log('success');
          // @ts-ignore
          const predictions = await handposeModel.estimateHands(video, false);
          console.log(predictions);

          setInterval(async () => {
            // @ts-ignore
            const predictions = await handposeModel.estimateHands(video, false);
            // console.log(predictions);

            if (predictions.length > 0) {
              // detect gestures
              // @ts-ignore
              const gestureEstimations = gestureEstimator.estimate(
                // @ts-ignore
                predictions[0].landmarks,
                // @ts-ignore
                9,
              );

              // get gesture with highest match score
              if (gestureEstimations.gestures.length > 0) {
                // this will reduce an array of results to a single value
                // containing only the gesture with the highest score
                const gestureResult = gestureEstimations.gestures.reduce(
                  // @ts-ignore
                  (p, c) => {
                    return p.confidence > c.confidence ? p : c;
                  },
                );

                console.log(gestureResult.name);
                if (gestureResult.name === 'rock') {
                  await chrome.runtime.sendMessage('test');
                }
              }
            }
          }, 2000);

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
});

const init = async () => {
  const knownGestures = [RockGesture, PaperGesture, ScissorsGesture];
  gestureEstimator = new GestureEstimator(knownGestures);
  console.log(
    'Initialized FingerPose with ' + knownGestures.length + ' gestures',
  );

  console.log('Loading handpose model...');
  handposeModel = await handpose.load();
  console.log('Model loaded');
};
