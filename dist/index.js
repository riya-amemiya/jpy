"use strict";

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jpy_command = ["log ", "imp "];
var js_command = [['console.log("', 1, '");\n'], ['import "', 1, '";\n']];
var out = "";
var inpfile = "";

var check = function check(file) {
  var hasfaile = false;

  try {
    _fs["default"].statSync(file);

    hasfaile = true;
  } catch (err) {
    hasfaile = false;
  }

  return hasfaile;
};

var read = function read(file) {
  if (check(file)) {
    ;
    inpfile = _fs["default"].readFileSync(file, 'utf8');
  }

  return inpfile;
};

var inp = read('src/index.jpy').replace(/\n/g, '').split(/;/);

for (var i in inp) {
  inp[i] = inp[i].split(/"/);
}

for (var _i in inp) {
  for (var u in jpy_command) {
    if (~inp[_i][0].indexOf(jpy_command[u])) {
      for (var f in js_command[u]) {
        if (typeof js_command[u][f] == 'number') {
          out += inp[_i][1];
        } else {
          out += js_command[u][f];
        }
      }
    }
  }
}

console.log(out);

if (check('build_jpy')) {
  _fs["default"].writeFile('build_jpy/build.js', out, function (err) {
    if (err) {
      throw err;
    }

    console.log('build_jpy/build.jsが作成されました');
  });
} else {
  _fs["default"].mkdir('build_jpy', function (err) {
    if (err) {
      throw err;
    }

    _fs["default"].writeFile('build_jpy/build.js', out, function (err) {
      if (err) {
        throw err;
      }

      console.log('build_jpy/build.jsが作成されました');
    });
  });
}