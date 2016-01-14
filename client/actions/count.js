function increase(n) {
  return {
    type: 'INCREASE',
    amount: n
  };
}

function decrease(n) {
  return {
    type: 'DECREASE',
    amount: n
  };
}

module.exports = { increase, decrease };
