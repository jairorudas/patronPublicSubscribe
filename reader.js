// publisher

var fs = require('fs')
var EventEmitter = require('events')
var util = require('util')
var inherits = util.inherits

function readFileText (name, callback) {
  process.nextTick(function () {
    var content = fs.readFileSync(name)
    callback(content.toString())
  })
}

function TextReader (name) {
  EventEmitter.call(this)
  this.name = name
}

inherits(TextReader, EventEmitter)

TextReader.prototype.read = function () {
  var self = this
  readFileText(this.name, function (content) {
    self.emit('end', content)
  })
}

var reader = new TextReader('./lorem.txt')

module.exports = reader
