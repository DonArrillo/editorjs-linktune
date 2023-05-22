# EditorJS Link Tune

Block tune plugin to add links to blocks in EditorJS (images and such). Heavily piggy-backing on LinkAutocomplete.

### Install via NPM

```shell
$ npm i git+ssh://git@gitlab.peytz.dk:flex/editorjs-linktune.git
```

Include module at your application

```js
import LinkTune from 'editorjs-linktune';
```

## Usage

Add a new tool to the `tools` property of the Editor.js initial config.

```js
const editor = EditorJS({
  tools: {
    linkTune: {
      class: LinkTune,
      config: {
        endpoint: '/some-endpoint',
        queryParam: 'search'
      }
    },
    image: {
      //...
      tunes: ['linkTune']
    }
  },
});
```
