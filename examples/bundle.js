require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ELEM_DELIM = '__';
var MOD_DELIM = '--';

module.exports = function () {
  return cx(bemx.apply(this, arguments));
};

/**
 * @param block
 * @param elem String
 * @param mods Object
 * @param mix Array
 * @returns {{}}
 */
function bemx(block, elem, mods, mix) {

  var classes = {};
  var entity;

  if (type(block) !== 'String') {
    throw new Error('block must be a String');
  }

  if (type(elem) === 'String' && !isEmpty(elem)) {
    entity = [block, elem].join(ELEM_DELIM);
  } else {
    entity = block;

    mix = mods;
    mods = elem;
    elem = null;
  }

  classes[entity] = true;

  if (type(mods) === 'Object') {
    Object.keys(mods).forEach(function (modName) {
      if (mods[modName]) {
        classes[entity + MOD_DELIM + modName + (mods[modName] === true ? '' : MOD_DELIM + mods[modName])] = true
      }
    });
  } else {
    mix = mods;
    mods = null;
  }

  if (type(mix) === 'Array') {
    mix.forEach(function (mixItem) {
      if (type(mixItem.block) === 'String' && type(mixItem.elem) === 'String') {
        classes = merge(classes, bemx(mixItem.block, mixItem.elem, mixItem.mods, null));
      }
    });
  } else {
    mix = null;
  }

  return classes;
}

function cx(classNames) {
  return Object.keys(classNames).join(' ');
}

function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
}

function isEmpty(list) {
  return Object(list).length === 0;
}

function merge(destination, other) {
  var props = Object.keys(other), idx = -1, length = props.length;
  while (++idx < length) {
    destination[props[idx]] = other[props[idx]];
  }
  return destination;
}

},{}],2:[function(require,module,exports){
module.exports = function (input) {

  if (typeof input !== 'string') {
    throw new Error('need a string')
  }

  var output = input.replace(/([A-Z])/g, '-$1').toLowerCase();

  if (isDashAtFirst(output)) {
    return output.substring(1)
  }

  return output;

};

function isDashAtFirst(string) {
  return string.indexOf('-') === 0;
}

},{}],"react-bem-mixin":[function(require,module,exports){
module.exports = {

  componentWillMount: function () {
    this.$$block = require('./libs/camelCase2Dash')(this.constructor.displayName);
  },

  $bemx: require('./libs/bemClassSet'),

  $emx: function (elem, mods, mix) {
    return this.$bemx(this.$$block, elem, mods, mix);
  }

};

},{"./libs/bemClassSet":1,"./libs/camelCase2Dash":2}]},{},[]);
