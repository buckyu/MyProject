import { MyGame } from "../System/Game";


//所有的已经用过的人名
let allNameArr: string[] = [];

//姓的列表
const SURNAME_ARR: string[] = ['安', '柏', '鲍', '毕', '曹', '岑', '昌', '常', '丁', '酆', '傅', '郝', '赫', '华', '姜', '解', '雷', '廉', '吕', '马', '聂', '潘', '彭', '史', '汤', '陶', '滕', '邬', '许', '严', '应', '杭', '喻', '李', '仇', '卢', '项', '江', '万', '堪', '黎', '席', '经', '车', '贾', '裘', '费', '祁', '屈', '纪', '鄂', '田', '尹', '阎', '蔡', '粱', '罗', '咎', '夏', '禹', '高', '管', '穆', '汪', '骆', '周', '袁', '姚', '由', '吴', '钮', '惠', '刘', '甄', '荀', '张', '孟', '於', '俞', '景', '石', '吉', '薛', '符', '包', '羊', '宓', '程', '荣', '詹', '家', '崔', '封', '钱', '洪', '左', '贺', '邵', '邢', '燕', '鹿', '韩', '戚', '范', '冯', '谢', '施', '任', '段', '魏', '鲁', '裴', '卫', '沈', '陆', '邹', '苏', '王', '孔', '翟', '秦', '何', '韦', '卓', '蒋', '窦', '苗', '郑', '陈', '翁', '牧', '贲', '孙', '牟', '郁', '颜', '闵', '莫', '庞', '樊', '蔺', '嵇', '邱', '向', '楼', '缪', '龚', '温', '褚', '柯', '宋', '徐', '虞', '韶', '郜', '宗', '凌', '郦', '霍', '宣', '狄', '卜', '元', '单', '邓', '白', '慕', '巫', '廖', '沙', '武', '仲', '柳', '唐', '叶', '方', '连', '宁', '祖', '齐', '阮', '童', '浑', '秋', '尤', '于', '章', '支', '朱', '诸', '顾', '房', '董', '余', '侯', '宫', '伍', '杨', '赵', '乔', '佟', '萧', '占', '干', '雍', '糜', '全', '葛', '苻', '权', '祝', '皮', '庾', '曲', '赖', '瞿', '牛', '资', '公冶', '伯赏', '轩辕', '长孙', '司马', '鲜于', '欧阳', '司空', '单于', '夏侯', '上官', '皇甫', '南宫', '诸葛', '巫马', '阳佟', '太叔', '东方', '尉迟', '呼延', '慕容', '宇文', '淳于', '子车', '闾丘', '东郭', '归海', '赫连', '乐正', '濮阳', '西门', '百里', '司徒', '令狐', '左丘', '公西', '谷粱', '拓跋', '北堂', '端木', '东陵', '白马', '北宫', '北冥', '公输', '公羊', '歌舒', '公孙', '贺兰', '即墨', '万俟', '第五', '澹台', '南门', '墨夷', '破丑', '青阳', '申屠', '司寇', '太史', '闻人', '乐羊', '子言', '钟离', '左师'];

