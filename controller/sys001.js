//e co cai mang nay
let userAndScore = [
    { id: 1 , name: 'Giáo Khảo 1', score : 0 },
    { id: 2 , name: 'Giáo Khảo 2', score : 0 },
    { id: 3 , name: 'Giáo Khảo 3', score : 0 },
    { id: 4 , name: 'Giáo Khảo 4', score : 0 },
];

let dimtrungbinh = 0;

const express = require('express');
const router = express.Router();

const tinhDTB = function(){
    var mau = 0;
    var tatol = 0;
    for (var i = 0, len = userAndScore.length; i < len; i++) {
        mau ++;
        if(userAndScore[i].score != 0)
        {
            tatol = tatol +  parseInt(userAndScore[i].score);
        }else{
            return 0;
        }
    }

    return tatol/mau;

}

module.exports = (app) => {
    //Cai nay la get cuar dien
    const get_sys_001 = (req, res) => {
        const model = {
            users: userAndScore,
            dtb : dimtrungbinh,
            title: 'SCORE'
        }

        res.render('sys_001', model)
    }

    const post_sys_001 = (req,res) => {
        const client_id = req.query.id;
        const score = req.query.score;
    
        for (var i = 0, len = userAndScore.length; i < len; i++) {
            if(userAndScore[i].id == client_id)
            {
                userAndScore[i].score = score;
                break;
            }
        }

        app.socket.emit('channel_01', {mess: 'Reload Page'});
        dimtrungbinh = tinhDTB();
        res.status(200).json({mess: 'OK'});
    }

    const reset_sys_001 = (req,res) => {
        for (var i = 0, len = userAndScore.length; i < len; i++) {
            userAndScore[i].score = 0;
            dimtrungbinh = 0;
        }
        app.socket.emit('channel_01', {mess: 'Reload Page'});
        res.status(200).json({mess: 'OK'});
    }

    router.get('', get_sys_001);
    router.post('', post_sys_001);
    router.delete('', reset_sys_001);

    return router;
}