# vue-disable-interpolation

## Usage

```js
Vue.use(VueDisableInterpolation)
```

## Development

### Install

- gulp
  - `npm install -g gulp`
- xvfb (only no desktop environment.)

```shell
npm install
```

### Release Build

```shell
$ gulp release
```

### Test

```shell
$ gulp test

# with version (default 2.0.0)
$ VUE_VERSION=2.3.4 gulp test
```

## Contributing

1. Fork it
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Commit your changes (`git commit -am 'Add some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Create new Pull Request (**Please not include `dist/` files**)
