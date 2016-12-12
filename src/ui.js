const express = require('express')
const bodyParser = require('body-parser')

module.exports = class UI {
  constructor ({ plugin, port }) {
    this._plugin = plugin
    this._port = port  

    this._app = express()
    this._app.use(bodyParser.urlencoded({ extended: true }))
  }

  _getHomepage (content) {
    return `
<html>
<head>
  <meta charset="utf-8" />
  <title>Settlement</title>
  <style>
#content {
  width: 33em;
  margin: auto;
}
  </style>
</head>
<body>
  <div id="content">
    <h1><a style="color:black;" href="/">Settlement Page</a></h1>
    <hr />
    <br />
    <form action="/" method="post">
      <label>Amount <input type="number" name="amount" /></label><br>
      <input type="submit" />
    </form>
    <br />
    ${content || ''}
  </div>
</body>
</html>
`
  }

  connect () {
    this._app.get('/', (req, res) => {
      console.log('user requested "/"')
      res.send(this._getHomepage())
    })

    this._app.post('/', (req, res) => {
      const amount = +req.body.amount

      console.log('got settlement for ' + amount)
      res.send(this._getHomepage('<p style="color:green;">Sent settlement of ' + amount + '</p>'))
    })

    return new Promise((resolve) => {
      this._app.listen(this._port, () => {
        console.log('Example app listening on port ' + this._port)
        resolve()
      })
    })
  }
}
