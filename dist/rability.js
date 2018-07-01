//  Rability v1.0.0
//  https://github.com/estepan/rability
//  (c) 2018-2018 Evgeny Stepanov
//  Rability may be freely distributed under the MIT license.

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.rability = {})));
}(this, (function (exports) { 'use strict';

  function _has(prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var _has_1 = _has;

  // Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign


  function _objectAssign(target) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);
    var idx = 1;
    var length = arguments.length;
    while (idx < length) {
      var source = arguments[idx];
      if (source != null) {
        for (var nextKey in source) {
          if (_has_1(nextKey, source)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
      idx += 1;
    }
    return output;
  }
  var _objectAssign_1 = _objectAssign;

  var _assign = typeof Object.assign === 'function' ? Object.assign : _objectAssign_1;

  function _isPlaceholder(a) {
         return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
  }
  var _isPlaceholder_1 = _isPlaceholder;

  /**
   * Optimized internal one-arity curry function.
   *
   * @private
   * @category Function
   * @param {Function} fn The function to curry.
   * @return {Function} The curried function.
   */


  function _curry1(fn) {
    return function f1(a) {
      if (arguments.length === 0 || _isPlaceholder_1(a)) {
        return f1;
      } else {
        return fn.apply(this, arguments);
      }
    };
  }
  var _curry1_1 = _curry1;

  /**
   * Merges a list of objects together into one object.
   *
   * @func
   * @memberOf R
   * @since v0.10.0
   * @category List
   * @sig [{k: v}] -> {k: v}
   * @param {Array} list An array of objects
   * @return {Object} A merged object.
   * @see R.reduce
   * @example
   *
   *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
   *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
   * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
   */


  var mergeAll = /*#__PURE__*/_curry1_1(function mergeAll(list) {
    return _assign.apply(null, [{}].concat(list));
  });
  var mergeAll_1 = mergeAll;

  /**
   * Tests whether or not an object is an array.
   *
   * @private
   * @param {*} val The object to test.
   * @return {Boolean} `true` if `val` is an array, `false` otherwise.
   * @example
   *
   *      _isArray([]); //=> true
   *      _isArray(null); //=> false
   *      _isArray({}); //=> false
   */
  var _isArray = Array.isArray || function _isArray(val) {
    return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
  };

  function _isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
  }
  var _isString_1 = _isString;

  /**
   * Tests whether or not an object is similar to an array.
   *
   * @private
   * @category Type
   * @category List
   * @sig * -> Boolean
   * @param {*} x The object to test.
   * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
   * @example
   *
   *      _isArrayLike([]); //=> true
   *      _isArrayLike(true); //=> false
   *      _isArrayLike({}); //=> false
   *      _isArrayLike({length: 10}); //=> false
   *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
   */


  var _isArrayLike = /*#__PURE__*/_curry1_1(function isArrayLike(x) {
    if (_isArray(x)) {
      return true;
    }
    if (!x) {
      return false;
    }
    if (typeof x !== 'object') {
      return false;
    }
    if (_isString_1(x)) {
      return false;
    }
    if (x.nodeType === 1) {
      return !!x.length;
    }
    if (x.length === 0) {
      return true;
    }
    if (x.length > 0) {
      return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
    }
    return false;
  });
  var _isArrayLike_1 = _isArrayLike;

  /**
   * `_makeFlat` is a helper function that returns a one-level or fully recursive
   * function based on the flag passed in.
   *
   * @private
   */


  function _makeFlat(recursive) {
    return function flatt(list) {
      var value, jlen, j;
      var result = [];
      var idx = 0;
      var ilen = list.length;

      while (idx < ilen) {
        if (_isArrayLike_1(list[idx])) {
          value = recursive ? flatt(list[idx]) : list[idx];
          j = 0;
          jlen = value.length;
          while (j < jlen) {
            result[result.length] = value[j];
            j += 1;
          }
        } else {
          result[result.length] = list[idx];
        }
        idx += 1;
      }
      return result;
    };
  }
  var _makeFlat_1 = _makeFlat;

  /**
   * Returns a new list by pulling every item out of it (and all its sub-arrays)
   * and putting them in a new array, depth-first.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig [a] -> [b]
   * @param {Array} list The array to consider.
   * @return {Array} The flattened list.
   * @see R.unnest
   * @example
   *
   *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
   *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
   */


  var flatten = /*#__PURE__*/_curry1_1( /*#__PURE__*/_makeFlat_1(true));
  var flatten_1 = flatten;

  const define = (...permissions) => mergeAll_1(permissions);

  const allow = val => true;
  const prohibit = () => false;

  const setPermission = permission => (action, resource) =>
      mergeAll_1(
          flatten_1([ action ])
              .map(handler =>
                  mergeAll_1(
                      flatten_1([ resource ]).map(res => ({ [handler(res)]: permission }))
                  )
              )
      );

  const can = setPermission(allow);
  const cannot = setPermission(prohibit);

  const read = resource => `read${ resource }`;
  const view = resource => `view${ resource }`;
  const update = resource => `update${ resource }`;
  const edit = resource => `edit${ resource }`;
  const create = resource => `create${ resource }`;
  const remove = resource => `remove${ resource }`;
  const list = resource => `list${ resource }`;
  const actions = [ list, read, edit, remove, update, create, view ];
  const manage = actions;

  exports.define = define;
  exports.allow = allow;
  exports.prohibit = prohibit;
  exports.setPermission = setPermission;
  exports.can = can;
  exports.cannot = cannot;
  exports.read = read;
  exports.view = view;
  exports.update = update;
  exports.edit = edit;
  exports.create = create;
  exports.remove = remove;
  exports.list = list;
  exports.manage = manage;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
