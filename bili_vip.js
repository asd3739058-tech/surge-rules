// 获取服务器返回的原始响应体数据
let body = $response.body;
// 将 JSON 字符串转换为 JavaScript 可以操作的对象
let obj = JSON.parse(body);

// 检查数据结构是否存在，防止脚本报错导致App崩溃
if (obj && obj.data && obj.data.vip) {
    // 对应 jq 中的 .status == 0 (如果当前是普通用户)
    if (obj.data.vip.status === 0) {
        // 强行修改以下数据为大会员状态
        obj.data.vip.status = 1;
        obj.data.vip.type = 2;
        obj.data.vip.due_date = 9005270400000; // 2255年到期
        obj.data.vip.role = 15;
    }
}

// 把修改后的对象重新转回字符串，并交还给 Surge，Surge 会把它发给 B 站 App
$done({ body: JSON.stringify(obj) });
