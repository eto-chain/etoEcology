// 字符串的下划线格式转驼峰格式，eg：hello_world => helloWorld
const underline2Hump = (s) => {
	return s.replace(/_(\w)/g, (all, letter) => {
		return letter.toUpperCase()
	})
}

// 字符串的驼峰格式转下划线格式，eg：helloWorld => hello_world
const hump2Underline = (s) => {
	return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// JSON对象的key值转换为驼峰式
const jsonToHump = (obj) => {
	if (obj instanceof Array) {
		obj.forEach(function(v, i) {
			jsonToHump(v)
		})
	} else if (obj instanceof Object) {
		Object.keys(obj).forEach(function(key) {
			var newKey = underline2Hump(key)
			if (newKey !== key) {
				obj[newKey] = obj[key]
				delete obj[key]
			}
			jsonToHump(obj[newKey])
		})
	}
}

// JSON对象的key值转换为下划线格式
const jsonToUnderline = (obj) => {
	if (obj instanceof Array) {
		obj.forEach(function(v, i) {
			jsonToUnderline(v)
		})
	} else if (obj instanceof Object) {
		Object.keys(obj).forEach(function(key) {
			var newKey = hump2Underline(key)
			if (newKey !== key) {
				obj[newKey] = obj[key]
				delete obj[key]
			}
			jsonToUnderline(obj[newKey])
		})
	}
}

export {
	underline2Hump,
	hump2Underline,
	jsonToHump,
	jsonToUnderline
}
