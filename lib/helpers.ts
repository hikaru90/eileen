export const groupBy = (collection, property) => {
  var i = 0,
    val,
    index,
    values = [],
    result = [];
  for (; i < collection.length; i++) {
    val = collection[i][property];
    index = values.indexOf(val);
    if (index > -1) result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }
  return result;
};

export const sortBy = (collection, property) => {
  return collection.sort((a, b) => (a[property] > b[property]) ? 1 : -1)
}

export const waitForDOM = (idOfElement, callback, maxAttempts = 10, interval = 400) => {
  if(process.client){

    let attempt = 0;
    const checkDOM = () => {
      const dom = document.getElementById(idOfElement);
      if (dom) {
        callback();
      } else if (attempt < maxAttempts) {
        attempt++;
        setTimeout(checkDOM, interval);
      } else {
        console.error(`Element with ID ${idOfElement} not found after ${maxAttempts} attempts.`);
      }
    };
    checkDOM();
  }
};