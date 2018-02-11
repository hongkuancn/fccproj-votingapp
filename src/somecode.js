componentWillReceiveProps(nextProps) {
  // will be true
  const locationChanged1 = nextProps.location !== this.props.location
  console.log(locationChanged1);
  // INCORRECT, will *always* be false because history is mutable.
  const locationChanged2 = nextProps.history.location !== this.props.history.location;
  console.log(locationChanged2);
}


let array = [{
    "_id" : "5a7ca8cd1e9c3a1106309f6a",
    "polls" : [{
  topic: 'Who will win the game?',
  options: [
    {name: "Jack", times: 2},
    {name: "Mike", times: 3},
    {name: "Tim", times: 4}
  ]
}],
    "username" : "1",
    "password_digest" : "$2a$10$81kk0.N0.UmukW61BNXrVuXDghZEgKK.YOtttC8g4IkScKp9xsJBG",
    "__v" : 0
},
{
    "_id" : "5a7d9dfc707739141241f902",
    "polls" : [{
  topic: 'Who will win the game?',
  options: [
    {name: "Jack", times: 5},
    {name: "Mike", times: 3},
    {name: "Tim", times: 4}
  ]
}],
    "username" : "6",
    "password_digest" : "$2a$10$xl4L9n4zwk8WWvoZklpxg.URkvKgm0aRb7LGKHRcu44eB1b5G8ZZy",
    "__v" : 0
},
{
    "_id" : "5a7d9e08707739141241f903",
    "polls" : [{
  topic: 'Who will win the game?',
  options: [
    {name: "Jack", times: 2},
    {name: "Mike", times: 5},
    {name: "Tim", times: 4}
  ]
}],
    "username" : "3",
    "password_digest" : "$2a$10$rCf3LfcdOq1SG0Z9OD6UWOR5yBHZTxJDlT6iySM.b/O/uFE3MH9yq",
    "__v" : 0
}]

let topics = _.map(array, (user) => {
	return _.map(user["polls"], (poll) => {
		return poll.topic;
	})
})

User.findOne({_id: id}, (err, user) => {
  user.polls.create(req.body).then(({err, x}) => {
    console.log(x);
    res.json(x);
  })
})
