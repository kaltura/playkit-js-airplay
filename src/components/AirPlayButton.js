// @flow
/**
 * @jsx h
 * @ignore
 */
import {ui, core} from '@playkit-js/kaltura-player-js';
import {EventType} from '../event-type';
import {pluginName} from '../airplay';

const {h, preact, Components, style, Event, Utils, redux, Reducers} = ui;
const {Component} = preact;
const {Icon, IconState, withPlayer, Tooltip} = Components;
const {withEventManager} = Event;
const {bindActions} = Utils;
const {shell} = Reducers;
const {actions} = shell;
const {connect} = redux;
const {FakeEvent} = core;

const ICON_PATH: string =
  'M785.597 704l-55.273-64h37.887c17.556 0 31.789-14.235 31.789-31.858v-288.283c0-17.595-14.238-31.858-31.789-31.858h-512.423c-17.556 0-31.789 14.235-31.789 31.858v288.283c0 17.595 14.238 31.858 31.789 31.858h40.032l-54.575 64h-49.167c-17.717 0-32.079-14.365-32.079-32.239v-415.521c0-17.805 14.063-32.239 32.079-32.239h639.842c17.717 0 32.079 14.365 32.079 32.239v415.521c0 17.805-14.063 32.239-32.079 32.239h-46.324zM491.273 509.426c11.447-13.424 30.248-13.282 41.719 0l225.536 261.147c11.593 13.424 6.771 24.306-11.069 24.306h-467.54c-17.707 0-22.66-11.025-11.334-24.306l222.687-261.147z';

@withPlayer
@withEventManager
@connect(null, bindActions(actions))
class AirPlayButton extends Component {
  state: Object = {
    isActive: false,
    isAvailable: false
  };

  _defaultTranslation: {[key: string]: string} = {
    title: 'AirPlay',
    turnOff: 'Turn off AirPlay'
  };

  componentWillMount() {
    this.props.eventManager.listen(this.props.player, EventType.AIRPLAY_AVAILABILITY_CHANGED, this.airPlayAvailabilityChangedHandler);
    this.props.eventManager.listen(this.props.player, EventType.AIRPLAY_STARTED, this.airPlayStartedHandler);
    this.props.eventManager.listen(this.props.player, EventType.AIRPLAY_ENDED, this.airPlayEndedHandler);
  }

  airPlayAvailabilityChangedHandler = (event: FakeEvent) => {
    this.setState({isAvailable: event.payload.isAvailable});
  };

  airPlayStartedHandler = () => {
    this.setState({isActive: true});
    this.props.addPlayerClass(style.casting);
  };

  airPlayEndedHandler = () => {
    this.setState({isActive: false});
    this.props.removePlayerClass(style.casting);
  };

  render(props: Object) {
    if (!this.state.isAvailable) {
      return undefined;
    }
    const title = this.props.title || this._defaultTranslation.title;
    const turnOff = this.props.turnOff || this._defaultTranslation.turnOff;
    return (
      <div className={style.controlButtonContainer}>
        <Tooltip label={this.state.isActive ? turnOff : title}>
          <button id="airPlayButton" className={style.controlButton} onClick={props.startAirplay}>
            <Icon id={pluginName} path={ICON_PATH} state={this.state.isActive ? IconState.ACTIVE : IconState.INACTIVE} />
          </button>
        </Tooltip>
      </div>
    );
  }
}

export {AirPlayButton};
