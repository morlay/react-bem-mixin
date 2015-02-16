var bemClassSet = require('../libs/bemClassSet');
var assert = require('chai').assert;

describe.only(__filename, function () {
  it('should build block class name', function () {
    assert.equal(bemClassSet('button'), 'button');
  });

  it('should build block with modifiers class name', function () {
    assert.equal(bemClassSet('button', {
      mod1: 'val1',
      mod2: false
    }), 'button button--mod1--val1');
  });

  it('should build elem class name', function () {
    assert.equal(bemClassSet('button', 'box'), 'button__box');
  });

  it('should build elem with modifiers class name', function () {
    assert.equal(bemClassSet('button', 'box', {mod1: 'val1', mod2: 'val2'}),
      'button__box button__box--mod1--val1 button__box--mod2--val2');
  });

  it('should build block with mixed elem class name', function () {
    assert.equal(bemClassSet('button', [{block: 'mixed', elem: 'elem'}]),
      'button mixed__elem');
  });

  it('should throw error if mix contains block only', function () {
    assert.equal(bemClassSet('button', [{block: 'mixed'}]), 'button');
  });

  it('should throw error if mix only contains elem', function () {
    assert.equal(bemClassSet('button', [{elem: 'mixed'}]), 'button');
  });
});
