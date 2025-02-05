![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Delimiter Tool for Editor.js

Delimiter Tool for the [Editor.js](https://editorjs.io).

![image](https://user-images.githubusercontent.com/6184465/65581160-93971880-dfad-11e9-976b-c28873d6de6a.png)

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev @editorjs/delimiter
```

Include module at your application

```javascript
const Delimiter = require('@editorjs/delimiter');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@editorjs/delimiter).

`https://cdn.jsdelivr.net/npm/@editorjs/delimiter@1.0.1`

Require this script on a page with Editor.js.

```html
<script src="..."></script>
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...
  
  tools: {
    ...
    delimiter: Delimiter,
  }
  
  ...
});
```

## Config Params

This Tool has no config params

## Output data

This Tool returns empty object.

```json
{
    "type" : "delimiter",
    "data" : {}
}
```

