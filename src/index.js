// @flow
import {registerPlugin} from '@playkit-js/kaltura-player-js';
import {AirPlay, pluginName} from './airplay';
import {EventType} from './event-type';

declare var __VERSION__: string;
declare var __NAME__: string;

const VERSION = __VERSION__;
const NAME = __NAME__;

export {AirPlay as Plugin, EventType};
export {VERSION, NAME};

if (AirPlay.isValid()) {
  registerPlugin(pluginName, AirPlay);
}
