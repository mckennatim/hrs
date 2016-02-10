<blockquote>The React components are just a stateless projection of the state at a given point in time.</blockquote>
ref: 
- <a href="http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html">Full-Stack Redux Tutorial
A Comprehensive Guide to Test-First Development with Redux, React, and Immutable
Posted on Thursday Sep 10, 2015 by Tero Parviainen (@teropa)</a>
<a href="https://auth0.com/blog/2016/01/04/secure-your-react-and-redux-app-with-jwt-authentication/">react-and-redux-app-with-jwt-authentication</a>
- <a href="https://github.com/babel/example-node-server">babel node server</a>



It is a much better idea to, whenever you can, make operations work on the smallest piece (or subtree) of the state possible. What we're talking about is modularization: Have the functionality that deals with a given piece of data deal with only that part of the data, as if the rest didn't exist.    

## immutable examples

    let state = fromJS({ctrl: {panel: "auto", relay: "on", by: 'forecast'},
                    cond: {temp: 67, sky: "cloudy"},
                    forecast: {isSnow: true, when: "now", accum: 10}});
    let nextState = state.setIn(['ctrl', 'by'], 'user')
    expect(state.getIn(['ctrl', 'by'])).to.equal("forecast")

`['ctrl', 'by']` is the `keypath`

## notes

map creates a new array, foreach doesn't
# client
## install
    npm install
## run in dev
    webpack-dev-server --port 4444
## deploy
    npm run deploy 

This runs `"deploy": "set NODE_ENV=production&& webpack -p --config webpack.production.config.js"` creating `dist/app.js`(5 KB) and `dist/vendors.js`(186 KB) which are the only files you need for deployment!  `index.htm` looks like this:

    <!DOCTYPE html>
    <html>
    <head>
        <title>hrs</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="vendors.js"></script>
        <script src="app.js"></script>
    </body>
    </html>

- note: windows requires that deploy string, mostly you see examples like `"deploy": "NODE_ENV=production webpack -p --config webpack.production.config.js"`  but that doesn't work in windows. 
# server
## install
    npm install
## dev server
    npm run start
## prod server
    npm run build
    npm run serve
## test
    npm run test:watch
## server setup

    npm init -y
    npm install --save-dev babel-core babel-cli babel-preset-es2015
    npm install --save-dev mocha chai
    npm install --save immutable
    npm install --save-dev chai-immutable
We need to let plug in chai-immutable before any tests are run. That we can do in a little test helper file, which should create next:

test/test_helper.js

    import chai from 'chai';
    import chaiImmutable from 'chai-immutable';
    chai.use(chaiImmutable);

  "scripts": {
    "start": "nodemon lib/index.js --exec babel-node --presets es2015,stage-2 --watch lib",
    "build": "babel lib -d dist --presets es2015,stage-2",
    "serve": "node dist/index.js",
    "test": "mocha --compilers js:babel-core/register --require ./test/test_helper.js  --recursive --slow 4",
    "test:watch": "npm run test -- --watch"
  },
`nodemon` restarts the server `lib/index.js` whenever the `--watch`ed directory changes. When it resarts it has to transpile all the es6 code to es5.

`build`s an es5 version of your es6 code (in lib) and puts it in /dist
## modules
### verify-addr
A module that provides an api for a store of addresses kept in the mysql `forecast` db and `locations` table. It has the following fields.

    id -
    raw - a string that may or may not get you the right address
    st - the state of raw
    address - the string returned by google results[0].formatted_address
    lat - the number returned by google results[0].geometry.location.lat
    lng - the number returned by google results[0].geometry.location.lng
    verified - binary set by client or automatically sometimes
    domain - which app uses these, maybe `hrs`

The module provides the following services:

- get('/api/hrs/verify-addr/') //res is all the hrs addresses that need verification
- get('/api/hrs/verify-addr/all') //res is all the hrs addresses
- get('/api/hrs/verify-addr/:id') //res is a particular hrs 
- post('/api/hrs/verify-addr/') //201 if created a new `locations` record returns id
- put('/api/hrs/verify-addr/:id') //updates with 200 or 204(no content) or 404 (not found/invalid)
- delete('/api/hrs/verify-addr/:id') //deletes with 200 or 404 (not found)

## tags
### 01-basic-working-client-server
Server using mysql with tests and a client with basic `redux-simple-route`ing and testing all `babel`ed up with `webpack` watching.
### 02-hot loader-client
Did not work when client/index.html. Needs it to be in ./dist and `contentBase: './dist',` Then got `webpack.production.config.js` to work sending app.js(70k) and vendors.js(186k) to /dist2. Nice and small.
### 03-async-result
- make an asynch call to ggogle address api
- return result to page as possible addresses

### 04-selAddr2map
- using Gmaps from react-maps, tested in `Unver`
- added `<Gmaps>` component to `<VerOut>`
- added `selected:{address: , location:{lat,lng}}` to  `state.verify`
- `selected` prop is mapped to `state.data.verify.selected` and passed to `Veri` who passes it to `Verout`who passes lat and lng to `<Gmap>`
- clicking on link sends `i` in returned function as a closure.
- `Verout` s `cngSelected` creates a `selected` object and ships it out to `updSelected`
- `Veri` takes `upSelected` from `Verout` and connects it to its `onSelected` prop.
- `mapDispatchToProps` dispatches the `selAddr` action on `onSelected`  
#### todo
+ send selected and approved to database
+replace input box with a list of unverified addresses 

### 05-responsive-js+css
Bigger devices can render more information, 2 or 3 phone-size pages shown together perhaps. All you need to know is the size of the device and maybe when that size changes. An intial state is passed in to the `reducers/app.js` Added a `window.addEventListener('resize', handleResize);` to `App.js`, the `/` route component.  A `SET_DEVICE` action is fired after the user finishes resizing the browser. (`App.js - doneResizing()`). The `Home` component, gets the prop `browser` which can be one of 4 types. Currently, if it is type `tablet` (2) then the page renders `more` content.
####todo
+ send selected and approved to database
+ replace input box with a list of unverified addresses 

### 06-load-on-mount
To do so I think you need the form `class Unverified extends React.Component{}`
You also have to pass the `dispatch` command to `props`. 
```js
const mapDispatchToProps = (dispatch) => {
  return {
    onGetUnver: () => {
        dispatch(fetchUnverified())
    },
    dispatch
  };
};
```
Now you can have the action you imported run at startup, just once
```js
    componentDidMount() {
        const {dispatch} = this.props
    dispatch(fetchUnverified())     
    } 
```
voila
### 07-add-radium
Radium decorates the class. You can use `Myclass=Radium(Myclass)` or
```js
@Radium
class MyClass extends React.Component()
```
Radium allows you to use :hover and the like as well as using an array of styles. To use decorators you need `npm i --save babel-plugin-transform-decorators-legacy` and modify  `package.json` with the addtiional plugin

```js
    "plugins": [
      "transform-class-properties",
      "transform-decorators-legacy"
    ]
```

### 08-initialize-register-unverified

### 09-unver->register->maps

### 10-maps->reg
Started moving functions out of the render method and up in the class proper where they belong

### 11-refa2unsel_ver-ck
Refactored away from selected to keeping everything in unsel_ver. &#10004; now works
### 12-hide-droid-keyboard
it doesn't go away on an input field data entry. Here's how you make it go away
in `Register.js` component
```js
    hideDroidKbd(element){
        element.setAttribute("readonly", "readonly")
        element.setAttribute("disabled", "true")
        setTimeout(function(){
            element.removeAttribute("readonly")
            element.removeAttribute("disabled")             
        },100)
    }
