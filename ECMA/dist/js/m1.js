'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// true
var func = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return say();

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function func() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var name = exports.name = 'bird';

var say = exports.say = function say() {
  return console.log('whisper');
};

var arr = [1, 2, 3, 4, 5];
console.log(arr.includes(1));