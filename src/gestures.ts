// @ts-ignore
import { GestureDescription, Finger, FingerCurl } from 'fingerpose';

const RockGesture = new GestureDescription('rock'); // ✊️
const PaperGesture = new GestureDescription('paper'); // 🖐
const ScissorsGesture = new GestureDescription('scissors'); // ✌️

const fingerUpGest = new GestureDescription('Gun'); // ✊️
const fingerRockGest = new GestureDescription('Rock&Roll'); // ✊️

const ok = new GestureDescription('Ok'); // ✊️

// Rock
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
RockGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
RockGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  RockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  RockGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Paper
// -----------------------------------------------------------------------------

// no finger should be curled
for (let finger of Finger.all) {
  PaperGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

// Scissors
//------------------------------------------------------------------------------

// index and middle finger: stretched out
ScissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
ScissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

// ring: curled
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky: curled
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

fingerUpGest.addCurl(Finger.Index, FingerCurl.NoCurl, 0.9);
fingerUpGest.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.9);

for (let finger of [Finger.Ring, Finger.Middle, Finger.Pinky]) {
  fingerUpGest.addCurl(finger, FingerCurl.FullCurl, 1.0);
  fingerUpGest.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

fingerRockGest.addCurl(Finger.Index, FingerCurl.NoCurl, 0.9);
fingerRockGest.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.9);
fingerRockGest.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

fingerRockGest.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);
fingerRockGest.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

fingerRockGest.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.9);
fingerRockGest.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.9);

fingerRockGest.addCurl(Finger.Pinky, FingerCurl.NoCurl, 0.9);

for (let finger of [Finger.Ring, Finger.Middle, Finger.Pinky]) {
  fingerRockGest.addCurl(finger, FingerCurl.FullCurl, 1.0);
  fingerRockGest.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

ok.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.8);
ok.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.8);

ok.addCurl(Finger.Index, FingerCurl.FullCurl, 0.8);
ok.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.8);

ok.addCurl(Finger.Pinky, FingerCurl.NoCurl, 0.9);

ok.addCurl(Finger.Middle, FingerCurl.NoCurl, 0.9);
ok.addCurl(Finger.Ring, FingerCurl.NoCurl, 0.9);

export {
  RockGesture,
  PaperGesture,
  ScissorsGesture,
  fingerUpGest,
  fingerRockGest,
  ok,
};
