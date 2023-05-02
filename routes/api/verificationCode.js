var express = require('express');
var router = express.Router();
const svgCaptcha = require('svg-captcha');
const config = require('../../config/svg.config');

//验证码
router.get('/verificationCode', (req, res) => {
    const svgImg = svgCaptcha.create(config.svg);
    
    res.status(200).json({
        svgImg:svgImg.data,
        text:svgImg.text,
    });
});


module.exports = router;
