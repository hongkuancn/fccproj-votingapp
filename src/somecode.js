componentWillReceiveProps(nextProps) {
  // will be true
  const locationChanged1 = nextProps.location !== this.props.location
  console.log(locationChanged1);
  // INCORRECT, will *always* be false because history is mutable.
  const locationChanged2 = nextProps.history.location !== this.props.history.location;
  console.log(locationChanged2);
}
