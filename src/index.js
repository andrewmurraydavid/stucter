const faker = require('faker');

generateRandomNumberInRange = (integer, min, max) => {
  if (!integer && (min && max))
    return Math.random() * (max - min) + min;
  if (integer && (min && max)) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 0;
}

generateRandomNumber = (integer, max) => {
  if (!integer && max)
    return Math.random() * max;
  if (integer && max) {
    return Math.floor(Math.random() * max);
  }
  if (!integer)
    return Math.random();
  return Math.floor(Math.random());
}

const generateForNumbers = node => {
  if (node.range) {
    const { min, max } = node.range;
    return generateRandomNumberInRange(node.integer, min, max);
  }
  else if (node.max) {
    return generateRandomNumber(node.integer, node.max);
  }
  else return generateRandomNumber(node.integer);
}

const generatePerKey = (key, node) => {
  switch (node.type) {
    case 'number': {
      if (node.value)
        return node.value
      return generateForNumbers(node);
    }
    case 'string': {
      if (node.value)
        return node.value
      return null;
    }
    case 'faked': {
      return faker.fake(node.value);
    }
  }

}

const goThroughKeys = obj => {
  Object.keys(obj).forEach(key => {
    obj[key] = generatePerKey(key, obj[key]);
  });
  return obj;
}

const generate = obj => {
  return goThroughKeys(obj);
}

module.exports.generate = generate;