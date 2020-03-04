/**
 * @Date:   2020-03-03T17:54:59+00:00
 * @Last modified time: 2020-03-04T19:57:41+00:00
 */


import React from 'react';
import SoundChannel from "./../src/components/Main/SoundChannel";
import renderer from 'react-test-renderer';


test('Test Load The SoundChannel Component', () => {
  console.log("TEst");
  const component = renderer.create(
    <SoundChannel
      id={1}
      name={"Test Name"}
      time={0}
      isPlaying={false}
      soundUrl={""}
      removeChannel={() => {}}
      getBarData={() => {}}
      existingBar={[{id: -1}]}

      effects={[]}
      />
  );
  let tree = component.toJSON();
  console.log(tree);
});
