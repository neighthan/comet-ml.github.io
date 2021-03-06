// -*- mode: js; js-indent-level: 2; -*-

/*
 *
 * Some of the following functions are base on:
 * * https://github.com/agrueneberg/Spearson, Copyright (C) 2012 Alexander Grüneberg, MIT License
 */

/**
 * Calculates the sum of two variables.
 * @param {number} a number
 * @param {number} b number
 **/
function add(a, b) {
  return a + b;
}

/**
 * Calculates the absolute value of a number.
 * @param {number} a number
 **/
function abs(a) {
  if (a < 0)
    return -a;
  return a;
}

/**
 * Calculates the sum of an array.
 * @param {number} array Array of numbers.
 **/
function sum(array) {
  return array.reduce(add);
}

/**
 * Sorts an array of values.
 * @param {number} x Array of numbers.
 **/
function sort(x) {
  return x.sort(function(a, b) {
    return a - b;
  });
}

/**
 * Returns a number in exponential format.
 *
 * @param {number} number - the number to format
 *
 * @example
 *
 * > scientificNotation(0.00002)
 * "2.0000e-5"
 *
 */
function scientificNotation(number) {
  const parsedNumber = parseFloat(number);

  return ((parsedNumber <= 1e-3)
	  ? parsedNumber.toExponential(4)
	  : round(parsedNumber, 3));
}

/**
 * Rounds a number to n decimal places.
 * @param {number} x Number to round.
 * @param {number} n Number of decimal places.
 **/
function round(x, n) {
  n = typeof n === "number" ? n : 0;
  return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
}

/**
 * Finds the minimum of an array
 * @param {number} x Array of numbers.
 **/
function min(x) {
  let min = Infinity;
  x.map(function(xi) {
    if (xi < min) {
      min = xi;
    }
  });
  return min;
}

/**
 * Finds the maximum of an array
 * @param {number} x Array of numbers.
 **/
function max(x) {
  let max = -Infinity;
  x.map(function(xi) {
    if (xi > max) {
      max = xi;
    }
  });
  return max;
}

/**
 * Creates an array of values in given range
 * @param {number} start Start value.
 * @param {number} stop Stop value.
 * @param {number} step Step value.
 **/
function range(start, stop, step) {
  if (typeof stop === "undefined") {
    stop = start;
    start = 0.0;
  }
  if (typeof step === "undefined") {
    step = 1.0;
  }
  return Array.from(
    (function*() {
      let current = start;
      while (current < stop) {
        yield current;
        current += step;
      }
    })()
  );
}

/**
 * Finds the average (mean) of an array
 * @param {number} x Array of numbers.
 **/
function avg(x) {
  return sum(x) / x.length;
}


/**
 * Computes the transpose of a matrix
 * @param {Array} matrix the matrix to transpose
 **/
function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}


/**
 * Finds the deviation of an array
 * @param {number} x Array of numbers.
 **/
function deviation(x) {
  let xBar = avg(x);
  return x.map(function(xi) {
    return xi - xBar;
  });
}

/**
 * Calculates the variance of an array
 * @param {number} x Array of numbers.
 * @param {boolean} bias If true, the biased sample variance is used.
 **/
function variance(x, bias) {
  bias = typeof bias === "boolean" ? bias : false;
  return (
    sum(
      deviation(x).map(function(xi) {
        return Math.pow(xi, 2);
      })
    ) /
    (x.length - (bias === false ? 1 : 0))
  );
}

/**
 * Calculates the standard deviation of an array
 * @param {number} x Array of numbers.
 * @param {boolean} bias If true, the biased sample variance is used.
 **/
function standardDeviation(x, bias) {
  bias = typeof bias === "boolean" ? bias : false;
  return Math.sqrt(variance(x, bias));
}

/**
 * Calculates the standardize of an array
 * @param {number} x Array of numbers.
 **/
function standardize(x) {
  let sd = standardDeviation(x);
  return deviation(x).map(function(xi) {
    return xi / sd;
  });
}

/**
 * Calculates the rank of an array
 * @param {number} x Array of numbers.
 **/
function rank(x) {
  // Copy array.
  let ranks = x.slice();
  // Sort array.
  ranks = sort(ranks);
  // Calculate ranks.
  return x.map(function(xi) {
    let rank;
    // Handle tied ranks.
    let first = ranks.indexOf(xi);
    let last = ranks.lastIndexOf(xi);
    if (first === last) {
      rank = first;
    } else {
      rank = (first + last) / 2;
    }
    // Add 1 because ranks start with 1.
    return rank + 1;
  });
}

/**
 * Calculates the Pearson correlation coefficient for two variables.
 * @param {number} x Array of numbers.
 * @param {number} y Array of numbers.
 **/
function pearson(x, y) {
  x = standardize(x);
  y = standardize(y);
  return (
    sum(
      x.map(function(xi, i) {
        return xi * y[i];
      })
    ) /
    (x.length - 1)
  );
}

/**
 * Calculates the Spearman correlation coefficient for two variables.
 * @param {number} x Array of numbers.
 * @param {number} y Array of numbers.
 **/