const MAN_NAME_ARR: string[] = ['之玉', '越泽', '锦程', '修杰', '烨伟', '尔曼', '立辉', '致远', '天思', '友绿', '聪健', '修洁', '初彤', '源智', '烨华', '振家', '越彬', '乞', '子轩', '伟宸', '晋鹏', '觅松', '海亦', '戾', '嵩', '邑', '瑛', '鸿', '卿', '裘', '契', '涛', '疾', '驳', '凛', '逊', '鹰', '威', '紊', '阁', '康', '焱', '城', '誉', '祥', '虔', '胜', '穆', '豁', '匪', '霆', '凡', '枫', '豪', '铭', '罡', '扬', '垣', '师', '翼', '秋', '傥', '雨珍', '浩宇', '嘉熙', '志泽', '苑博', '念波', '峻熙', '俊驰', '聪展', '南松', '问旋', '黎昕', '谷波', '凝海', '靖易', '渊思', '煜祺', '箴', '睿渊', '博超', '天磊', '夜白', '初晴', '雍', '达', '乾', '鑫', '萧', '鲂', '冥', '翰', '丑', '隶', '钧', '坤', '荆', '蹇', '骁', '沅', '剑', '勒', '筮', '磬', '戎', '翎', '函', '嚣', '炳', '耷', '惮', '鞯', '擎', '烙', '靖', '遥', '斩', '颤', '孱', '续', '岩', '奄', '秋白', '鹏飞', '弘文', '伟泽', '迎松', '雨泽', '鹏笑', '诗云', '白易', '远航', '笑白', '映波', '晓啸', '智宸', '晓博', '靖琪', '君浩', '绍辉', '冷安', '博', '鹤', '绯', '奎', '仰', '霸', '乌', '邴', '败', '捕', '糜', '汲', '涔', '班', '臻', '栾', '井', '伊', '储', '羿', '富', '稀', '松', '寇', '珩', '靳', '鞅', '弼', '焦', '天德', '半山', '一江', '冰安', '皓轩', '子默', '熠彤', '青寒', '烨磊', '飞风', '问筠', '旭尧', '平文', '冷之', '尔阳', '天宇', '正豪', '文博', '明辉', '哲瀚', '子骞', '泽洋', '灵竹', '幼旋', '高烽', '伟帮', '连虎', '十三', '酬海', '天川', '一德', '复天', '傀斗', '定帮', '自中', '开山', '百川', '连碧', '擎苍', '思远', '嘉懿', '鸿煊', '笑天', '晟睿', '强炫', '寄灵', '听白', '鸿涛', '孤风', '青文', '浩然', '明杰', '昊焱', '伟诚', '剑通', '鹏涛', '鑫磊', '醉薇', '尔蓝', '靖仇', '成风', '豪英', '德地', '成协', '人达', '亿先', '忘幽', '世德', '世平', '广山', '德天', '不言', '难摧', '世立', '若之', '成危', '元龙', '成仁', '若剑', '难敌', '浩阑', '士晋', '铸海', '伯云', '南风', '擎宇', '浩轩', '煜城', '博涛', '问安', '烨霖', '天佑', '书芹', '半雪', '伟祺', '从安', '寻菡', '秋寒', '谷槐', '文轩', '立诚', '立果', '明轩', '楷瑞', '炎彬', '鹏煊', '幼南', '沛山', '不尤', '千筹', '广缘', '天奇', '道罡', '远望', '乘风', '道之', '乘云', '绝施', '天抒', '剑成', '士萧', '文龙', '一鸣', '远锋', '远山', '醉山', '语堂', '懿轩', '雅阳', '鑫鹏', '文昊', '松思', '水云', '山柳', '荣轩', '绮彤', '沛白', '慕蕊', '觅云', '鹭洋', '立轩', '金鑫', '健柏', '建辉', '鹤轩', '昊强', '凡梦', '代丝', '一笑', '婴', '雁'];

