// @flow
import {BasePlugin, core} from 'kaltura-player-js';
import {AirPlayButton} from './components/AirPlayButton';
import {EventType} from './event-type';

const {Env, FakeEvent} = core;

const pluginName: string = 'airplay';

class AirPlay extends BasePlugin {
  static defaultConfig: Object = {};

  static isValid() {
    return Env.isSafari;
  }

  _isActive: boolean = false;

  constructor(name: string, player: KalturaPlayer, config: Object) {
    super(name, player, config);
    this._attachListeners();
  }

  getUIComponents() {
    return [
      {
        label: 'airplayButtonComponent',
        presets: ['Playback', 'Live'],
        container: 'BottomBarRightControls',
        get: AirPlayButton,
        beforeComponent: 'PictureInPicture',
        props: {
          startAirplay: this.startAirplay
        }
      }
    ];
  }

  startAirplay = () => {
    this.logger.debug('Start airplay request');
    this.player.getVideoElement().webkitShowPlaybackTargetPicker();
  };

  _attachListeners() {
    if (window.WebKitPlaybackTargetAvailabilityEvent) {
      this.eventManager.listenOnce(this.player, this.player.Event.SOURCE_SELECTED, () => {
        this.logger.debug('Attach webkit listeners');
        this.eventManager.listen(this.player.getVideoElement(), 'webkitplaybacktargetavailabilitychanged', this._availabilityChangedHandler);
        this.eventManager.listen(this.player.getVideoElement(), 'webkitcurrentplaybacktargetiswirelesschanged', this._activityChangedHandler);
      });
    }
  }

  _availabilityChangedHandler = (event: Event & {availability: string}) => {
    this.logger.debug(`Availability changed to ${event.availability}`);
    switch (event.availability) {
      case 'available':
        this.player.dispatchEvent(new FakeEvent(EventType.AIRPLAY_AVAILABILITY_CHANGED, {isAvailable: true}));
        break;
      case 'not-available':
        this.player.dispatchEvent(new FakeEvent(EventType.AIRPLAY_AVAILABILITY_CHANGED, {isAvailable: false}));
        break;
    }
  };

  _activityChangedHandler = () => {
    this._isActive = !this._isActive;
    this.logger.debug(`Activity changed to ${this._isActive.toString()}`);
    this.player.dispatchEvent(new FakeEvent(this._isActive ? EventType.AIRPLAY_STARTED : EventType.AIRPLAY_ENDED));
  };
}

export {AirPlay, pluginName};
