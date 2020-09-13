// @flow
/**
 * @jsx h
 * @ignore
 */
import {ui, core} from 'kaltura-player-js';
import {EventType} from '../event-type';

const {h, preact, Components, style, Event, Utils, redux, Reducers} = ui;
const {Component} = preact;
const {Icon, IconType, withPlayer} = Components;
const {withEventManager} = Event;
const {bindActions} = Utils;
const {shell} = Reducers;
const {actions} = shell;
const {connect} = redux;
const {FakeEvent} = core;

@withPlayer
@withEventManager
@connect(null, bindActions(actions))
class AirPlayButton extends Component {
  state: Object = {
    isActive: false,
    isAvailable: false
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
    if (!this.state.isAvailable) return undefined;
    return (
      <div role="button" className={style.controlButtonContainer}>
        <button id="airPlayButton" className={style.controlButton} onClick={props.startAirplay}>
          <Icon type={this.state.isActive ? IconType.AirPlayActive : IconType.AirPlay} />
        </button>
      </div>
    );
  }
}

export {AirPlayButton};
