/**
 * @Date:   2020-03-03T17:54:59+00:00
 * @Last modified time: 2020-03-05T20:20:55+00:00
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
  // console.log(tree.props);
  // expect(tree).toMatchSnapshot();
  // jest.useFakeTimers();
  // // timer();
  // setTimeout((callback) => {
  //   console.log("Time's up -- stop!");
  //   callback && callback();
  // }, 100);
  // jest.runAllTimers();
  // expect(setTimeout).toHaveBeenCalledTimes(2);

  // tree.preview();
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});

let counter = 0;

it("Testing fake Timers", () => {
  jest.useFakeTimers();
  let h = setInterval(() => {
    console.log('TIME IS UP');
    counter++;
    if(counter === 5) clearInterval(h);
  }, 1000);
  jest.runAllTimers();
  
});
