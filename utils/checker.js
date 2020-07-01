/**
数据验证（表单验证）
来自 grace.hcoder.net 
作者 hcoder 深海
*/
import { validator } from './validator.js';
// import { parsePhoneNumberFromString as phoneAuth } from 'libphonenumber-js'
const checker = {
	error: '',
	checkType: {
		'reg': function(data, rule) {
			var reg = new RegExp(rule.checkRule);
			if (!reg.test(data)) {
				return false;
			}
			return true;

		},
		'required': function(data, rule) {
			if (validator.isEmpty(data)) {
				return false;
			}
			return true;

		},
		'string': function(data, rule) {
			var reg = new RegExp('^.{' + rule.checkRule + '}$');
			if (!reg.test(data)) {
				return false;
			}
			return true;
		},
		'int': function(data, rule) {
			var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule.checkRule + '}$');
			if (!reg.test(data)) {
				return false;
			}
			return true;

		},
		'rangeLength': function(data, rule) {
			let minMax = rule.checkRule.split(',');
			return validator.isLenRange(data, minMax);
		},
		'between': function(data, rule) {
			if (!validator.isNumber(data)) {
				return false;
			}
			let minMax = rule.checkRule.split(',');
			let temp = Number(data);
			minMax[0] = Number(minMax[0]);
			minMax[1] = Number(minMax[1]);
			if (temp > minMax[1] || temp < minMax[0]) {
				return false;
			}
			return true;

		},
		'betweenD': function(data, rule) {
			var reg = /^-?[1-9][0-9]?$/;
			if (!reg.test(data)) {
				return false;
			}
			var minMax = rule.checkRule.split(',');
			minMax[0] = Number(minMax[0]);
			minMax[1] = Number(minMax[1]);
			if (data > minMax[1] || data < minMax[0]) {
				return false;
			}
			return true;

		},
		'betweenF': function(data, rule) {
			var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
			if (!reg.test(data)) {
				return false;
			}
			var minMax = rule.checkRule.split(',');
			minMax[0] = Number(minMax[0]);
			minMax[1] = Number(minMax[1]);
			if (data > minMax[1] || data < minMax[0]) {
				return false;
			}
			return true;

		},
		'same': function(data, rule) {
			if (data != rule.checkRule) {
				return false;
			}
			return true;
		},
		'notsame': function(data, rule) {
			if (data == rule.checkRule) {
				return false;
			}
			return true;

		},
		'email': function(data, rule) {
			if (!validator.isEmail(data)) {
				return false;
			}
			return true;

		},
		'phone': function(data, rule) {
			if (!validator.isMobile(data)) {
				return false;
			}
			return true;

		},
		// 'phoneAll': function(data, rule) {
		// 	return phoneAuth(data).isValid()
		// },
		'idCard': function(data, rule) {
			if (!validator.isIdCard(data)) {
				return false;
			}
			return true;
		},
		'userName': function(data, rule) {
			if (!validator.isUserName(data)) {
				return false;
			}
			return true;
		},
		'authCode': function(data, rule) {
			if (!validator.isAuthCode(data)) {
				return false;
			}
			return true;
		},
		'password': function(data, rule) {
			if (!validator.isPassword(data)) {
				return false;
			}
			return true;
		},
		'payPassword': function(data, rule) {
			var reg = /^[0-9]{6}$/;
			if (!reg.test(data)) {
				return false;
			}
			return true;
		},
		'in': function(data, rule) {
			if (rule.checkRule.indexOf(data) == -1) {
				return false;
			}
			return true;

		},
		'notnull': function(data, rule) {
			if (data == null || data.length < 1) {
				return false;
			}
			return true;
		},
		'eth': function(data, rule) {
			var reg = /^(0x)?[0-9a-fA-F]{40}$/;
			return reg.test(data);
		},
	},
	check: function(data, rule) {
		for (var i = 0; i < rule.length; i++) {
			if (!rule[i].checkType) {
				return true;
			}
			if (!rule[i].name) {
				return true;
			}
			if (!rule[i].errorMsg) {
				return true;
			}

			if (Object.keys(data).includes(rule[i].name)) {
				let checkType = this.checkType[rule[i].checkType]
				if (!checkType(data[rule[i].name], rule[i])) {
					checker.error = rule[i].errorMsg;
					return false;
				}
			}

		}
		return true;
	}
}

export default checker
