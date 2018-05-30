module.exports = [
  {
    url: '/users',
    method: 'get',
    description: 'get user list.',
    handle: function (req, res) {
      res.respond(null, [
        {
          id: 123,
          name: 'sdx'
        },
        {
          id: 234,
          name: 'dss'
        }
      ])
    }
  },
  {
    url: '/users/:id',
    method: 'get',
    handle: function (req, res) {
      res.respond(null, 'get users by id.')
    }
  },
  {
    url: '/users',
    method: 'post',
    handle: function (req, res) {
      res.respond(null, 'add a user.')
    }
  }
]
