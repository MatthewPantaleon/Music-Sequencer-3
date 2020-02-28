operation instrcutions: 

YOU MUST USE YARN!!!

copy, paste and unpack to directory.

cd to directory.

yarn start - for development electron:
		- Localfiles should be able to load via the localhost
		- port 3000 will be used on localhost. Application will not work in a regular browser due to node functionality

yarn build - for distribution, will create a build folder and dist folder. To run natively go to the dist/win-unpacked and run exe.

working:
create new project.
load project - validation minimal
save project - validation minimal

import sounds - validation minimal
create channel - does not check if sound element actually exists
mute channel
destroy all channels
remove one channel
bpm changer - validation minimal/minimum feedback

change volume of individual channel - minimal feedback

not working:
export complete project with sounds
save channels into one audio file
ability to select a sub section of audio for channels to use
multiple pages for channels
API Browser
