## React Bem Mixin

just a simple bem mix to quick add bem classes in a component.

[![Build Status](https://travis-ci.org/morlay/react-bem-mixin.svg?branch=master)](https://travis-ci.org/morlay/react-bem-mixin)
[![Dependencies](https://david-dm.org/morlay/react-bem-mixin.svg)](https://david-dm.org/morlay/react-bem-mixin)

## Usage

See example

### `this.$$block`

covert from this.constructor.displayName

### `this.$bemx(String:block[,String:elem, Object:mods, Array:mix])`

mix item is


    {
      block: 'String'
      elem: 'String'
      mods: 'Object'
    }


block and elem must use together

### `this.$emx([String:elem, Object:mods, Array:mix])`

sort for $bemx, use `$$block` as argument `block`
