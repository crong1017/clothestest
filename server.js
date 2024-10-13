const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// 設定存儲位置和文件名稱
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 上傳文件存儲在 uploads 文件夾中
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // 文件名稱帶上時間戳防止重名
    }
});

// 設置文件上傳過濾及限制
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 文件大小限制為 5MB
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('僅支持圖片文件'));
        }
    }
});

// 允許 Express 處理靜態文件
app.use(express.static('public'));

// 上傳單個圖片
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.send(`文件上傳成功： ${req.file.path}`);
    } catch (err) {
        res.status(400).send('上傳失敗');
    }
});

// 啟動伺服器
app.listen(5000, () => {
    console.log('伺服器運行在 http://localhost:5000');
});
