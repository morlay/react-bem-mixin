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
