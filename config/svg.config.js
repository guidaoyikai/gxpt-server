module.exports = {
    size: 4, // 验证码长度
    ignoreChars: '012oOiILl', // 验证码字符中排除 0o1i
    noise: 1, // 干扰线条的数量
    fontSize: 52,
    color: true, //开启文字颜色
    // background:"#000",//背景色
    width: 200,
    height: 80,
    time: 2*60,
}