export function shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

export let findPermutations = (str: string) => {
  if (!str || typeof str !== "string"){
    return ["Please enter a string"]
  }

  if (!!str.length && str.length < 2 ){
    return [str]
  }

  var permutationsArray: string[] = []

  for (let i = 0; i < str.length; i++){
    let char = str[i]

    if (str.indexOf(char) !== i) {
        continue
    }

    let remainder = str.slice(0, i) + str.slice(i + 1, str.length)

    for (let permutation of findPermutations(remainder)){
      permutationsArray.push(char + permutation) }
  }
  return permutationsArray
}

export function filterString(str: string, filter: string): string {
  const json_string = JSON.stringify(str)

  let filterd_string = ""

  for (let i = 0; i < json_string.length; i++) {
    let char = json_string[i]
    let index = filter.indexOf(char)
    if (index > -1) {
      filterd_string += filter[index]
    }
  }

  return filterd_string
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}