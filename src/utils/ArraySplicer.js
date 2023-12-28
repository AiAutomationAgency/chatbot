export default function ArraySplicer(arr, chunkSize) {
  var dividedArrays = [];
  for (var i = 0; i < arr.length; i += chunkSize) {
    var chunk = arr.slice(i, i + chunkSize);
    dividedArrays.push(chunk);
  }
  return dividedArrays;
}
