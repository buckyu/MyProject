var outModule = {};
var local = {};
var MysqlTool = require('../../../MysqlTool/MysqlTool');
var GlobalData = require('../../../GlobalData');

outModule.changeDevice = (req, res) => {
    //判断session
    if (!req.session || !req.session.userData) {
        res.send(JSON.stringify({
            ret: -2,
            errorStr: '请登录'
        }));
        res.end();
        return;
    }
    //判断修改权限
    let userType = req.session.userData.type;
    if (userType !== GlobalData.USER_TYPE_SUPER && userType !== GlobalData.USER_TYPE_CUSTOMER_MANAGER) {
        res.send(JSON.stringify({
            ret: -1,
            errorStr: '没有权限'
        }));
        res.end();
        return;
    }
    let data = req.body;
    let connection = MysqlTool.getMysqlObjByDBName('test');
    connection.query(`SELECT * FROM device WHERE deviceId='${data.deviceId}'`, function(err, rows, field) {
        if (err) {
            console.log(`SELECT * FROM device WHERE deviceId='${data.deviceId}'`);
            console.log(err);
            res.send(JSON.stringify({
                ret: -1,
                errorStr: '数据库错误'
            }));
            res.end();
        } else if (rows.length === 0) {
            res.send(JSON.stringify({
                ret: -1,
                errorStr: '设备id错误'
            }));
            res.end();
        } else {
            let connection = MysqlTool.getMysqlObjByDBName('test');
            let mysqlStr;
            if (userType === GlobalData.USER_TYPE_SUPER) {
                mysqlStr = `UPDATE device SET user_name='${data.user_name}', user_pos='${data.user_pos}' WHERE deviceId='${data.deviceId}'`;
            }
            connection.query(mysqlStr, function(err, rows, field) {
                if (err) {
                    console.log(mysqlStr);
                    console.log(err);
                    res.send(JSON.stringify({
                        ret: -1,
                        errorStr: '数据库错误'
                    }));
                    res.end();
                } else {
                    res.send(JSON.stringify({
                        ret: 1,
                        successStr: '修改设备信息成功'
                    }));
                    res.end();
                }
            });
        }
    });
};

module.exports = outModule;