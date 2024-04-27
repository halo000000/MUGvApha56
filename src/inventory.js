export class Item {
    constructor(key,quantity, name = undefined) {
        
        this.key = key;
        this.quantity = quantity;
        this.name = name;
    }
    
}

let inventory = [];

export function addToInventory(mewItem) {
    let isExist = false;
    let itemExist = inventory.forEach(item => {
        if (item.name == mewItem.name) {
            item.quantity += 1;
            isExist = true;
            return;
        }
    });
    if (!isExist) {
        inventory.push(mewItem)
    }
}

export function reanderUI(x = 50, y = 100, group) {
    
    this.itemOnInvetory.clear(true, true);
    
    
    inventory.forEach((item,index) => {
        let newY = y + (32 * index) + 60;
        
        this.itemOnInvetory.create(x, newY, item.key).setScrollFactor(0).setData('name', item.name);
        
    });
    
    this.itemOnInvetory.getChildren().forEach((item,index) => {
        item.setInteractive()
        .setDepth(99);
        let name = item.data.values.name
        item.on('pointerdown', (pointer) => {
            this.foods.create(this.Dude.x + 10,this.Dude.y,item.texture.key)
            this.itemOnInvetory.remove(item);
            item.destroy();
            
            let newArray = inventory.filter(item2 => item2.name !== name);
            inventory = newArray
            
            
        });

        
    })
    
    
    
}