const WOMAN_NAME_ARR: string[] = ['醉易', '紫萱', '紫霜', '紫南', '紫菱', '紫蓝', '紫翠', '紫安', '姿', '芷天', '芷容', '芷巧', '芷卉', '芷荷', '芷', '芝', '之桃', '筝', '真', '珍', '贞', '元霜', '元绿', '元槐', '元枫', '语雪', '语山', '语蓉', '语琴', '语海', '语芙', '语儿', '语蝶', '雨雪', '雨文', '雨梅', '雨莲', '雨兰', '幼丝', '幼枫', '又菡', '友梅', '友儿', '映萱', '映安', '迎梦', '迎波', '婴', '易巧', '亦丝', '亦巧', '忆雪', '忆文', '忆梅', '忆枫', '以丹', '依丝', '夜玉', '夜梦', '夜春', '雁荷', '雁风', '雅彤', '雅琴', '寻梅', '寻冬', '雪珍', '雪瑶', '雪旋', '雪卉', '秀', '笑旋', '笑蓝', '笑翠', '晓亦', '晓夏', '向梦', '香萱', '香岚', '夏真', '夏山', '夏兰', '惜雪', '惜蕊', '惜灵', '问夏', '问蕊', '问梅', '雯', '纹', '菀', '莞', '宛', '桐', '彤', '听筠', '听枫', '天曼', '愫', '素', '涑', '思松', '思菱', '水瑶', '水彤', '姝', '书竹', '书易', '诗桃', '诗双', '诗珊', '诗蕊', '山菡', '山蝶', '弱', '若雁', '若菱', '若', '如风', '如冬', '如波', '蓉', '秋柔', '清', '青雪', '青曼', '青', '巧蕊', '千亦', '千柔', '千柳', '绮琴', '绮梅', '莆', '萍', '平萱', '平露', '颦', '沛儿', '盼烟', '凝雁', '凝安', '念之', '念柏', '茗', '敏', '妙之', '妙梦', '妙柏', '娩', '梦之', '梦桃', '梦琪', '梦露', '梦凡', '曼容', '曼荷', '曼寒', '曼安', '绿真', '凌文', '凌青', '凌波', '怜阳', '怜珊', '冷雪', '冷荷', '乐萱', '乐天', '乐松', '乐枫', '斓', '澜', '蓝', '兰', '静芙', '靖柏', '寄真', '寄文', '寄琴', '惠', '荟', '幻天', '幻珊', '寒天', '寒凝', '寒梦', '寒荷', '涵易', '涵菱', '含玉', '含烟', '含灵', '含蕾', '海云', '海冬', '涫', '谷蕊', '谷兰', '飞珍', '飞槐', '访云', '访烟', '访天', '访风', '凡阳', '凡旋', '凡梅', '凡灵', '凡蕾', '尔丝', '尔柳', '尔芙', '尔白', '孤菱', '沛萍', '梦柏', '从阳', '绿海', '白梅', '秋烟', '访旋', '元珊', '凌旋', '依珊', '寻凝', '幻柏', '雨寒', '寒安', '芙', '怀绿', '书琴', '水香', '向彤', '曼冬', '璎', '姒', '苠', '淇', '绮', '怜梦', '安珊', '映阳', '思天', '初珍', '冷珍', '海安', '从彤', '灵珊', '夏彤', '映菡', '青筠', '易真', '幼荷', '冷霜', '凝旋', '夜柳', '紫文', '凡桃', '醉蝶', '从云', '冰萍', '小萱', '白筠', '依云', '元柏', '丹烟', '雁', '念云', '易蓉', '青易', '友卉', '若山', '涵柳', '映菱', '依凝', '怜南', '水儿', '从筠', '千秋', '代芙', '之卉', '幻丝', '书瑶', '雪珊', '海之', '寄云', '盼海', '谷梦', '襄', '雁兰', '晓灵', '向珊', '宛筠', '笑南', '梦容', '寄柔', '静枫', '尔容', '沛蓝', '宛海', '迎彤', '梦易', '惜海', '灵阳', '念寒', '紫', '芯', '沂', '衣', '荠', '莺', '萤', '采梦', '夜绿', '又亦', '怡', '苡', '悒', '梦山', '醉波', '慕晴', '安彤', '荧', '半烟', '翠桃', '书蝶', '寻云', '冰绿', '山雁', '南莲', '夜梅', '翠阳', '芷文', '茈', '南露', '向真', '又晴', '香', '又蓝', '绫', '灵', '雅旋', '千儿', '玲', '听安', '凌蝶', '向露', '从凝', '雨双', '依白', '樱', '颜', '以筠', '含巧', '艳', '晓瑶', '忆山', '以莲', '冰海', '盼芙', '冰珍', '颖', '盈', '半双', '以冬', '千凝', '琦', '笑阳', '香菱', '友蕊', '若云', '天晴', '笑珊', '凡霜', '南珍', '晓霜', '芷云', '谷芹', '芷蝶', '雨柏', '之云', '靖巧', '寄翠', '涵菡', '雁卉', '涵山', '念薇', '忻', '芸', '笙', '芳', '绮兰', '迎蕾', '秋荷', '代天', '采波', '丝', '诗兰', '谷丝', '凝琴', '凝芙', '尔风', '觅双', '忆灵', '水蓝', '书蕾', '访枫', '涵双', '初阳', '从梦', '凝天', '秋灵', '湘', '笑槐', '灵凡', '冰夏', '听露', '翠容', '绮晴', '静柏', '天亦', '冷玉', '以亦', '盼曼', '乐蕊', '凡柔', '曼凝', '沛柔', '迎蓉', '映真', '采文', '曼文', '新筠', '碧玉', '秋柳', '白莲', '亦玉', '幻波', '忆之', '孤丝', '妙竹', '傲柏', '元风', '易烟', '怀蕊', '萃', '寻桃', '映之', '小玉', '尔槐', '翠', '萝', '听荷', '赛君', '闭月', '不愁', '羞花', '紫寒', '夏之', '飞薇', '如松', '白安', '秋翠', '夜蓉', '傲晴', '凝丹', '凌瑶', '初曼', '夜安', '安荷', '青柏', '向松', '绿旋', '芷珍', '凌晴', '新儿', '亦绿', '雁丝', '惜霜', '紫青', '冰双', '映冬', '代萱', '梦旋', '毒娘', '紫萍', '冰真', '幻翠', '向秋', '海蓝', '凌兰', '如柏', '千山', '半凡', '雁芙', '白秋', '平松', '代梅', '香之', '梦寒', '小蕊', '慕卉', '映梦', '绿蝶', '芹', '凌翠', '夜蕾', '含双', '慕灵', '碧琴', '夏旋', '冷雁', '乐双', '念梦', '静丹', '之柔', '新瑶', '亦旋', '雪巧', '中蓝', '莹芝', '一兰', '清涟', '竺', '洙', '凝莲', '雪莲', '依琴', '绣连', '友灵', '醉柳', '秋双', '珠', '绮波', '寄瑶', '冰蝶', '半梅', '友菱', '飞双', '醉冬', '沛容', '南晴', '紫易', '从蓉', '友易', '衫', '尔竹', '莛', '琳', '巧荷', '寻双', '珊', '芷雪', '又夏', '梦玉', '安梦', '凝荷', '凤', '外绣', '忆曼', '不平', '凝蝶', '以寒', '安南', '思山', '嫣', '芫', '若翠', '曼青', '小珍', '青荷', '代容', '孤云', '慕青', '寄凡', '元容', '丹琴', '寒珊', '飞雪', '妙芙', '碧凡', '思柔', '雁桃', '丹南', '雁菡', '翠丝', '幻梅', '海莲', '宛秋', '问枫', '靖雁', '蛟凤', '傻姑', '金连', '梦安', '碧曼', '代珊', '惜珊', '元冬', '葶', '芮', '青梦', '书南', '绮山', '白桃', '从波', '访冬', '含卉', '平蝶', '海秋', '沛珊', '沁', '飞兰', '凝云', '亦竹', '梦岚', '寒凡', '傲柔', '凌丝', '觅风', '平彤', '念露', '翠彤', '秋玲', '安蕾', '若蕊', '灵萱', '含雁', '思真', '盼山', '香薇', '碧萱', '夏柳', '白风', '安双', '凌萱', '盼夏', '幻巧', '怜寒', '傲儿', '冰枫', '如萱', '妖丽', '元芹', '涵阳', '涵蕾', '以旋', '高丽', '灭男', '代玉', '可仁', '可兰', '可愁', '可燕', '妙彤', '易槐', '小凝', '妙晴', '冰薇', '涵柏', '语兰', '小蕾', '忆翠', '听云', '觅海', '静竹', '初蓝', '迎丝', '幻香', '含芙', '夏波', '冰香', '凌香', '妙菱', '访彤', '凡雁', '紫真', '书双', '问晴', '惜萱', '白萱', '靖柔', '凡白', '晓曼', '曼岚', '雁菱', '雨安', '谷菱', '夏烟', '问儿', '青亦', '夏槐', '含蕊', '迎南', '又琴', '冷松', '安雁', '飞荷', '踏歌', '秋莲', '盼波', '以蕊', '盼兰', '之槐', '飞柏', '孤容', '白玉', '傲南', '山芙', '夏青', '雁山', '曼梅', '如霜', '沛芹', '丹萱', '翠霜', '玉兰', '汝燕', '不乐', '不悔', '可冥', '若男', '素阴', '元彤', '从丹', '曼彤', '惋庭', '起眸', '香芦', '绿竹', '雨真', '乐巧', '亚男', '小之', '如曼', '山槐', '谷蓝', '笑容', '香露', '白薇', '凝丝', '雨筠', '秋尽', '婷冉', '冰凡', '亦云', '芙蓉', '天蓝', '沉鱼', '东蒽', '飞丹', '涵瑶', '雁开', '以松', '南烟', '傲霜', '香旋', '觅荷', '幼珊', '无色', '凤灵', '新竹', '半莲', '媚颜', '紫雪', '寒香', '幼晴', '宛菡', '采珊', '凝蕊', '无颜', '莫言', '初兰', '冷菱', '妙旋', '梨愁', '友琴', '水蓉', '尔岚', '怜蕾', '怀蕾', '惜天', '谷南', '雪兰', '语柳', '夏菡', '巧凡', '映雁', '之双', '梦芝', '傲白', '觅翠', '如凡', '傲蕾', '傲旋', '以柳', '从寒', '双双', '无春', '紫烟', '飞凤', '紫丝', '思卉', '初雪', '向薇', '落雁', '凡英', '海菡', '白晴', '映天', '静白', '雨旋', '安卉', '依柔', '半兰', '灵雁', '雅蕊', '初丹', '寒云', '念烟', '代男', '笑卉', '曼云', '飞莲', '幻竹', '晓绿', '语薇', '芷蕾', '谷冬', '血茗', '天荷', '问丝', '沛凝', '翠绿', '寒松', '思烟', '雅寒', '以南', '碧蓉', '绮南', '白凡', '安莲', '访卉', '元瑶', '水风', '凡松', '友容', '访蕊', '若南', '涵雁', '雪一', '怀寒', '幻莲', '碧菡', '绿蕊', '如雪', '珊珊', '念珍', '莫英', '朝雪', '茹嫣', '曼易', '宛亦', '映寒', '谷秋', '诗槐', '如之', '水桃', '又菱', '迎夏', '幻灵', '初夏', '晓槐', '代柔', '忆安', '迎梅', '夜云', '傲安', '雨琴', '听芹', '依玉', '冬寒', '绿柏', '梦秋', '千青', '念桃', '苑睐', '夏蓉', '诗蕾', '友安', '寻菱', '绮烟', '若枫', '凝竹', '听莲', '依波', '飞松', '依秋', '绿柳', '元菱', '念芹', '如彤', '香彤', '涵梅', '映容', '平安', '赛凤', '书桃', '梦松', '以云', '映易', '小夏', '元灵', '天真', '晓蕾', '问玉', '问薇', '笑晴', '亦瑶', '半芹', '幼萱', '凡双', '夜香', '阑香', '阑悦', '溪灵', '冥茗', '丹妗', '妙芹', '飞飞', '觅山', '沛槐', '太英', '惋清', '太清', '灵安', '觅珍', '依风', '若颜', '觅露', '问柳', '以晴', '山灵', '晓兰', '梦菡', '思萱', '半蕾', '紫伊', '山兰', '初翠', '岂愈', '海雪', '向雁', '冬亦', '柏柳', '青枫', '宝莹', '宝川', '若灵', '冷梅', '艳一', '梦槐', '依霜', '凡之', '忆彤', '英姑', '清炎', '绮露', '醉卉', '念双', '小凡', '尔琴', '冬卉', '初柳', '天玉', '千愁', '稚晴', '怀曼', '雪曼', '雪枫', '缘郡', '雁梅', '雅容', '雁枫', '灵寒', '寻琴', '慕儿', '雅霜', '含莲', '曼香', '慕山', '书兰', '凡波', '又莲', '沛春', '语梦', '青槐', '新之', '含海', '觅波', '嫣然', '善愁', '善若', '善斓', '千雁', '白柏', '雅柏', '冬灵', '平卉', '不弱', '不惜', '灵槐', '海露', '白梦', '尔蓉', '芷珊', '迎曼', '问兰', '又柔', '雪青', '傲之', '绿兰', '听兰', '冰旋', '白山', '荧荧', '迎荷', '丹彤', '海白', '谷云', '以菱', '以珊', '雪萍', '千兰', '大娘', '思枫', '白容', '翠芙', '寻雪', '冰岚', '新晴', '绿蓉', '傲珊', '安筠', '怀亦', '安寒', '青丝', '灵枫', '芷蕊', '寻真', '以山', '菲音', '寒烟', '易云', '夜山', '映秋', '唯雪', '嫣娆', '梦菲', '凤凰', '一寡', '幻然', '颜演', '白翠', '傲菡', '妙松', '忆南', '醉蓝', '碧彤', '水之', '怜菡', '雅香', '雅山', '丹秋', '盼晴', '听双', '冷亦', '依萱', '静槐', '冰之', '曼柔', '夏云', '凌寒', '夜天', '小小', '如南', '寻绿', '诗翠', '丹翠', '从蕾', '忆丹', '傲薇', '宛白', '幻枫', '晓旋', '初瑶', '如蓉', '海瑶', '代曼', '靖荷', '采枫', '书白', '凝阳', '孤晴', '如音', '傲松', '书雪', '怜翠', '雪柳', '安容', '以彤', '翠琴', '安萱', '寄松', '雨灵', '新烟', '妙菡', '雪晴', '友瑶', '丹珍', '白凝', '孤萍', '寒蕾', '妖妖', '藏花', '葵阴', '幻嫣', '幻悲', '若冰', '藏鸟', '又槐', '夜阑', '藏今', '凌柏', '向雪', '丹雪', '无心', '夜雪', '幻桃', '念瑶', '白卉', '飞绿', '怀梦', '幼菱', '芸遥', '芷波', '灵波', '一凤', '尔蝶', '问雁', '一曲', '问芙', '涔雨', '宫苴', '尔云', '秋凌', '灵煌', '寒梅', '灵松', '安柏', '晓凡', '冰颜', '行云', '觅儿', '天菱', '舞仙', '念真', '代亦', '飞阳', '迎天', '摇伽', '菲鹰', '惜萍', '安白', '幻雪', '友桃', '飞烟', '沛菡', '水绿', '天薇', '依瑶', '夏岚', '晓筠', '若烟', '寄风', '思雁', '乐荷', '雨南', '乐蓉', '易梦', '凡儿', '翠曼', '静曼', '魂幽', '茹妖', '香魔', '幻姬', '凝珍', '怜容', '惜芹', '笑柳', '太君', '莫茗', '忆秋', '代荷', '尔冬', '山彤', '盼雁', '山晴', '乐瑶', '灵薇', '盼易', '听蓉', '宛儿', '从灵', '如娆', '南霜', '元蝶', '忆霜', '冬云', '访文', '紫夏', '新波', '千萍', '凤妖', '水卉', '靖儿', '青烟', '千琴', '问凝', '如冰', '半梦', '怀莲', '傲芙', '静蕾', '绾绾', '绝音', '若血', '若魔', '虔纹', '涟妖', '雪冥', '邪欢', '冰姬', '黎云', '青旋', '语蕊', '代灵', '紫山', '傲丝', '听寒', '秋珊', '代云', '代双', '晓蓝', '茗茗', '天蓉', '南琴', '寻芹', '诗柳', '冬莲', '问萍', '忆寒', '尔珍', '新梅', '白曼', '一一', '安波', '醉香', '紫槐', '冰菱', '访曼', '冷卉', '乐儿', '幼翠', '孤兰', '绮菱', '觅夏', '千风', '碧灵', '雨竹', '平蓝', '尔烟', '冬菱', '笑寒', '冰露', '诗筠', '鸣凤', '绿凝', '雁玉', '梦曼', '凌雪', '怜晴', '傲玉', '柔', '幻儿', '书萱', '绮玉', '诗霜', '惜寒', '惜梦', '乐安', '以蓝', '之瑶', '夏寒', '妍', '丹亦', '凌珍', '问寒', '访梦', '新蕾', '书文', '平凡', '如天', '怀柔', '语柔', '芾', '宛丝', '南蕾', '迎海', '代芹', '巧曼', '代秋', '慕梅', '幼蓉', '亦寒', '莹', '冬易', '丹云', '丹寒', '丹蝶', '代真', '翠梅', '翠风', '翠柏', '翠安', '从霜', '从露', '初之', '初柔', '初露', '初蝶', '采萱', '采蓝', '采白', '冰烟', '冰彤', '冰巧', '斌', '傲云', '凝冬', '雁凡', '书翠', '千凡', '半青', '惜儿', '曼凡', '乐珍', '新柔', '翠萱', '飞瑶', '幻露', '梦蕊', '安露', '晓露', '白枫', '怀薇', '雁露', '梦竹', '盼柳', '沛岚', '夜南', '香寒', '山柏', '雁易', '静珊', '雁蓉', '千易', '笑萍', '从雪', '书雁', '曼雁', '晓丝', '念蕾', '雅柔', '采柳', '易绿', '向卉', '惜文', '冰兰', '尔安', '语芹', '晓山', '秋蝶', '曼卉', '凝梦', '念文', '冰蓝', '听南', '慕凝', '如容', '亦凝', '乐菱', '怀蝶', '惜筠', '冬萱', '初南', '语风', '白竹', '夏瑶', '雅绿', '怜雪', '从菡', '访波', '安青', '觅柔', '雅青', '白亦', '宛凝'];

