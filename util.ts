export function median(values:any){
  if(values.length ===0) return 0;

  values.sort(function(a:any,b:any){
    return a-b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}
