import BaseUI from "../Base/BaseUI";
import { MyGame } from "../../Tool/System/Game";
import { City } from "../../Data/CityFactory";
import { Force } from "../../Data/ForceFactory";
import { Person } from "../../Data/PersonFactory";

const { ccclass, property } = cc._decorator;

@ccclass
class PersonListUI extends BaseUI {

    _uiName: string = 'PersonListUI';

    _personListNodePool: cc.NodePool;
    _personListScrollViewNode: cc.Node;
    _personListScrollViewTmpNode: cc.Node;

    onLoad() {
        super.onLoad();

    }

    update(dt) {
        super.update(dt);

    }

    onUIInit() {
        super.onUIInit();
        this._personListNodePool = new cc.NodePool();
        this._personListScrollViewNode = cc.find('Mid/scrollview', this.node);
        this._personListScrollViewTmpNode = cc.find('view/content/item', this._personListScrollViewNode);
    }

    onShow() {
        super.onShow();
        let gameData = MyGame.GameManager.gameDataSave;
        let cityId = MyGame.GameDataSaveTool.getData('show_city_id');
        let personArr = gameData.getCityById(cityId).personArr;
        //显示list
        MyGame.ScrollViewTool.buildScrollView(this._personListScrollViewNode, MyGame.ScrollViewTool.SCROLL_TYPE_VERTICAL,
            this._personListScrollViewTmpNode, function (childNode: cc.Node, data: Person) {
                cc.find('button/personName', childNode).getComponent(cc.Label).string = data.name;
                MyGame.NodeTool.saveNodeValue(childNode.getChildByName('button'), '_person_id', data.personId);
            }.bind(this), personArr, this._personListNodePool);
        this.buttonTravelRegister(this.node);
    }

    hide(deleteFlag) {
        super.hide(deleteFlag);

    }

    onDestroy() {
        super.onDestroy();

    }

    onButtonClick(name: string, node: cc.Node, component: cc.Component) {
        switch (name) {
            case 'hide':
                this.hide(false);
                break;
        }
    }
}