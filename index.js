'use strict'

const fs = require('fs')
const id3 = require('id3js')

module.exports = (path, cb) => {
  id3({ file: path, type: id3.OPEN_LOCAL }, (err, tags) => {
    if (err) return cb(err)
    const name = [
      tags.artist,
      '-',
      tags.year,
      tags.album,
      '-',
      tags.v2.track.split('/')[0],
      tags.title
    ].filter(Boolean).join(' ').replace(/[\x00-\x1F\x7F-\x9F]/g, '') + '.mp3'

    cb(null, {
      name,
      stream: fs.createReadStream(path)
    })
  })
}
