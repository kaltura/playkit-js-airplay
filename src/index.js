// @flow
import {registerPlugin} from 'kaltura-player-js';
import {AirPlay} from './airplay';
import {EventType} from './event-type';

declare var __VERSION__: string;
declare var __NAME__: string;

const VERSION = __VERSION__;
const NAME = __NAME__;

export {AirPlay as Plugin, EventType};
export {VERSION, NAME};

const pluginName: string = 'airplay';

if (AirPlay.isValid()) {
  registerPlugin(pluginName, AirPlay);
}
