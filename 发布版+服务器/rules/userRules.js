const joi = require('joi')

// 注册验证规则
exports.register = {
    body: {
        userId: joi.number().required(),
        // .pattern(/^[\s]{6,20}$/)
        password: joi.string().min(6).max(20).required(),//字符串，不包含空格，6-20位，必填项
        name: joi.string().required(),
        gender: joi.string().required(),
        // .pattern(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)
        phone: joi.required(),
    },
}

// 登录数据验证规则
exports.login = {
    body: {
        userId: joi.number().required(),
        // .pattern(/^[\s]{6,20}$/)
        password: joi.string().min(6).max(20).required(),//字符串，不包含空格，6-20位，必填项
    }
}
