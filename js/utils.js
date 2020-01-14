function copy(obj) {
  if (!obj || true == obj)
    return obj;
  let objType = typeof obj;
  // Add additional immutables here:
  if ("number" == objType || "string" == objType)
    return obj;
  let result = Array.isArray(obj)
    ? []
    : !obj.constructor
    ? {}
    : new obj.constructor();
  if (obj instanceof Map)
    for (var key of obj.keys()) result.set(key, copy(obj.get(key)));
  for (var key in obj)
    if (obj.hasOwnProperty(key)) result[key] = copy(obj[key]);
  return result;
}

function compare(field, reverse = false) {
  return function(a, b) {
    let nameA = a[field];
    let nameB = b[field];
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      nameA = a[field].toUpperCase();
      nameB = b[field].toUpperCase();
    } else if (typeof a[field] !== typeof b[field]) {
      nameA = typeof a[field];
      nameB = typeof b[field];
    }
    let result = 0;
    if (nameA < nameB) {
      result = -1;
    } else if (nameA > nameB) {
      result = 1;
    }
    if (reverse) result = result * -1;
    return result;
  };
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function title(string) {
  return string.replace(/(^\w{1})|(\s{1}\w{1})/g,
                        match => match.toUpperCase());
}