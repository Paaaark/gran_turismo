export function findSubtotals(cars) {
  console.log("Started finding subtotals");
  if (cars == null) {
    return null;
  }
  console.log("car[0]: ", cars);
  const subTotals = {};
  Object.keys(cars[0]).forEach((key) => {
    subTotals[key] = {};
  });

  cars.forEach((car) => {
    Object.keys(car).forEach((key) => {
      if (subTotals[key] == null) {
      } else if (subTotals[key][car[key]] == null) {
        subTotals[key][car[key]] = 1;
      } else {
        subTotals[key][car[key]]++;
      }
    });
  });
  console.log("SubTotals: ", subTotals);
  return subTotals;
}

export function sliceData(data, page, perPage) {
  if (data != null) {
    const start = (page - 1) * perPage;
    return data.slice(start, start + perPage);
  }
  return null;
}
