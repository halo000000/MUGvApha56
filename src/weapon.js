export default class Weapon {
    constructor (scene,options) {
        this.key = options.key;
        this.id =  options.id;
        this.name = options.name;
        this.position = {
            x: options.position.x,
            y: options.position.y
        };
        
        this.damage = options.damage;
        
        this.scene = scene;
    }
    
    create() {
        this.weapon = this.scene.physics.add.sprite(this.position.x, this.position.y, this.key);
        return this.weapon;
    }
    
    pickUp() {
        this.doesPickedUp = true;
        this.weapon.setDepth(5)
    }
    
    isPickedUp () {
        let x = this.scene.Dude.x;
        let y = this.scene.Dude.y;
        let angle = 0;
        
        if(!this.doesPickedUp) return
        
        if(this.scene.Dude.data.values.facing == 'Left') {
            x = x - 25;
            angle = 180
        }
        
        if (this.scene.Dude.data.values.facing == 'Right') {
            x = x + 25
        }
        
        if (this.scene.Dude.data.values.facing == 'Back') {
            y = y - 25;
            angle = -90;
        }
        
        if (this.scene.Dude.data.values.facing == 'Front') {
            y = y + 25;
            angle = 90;
        }
        
        this.weapon.x = x;
        this.weapon.y = y;
        this.weapon.setAngle(angle);
        
    }
    
    drop() {
        this.isPickedUp = false;
        this.weapon.setDepth(1)
    }
    
    healPlayer() {
        this.scene.Dude.data.values.health = 100;
        this.weapon.destroy();
        return this.scene.Dude.data.values.health
    }
    
};
