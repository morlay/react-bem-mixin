module.exports = {

  componentWillMount: function () {
    this.$$block = require('./libs/camelCase2Dash')(this.constructor.displayName);
  },

  $bemx: require('./libs/bemClassSet'),

  $emx: function (elem, mods, mix) {
    return this.$bemx(this.$$block, elem, mods, mix);
  }

};
