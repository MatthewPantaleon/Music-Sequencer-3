/**
 * @Date:   2020-03-03T17:54:59+00:00
 * @Last modified time: 2020-03-06T19:04:39+00:00
 */


import React from 'react';
import SoundChannel from "./../src/components/Main/SoundChannel";
import renderer from 'react-test-renderer';


function timer(callback){
  console.log("AM I EVEN HERE");
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 100);
}

test('Test Sound Component Rendering', () => {
  // console.log("TEst");

  const component = renderer.create(
    <SoundChannel
      id={1}
      name={"Test Name"}
      time={0}
      isPlaying={false}
      soundUrl={"C:/Users/N00173936/Desktop/DummyFolder/sounds/TestBeats/kick.wav"}
      removeChannel={() => {}}
      getBarData={() => {}}
      existingBar={[{id: -1}]}

      effects={[{id: 1, volume: 1}]}
      />
  );
  let tree = component.toJSON();

});

let counter = 0;
let b = jest.fn(() => counter);
// console.log(b.mockResolvedValue());
let ct = 0;
let nt = 0;

test("Testing fake Timers With Plain setInterval", () => {
  let times = [];
  if(ct === 0 )ct = new Date().getTime();
  jest.useFakeTimers();
  // jest.runTimersToTime(1000);
  let h = setInterval(() => {
    // console.log('TIME IS UP');
    jest.setTimeout(10000);
    nt = new Date().getTime();
    // console.log(nt - ct);
    times.push(nt - ct);

    if(counter === 27){
      clearInterval(h);
      return;
    }
    counter++;
    ct = nt;
  }, 1000);

  jest.runAllTimers();
  console.log(times);
});


function t(){

}
