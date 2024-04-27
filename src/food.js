import {areaArray, foodName} from './info.js';
import { Item, addToInventory,reanderUI} from "./inventory.js";


let gridWidth = 15; 
let  gridHeight = 15;
let cellSize = 200;


export default class Foods {
    constructor(options, scene) {
        this.scene = scene;
    }
    
    load() {
        this.scene.foods = this.scene.physics.add.group();
    
        for (let row = 0; row < gridHeight; row++) {
            for (let col = 0; col < gridWidth; col++) {
                let gridX = col * cellSize + cellSize / 2; // Center X of the grid cell
                let gridY = row * cellSize + cellSize / 2; // Center Y of the grid cell
    
                let isExcluded = false;
                // Check if the current grid cell is in the areaArray
                for (let i = 0; i < areaArray.length; i++) {
                    if (areaArray[i][0] === row && areaArray[i][1] === col) {
                        isExcluded = true;
                        break;
                    }
                }
    
                if (!isExcluded) {
                    // Randomly decide whether to place a tree in this grid cell
                    if (Math.random() < 0.5) { // Adjust probability as needed
                        let randomKey = Phaser.Math.Between(0, 63);
                        let food = this.scene.foods.create(gridX, gridY, `food${randomKey}`);
                        food.setScale(1)
                        food.setData('keyNumber', randomKey)
                        
                    }
                }
            }
    
        }
    }
    
    pickUp() {
        this.scene.itemOnInvetory = this.scene.physics.add.staticGroup();
        this.scene.textOnInvetory = this.scene.physics.add.staticGroup();
        this.scene.foods.getChildren().forEach((item,index) => {
            
            item.setInteractive().setDepth(99)
            
            item.on('pointerdown', (pointer) => {
                let indoxOfFoodName = item.data.values.keyNumber
                addToInventory(new Item(item.texture.key, 1, foodName[indoxOfFoodName]));
                reanderUI.call(this.scene)
                item.destroy();
            });
            
        })
        
        
        
    }
}