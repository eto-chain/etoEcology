function pluralize(time, label) {
	if (time === 1) {
		return time + label
	}
	return time + label + 's'
}

export function timeAgo(time) {
	const between = Date.now() / 1000 - Number(time)
	if (between < 3600) {
		return pluralize(~~(between / 60), ' minute')
	} else if (between < 86400) {
		return pluralize(~~(between / 3600), ' hour')
	} else {
		return pluralize(~~(between / 86400), ' day')
	}
}

export function parseTime(time, cFormat) {
	if (arguments.length === 0) {
		return null
	}

	if ((time + '').length === 10) {
		time = +time * 1000
	}

	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		date = new Date(parseInt(time))
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		if (key === 'a') {
			return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return timeStr
}

export function formatTime(time, option) {
	time = +time * 1000
	const d = new Date(time)
	const now = Date.now()

	const diff = (now - d) / 1000

	if (diff < 30) {
		return '刚刚'
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < 3600 * 24 * 2) {
		return '1天前'
	}
	if (option) {
		return parseTime(time, option)
	} else {
		return (
			d.getMonth() +
			1 +
			'月' +
			d.getDate() +
			'日' +
			d.getHours() +
			'时' +
			d.getMinutes() +
			'分'
		)
	}
}

export function formatTimeDefault(time) {
	return parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
}

/* 数字 格式化 */
export function nFormatter(num, digits = 2) {
	const si = [
		{ value: 1e18, symbol: 'E' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e9, symbol: 'G' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e3, symbol: 'k' }
  ]
	for (let i = 0; i < si.length; i++) {
		if (num >= si[i].value) {
			return (
				// (num / si[i].value + 0.1)
				(num / si[i].value)
				.toFixed(digits)
				.replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
			)
		}
	}
	// return num.toString()
	return Number(num).toFixed(digits)
}

export function toFixed(val, digits = 2) {
	return parseFloat(val).toFixed(digits)
}

export function replaceStar(str) {
	return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
export function replaceStarBank(str) {
	return str.replace(/\d+(\d{4})/, '**** **** **** $1')
}