/**
 * 初始化所有人名的列表，保证不重复
 * @param allPersonArr
 */
export function initAllNameArr(allPersonArr) {
    allPersonArr.forEach((onePerson) => {
        let name = onePerson._name || onePerson.name;
        if (allPersonArr.indexOf(name) < 0) {
            allNameArr.push(name);
        }
    });
};

/**
 * 移除一个随机名字，表示这个名字可用
 * @param name
 */
export function removeOneName(name) {
    let index = allNameArr.indexOf(name);
    if (index >= 0) {
        allNameArr.splice(index, 1);
    }
};

/**
 * 生成一个随机的人名
 * 如果量很大的话需要优化
 * @param sex 性别
 */
export function getRandomName(sex) {
    let surname = SURNAME_ARR[Math.floor(cc.random0To1() * SURNAME_ARR.length)];
    let name;
    if (sex === MyGame.SEX_MAN) {
        name = MAN_NAME_ARR[Math.floor(cc.random0To1() * MAN_NAME_ARR.length)];
    } else {
        name = WOMAN_NAME_ARR[Math.floor(cc.random0To1() * WOMAN_NAME_ARR.length)];
    }
    let resultName = surname + name;
    if (allNameArr.indexOf(resultName) >= 0) {
        return getRandomName(sex);
    }
    allNameArr.push(resultName);
    return resultName;
};