function spearman(x, y) {
  let xDeviation, yDeviation;
  x = rank(x);
  y = rank(y);
  xDeviation = deviation(x);
  yDeviation = deviation(y);
  return (
    sum(
      xDeviation.map(function(xi, i) {
        return xi * yDeviation[i];
      })
    ) /
    Math.sqrt(
      sum(
        xDeviation.map(function(xi) {
          return Math.pow(xi, 2);
        })
      ) *
        sum(
          yDeviation.map(function(yi) {
            return Math.pow(yi, 2);
          })
        )
    )
  );
}

/**
 * Calculates the Euclidean distance of an array
 * @param {number} x Array of numbers.
 * @param {number} y Array of numbers.
 **/
function euclideanDistance(x, y) {
  return Math.sqrt(
    sum(
      x.map(function(xi, i) {
        return Math.pow(xi - y[i], 2);
      })
    )
  );
}

/**
 * Calculates the Manhattan (city) distance of an array
 * @param {number} x Array of numbers.
 * @param {number} y Array of numbers.
 **/
function manhattanDistance(x, y) {
  return sum(
    x.map(function(xi, i) {
      return Math.abs(xi - y[i]);
    })
  );
}

/**
 * Calculates the pairwise distance of an array
 * @param {number} x Array of array of numbers.
 * @param {function} distanceMetric Distance metric function
 **/
function pairwiseDistance(x, distanceMetric) {
  let pairwiseDistances, distance, i, j;
  pairwiseDistances = [];
  for (i = 0; i < x.length; i++) {
    pairwiseDistances[i] = [];
    for (j = 0; j <= i; j++) {
      if (i === j) {
        pairwiseDistances[i][j] = 0;
      } else {
        distance = distanceMetric(x[i], x[j]);
        pairwiseDistances[i][j] = distance;
        pairwiseDistances[j][i] = distance;
      }
    }
  }
  return pairwiseDistances;
}

/**
 * Computes a hierarchical clustering of a matrix
 * @param {number} pairwiseDistances Pairwise distance matrix.
 * @param {string} linkage Linkage criterion.
 * Inspired by Heather Arthur's clusterfck: https://github.com/harthur/clusterfck
 **/
function hierarchicalClustering(pairwiseDistances, linkage) {
  let clusters,
    minDistance,
    clusterA,
    clusterB,
    distance,
    distanceA,
    distanceB,
    candidates,
    mergedCluster,
    i,
    j;
  clusters = [];
  // Initialize one cluster per observation.
  for (i = 0; i < pairwiseDistances.length; i++) {
    clusters.push({
      label: i,
      key: i,
      index: i,
      size: 1
    });
  }
  while (true) {
    // Stop if all clusters have been merged into a single cluster.
    if (clusters.length === 1) {
      delete clusters[0].index;
      delete clusters[0].key;
      break;
    }
    // Find closest clusters.
    minDistance = Infinity;
    for (i = 0; i < clusters.length; i++) {
      clusterA = clusters[i];
      for (j = 0; j < clusters.length; j++) {
        if (i !== j) {
          clusterB = clusters[j];
          distance = pairwiseDistances[clusterA.key][clusterB.key];
          if (distance < minDistance) {
            minDistance = distance;
            candidates = [clusterA, clusterB];
          }
        }
      }
    }
    // Merge clusters.
    mergedCluster = {
      children: candidates,
      key: candidates[0].key,
      distance: minDistance,
      size: candidates[0].size + candidates[1].size
    };
    // Replace first cluster with merged cluster in list of clusters.
    clusters[candidates[0].index] = mergedCluster;
    // Remove second cluster from list of clusters.
    clusters.splice(candidates[1].index, 1);
    // Recompute distances from merged cluster to all other clusters.
    for (i = 0; i < clusters.length; i++) {
      if (clusters[i].key === candidates[0].key) {
        distance = 0;
      } else {
        distanceA = pairwiseDistances[candidates[0].key][clusters[i].key];
        distanceB = pairwiseDistances[candidates[1].key][clusters[i].key];
        switch (linkage) {
          case "single":
            if (distanceA < distanceB) {
              distance = distanceA;
            } else {
              distance = distanceB;
            }
            break;
          case "complete":
            if (distanceA > distanceB) {
              distance = distanceA;
            } else {
              distance = distanceB;
            }
            break;
          case "upgma":
            distance =
              (distanceA * candidates[0].size +
                distanceB * candidates[1].size) /
              (candidates[0].size + candidates[1].size);
            break;
        }
      }
      pairwiseDistances[candidates[0].key][clusters[i].key] = distance;
      pairwiseDistances[clusters[i].key][candidates[0].key] = distance;
    }
    // Remove column of second cluster from pairwise distance matrix.
    for (i = 0; i < pairwiseDistances.length; i++) {
      pairwiseDistances[i].splice(candidates[1].key, 1);
    }
    // Remove row of second cluster from pairwise distance matrix.
    pairwiseDistances.splice(candidates[1].key, 1);
    // Update keys of clusters to reflect removal of the column.
    for (i = candidates[1].key; i < clusters.length; i++) {
      clusters[i].key--;
    }
    // Remove obsolete key and index of merged clusters.
    delete candidates[0].key;
    delete candidates[0].index;
    delete candidates[1].key;
    delete candidates[1].index;
    // Reindex clusters.
    for (i = 0; i < clusters.length; i++) {
      clusters[i].index = i;
    }
  }
  return clusters;
}
