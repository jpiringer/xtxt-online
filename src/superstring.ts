import * as utils from "./utils"

let superstring = {
	shuffle(txt: string) {
		let arr = txt.split("")
		utils.shuffleArray(arr)
		return arr.join("")
	},

	sort(txt: string) {
		return txt.split("").sort().join("")
	},

	reverse(txt: string) {
		return txt.split("").reverse().join("")
	},

	duplicate(txt: string) {
		return txt+txt
	},

	rip(txt: string) {
		var str = ""
		let sz = txt.length

		for (var cnt = 0; cnt < sz;) {
			let c = txt[cnt]

			if (c !== '\n' && c !== '\r') {
				switch(utils.getRandomInt(7)) {
				case 1:
					str += c
					// eslint-disable-next-line no-fallthrough
				case 2:
					var c2 = txt[cnt%sz]
					if (c2 !== '\n' && c2 !== '\n') {
						str += c2
					}
				// eslint-disable-next-line no-fallthrough
				default:
					str += c
					cnt++
					break
				}
			}
			else {
				str += c
				cnt++
			}
		}
		return str
	},

	noise(txt: string) {
		const noiseChars = ",.-;:_#+*!$%&/()=?^°<>~";
		var str = "";
		var counter = 0;
		var segmentLen = utils.getRandomInt(8);

		for (var i = 0; i < txt.length; i++) {
			str += txt[i];
			if (counter >= segmentLen) {
				segmentLen = utils.getRandomInt(10);
				str += noiseChars[utils.getRandomInt(noiseChars.length)];
				counter = 0;
			}
			counter++;
		}
		return str;
	},

	part(txt: string) {
		var str = ""
		var counter = 0
		var segmentLen = utils.getRandomInt(8)

		for (var i = 0; i < txt.length; i++) {
			str += txt[i]
			if (counter >= segmentLen) {
				segmentLen = utils.getRandomInt(10)
				str += " "
				counter = 0
			}
			counter++
			}
		return str
	},

	split(txt: string) {
		return txt.split("").join(" ")
  },

	condense(txt: string) {
    return txt.replace(/\s+/g, " ")
  },
		
	stretch(txt: string) {
		const stretchable = "aefhilmnorsuyzäöüAEFHILMNORSUYZÄÖÜ"
		var str = ""

		for (var i = 0; i < txt.length; i++) {
			str += txt[i]
			if (stretchable.indexOf(txt[i]) >= 0) {
				str += txt[i]
			}
		}
		return str
	},

	vowelsOnly(txt: string) {
		return utils.filterString(txt, "aeiouäöüyáàóòíìAEIOUÄÖÜÁÀÓÒY ")
  },

	consOnly(txt: string) {
		return utils.filterString(txt, "bcdfghjklmnpqrstvwxzñßBCDFGHJKLMNPQRSTVWXZÑ ")
  },

	permutate(txt: string) {
		if (txt.length <= 0) {
			return "";
		}
		if (txt.length > 8) {
			return "input text is too long. should not be longer than 8 characters!";
		}
		else {
			return utils.findPermutations(txt).join(" ");
		}
  }
}

export default superstring

