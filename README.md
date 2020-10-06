# PlayKit JS AirPlay - Apple AirPlay Plugin for the [Kaltura Player JS]

[![Build Status](https://travis-ci.org/kaltura/playkit-js-airplay.svg?branch=master)](https://travis-ci.org/kaltura/playkit-js-airplay)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![](https://img.shields.io/npm/v/@playkit-js/playkit-js-airplay/latest.svg)](https://www.npmjs.com/package/@playkit-js/playkit-js-airplay)
[![](https://img.shields.io/npm/v/@playkit-js/playkit-js-airplay/canary.svg)](https://www.npmjs.com/package/@playkit-js/playkit-js-airplay/v/canary)

PlayKit JS AirPlay plugin integrates [AirPlay Button] with the [Kaltura Player JS].

PlayKit JS AirPlay is written in [ECMAScript6], statically analysed using [Flow] and transpiled in ECMAScript5 using [Babel].

[airplay button]: https://developer.apple.com/documentation/webkitjs/adding_an_airplay_button_to_your_safari_media_controls
[flow]: https://flow.org/
[ecmascript6]: https://github.com/ericdouglas/ES6-Learning#articles--tutorials
[babel]: https://babeljs.io
[kaltura player js]: https://github.com/kaltura/kaltura-player-js

## Getting Started

### Prerequisites

The plugin requires [Kaltura Player JS] to be loaded first.

### Installing

First, clone and run [yarn] to install dependencies:

[yarn]: https://yarnpkg.com/lang/en/

```
git clone https://github.com/kaltura/playkit-js-airplay.git
cd playkit-js-airplay
yarn install
```

### Building

Then, build the player

```javascript
yarn run build
```

### Embed the library in your test page

Finally, add the bundle as a script tag in your page, and initialize the player

```html
<!--PlayKit player-->
<script type="text/javascript" src="/PATH/TO/FILE/kaltura-{ovp/ott}-player.js"></script>
<!--PlayKit AirPlay plugin-->
<script type="text/javascript" src="/PATH/TO/FILE/playkit-airplay.js"></script>
<div id="player-placeholder" style="height:360px; width:640px">
  <script type="text/javascript">
    var config = {
      provider: {
        partnerId: {YOUR_PARTNER_ID}
        ...
      },
      ...
      plugins: {
        airplay: {}
      }
      ...
    };
    var player = KalturaPlayer.setup(config);
    player.play();
  </script>
</div>
```

## Running the tests

Tests can be run locally via [Karma], which will run on Chrome, Firefox and Safari

[karma]: https://karma-runner.github.io/1.0/index.html

```
yarn run test
```

You can test Safari browser:

```
yarn run test:safari
```

### And coding style tests

We use ESLint [recommended set](http://eslint.org/docs/rules/) with some additions for enforcing [Flow] types and other rules.

See [ESLint config](.eslintrc.json) for full configuration.

We also use [.editorconfig](.editorconfig) to maintain consistent coding styles and settings, please make sure you comply with the styling.

## Compatibility

TBD

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kaltura/playkit-js-airplay/tags).

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details

```

```
