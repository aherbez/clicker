import { BusinessLookup } from './business/business_lookup';
import { BusinessCatalog } from './business/business_catalog';
import { GameRegistry } from './game_registry';
import { PlayerInventory } from './player/player_inventory';
import { PlayerStorage } from './player/player_storage';
import { PlayerStats } from './upgrades/player_stats';
import { GameData } from './game_data';
import { GameScreen } from './ui/game_screen';
import { AchievementTracker } from './upgrades/achievements';
import { ToastManager } from './ui/toast_manager';

/**
 * ClickerClient: main game class
 */

const TICK_TIME_MS = 500;

export class ClickerClient {

    constructor(stageId) {
        let mainScreen = null;
        
        this.initTimers();
        this.initCanvas(stageId);

        this.gameRegistry = new GameRegistry();

        this.gameRegistry.gameData = new GameData();
        this.gameRegistry.gameData.getFromServer(this.startGame.bind(this));

        this.gameRegistry.businessLookup = new BusinessLookup(this.gameRegistry);
        this.gameRegistry.playerStorage = new PlayerStorage(this.gameRegistry);
        this.gameRegistry.playerStats = new PlayerStats(this.gameRegistry);
        this.gameRegistry.achievements = new AchievementTracker(this.gameRegistry);
        
        this.children = [];

        document.onmousedown = this.mouseDown.bind(this);

        this.update();
    }

    initCanvas(stageId) {
        this.canvasEl = document.getElementById(stageId);
        this.ctx = this.canvasEl.getContext('2d');

        this.bounds = {
            width: this.canvasEl.clientWidth,
            height: this.canvasEl.clientHeight,
        }

        this.pos = {
            x: this.canvasEl.offsetLeft,
            y: this.canvasEl.offsetTop
        };
    }

    mouseDown(evt) {
        /*
        console.log(evt);
        console.log({
            x: evt.clientX - this.pos.x,
            y: evt.clientY - this.pos.y
        });
        */

        let localPos = {
            x: evt.clientX - this.pos.x,
            y: evt.clientY - this.pos.y            
        }
        this.children.forEach(c => {
            c.handleClickInternal(localPos);
        })

    }

    initTimers() {
        this.lastTime = Date.now();
        this.tickTimer = 0;

    }

    initBusinessCatalog() {
        this.businessCatalog = new BusinessCatalog(this.busList);
        this.businessCatalog.setPos(10, 10);
        this.children.push(this.businessCatalog);
    }

    startGame() {
        const { gameData, businessLookup, achievements, playerStorage } = this.gameRegistry;

        businessLookup.initFromData(gameData.businessJSON);
        achievements.initFromData(gameData.achievementJSON);

        this.gameRegistry.playerInventory =  new PlayerInventory(this.gameRegistry);

        this.mainScreen = new GameScreen(this.gameRegistry);
        this.children.push(this.mainScreen);

        // put toasts on top of everything else
        this.gameRegistry.toasts = new ToastManager(this.gameRegistry);
        this.gameRegistry.toasts.setPos(0, 0);
        this.mainScreen.children.push(this.gameRegistry.toasts);

        playerStorage.loadPlayerData();
        achievements.checkAchievements(false);
        achievements.notifyPlayer = true;
    }

    /**
     * function to handle ticking various update-able objects
     * (separate from rendering)
     */
    tick() {
        // update
    }

    /**
     * render loop
     */
    render(dt) {
        let ctx = this.ctx;
        let { width, height } = this.bounds;        

        ctx.clearRect(0, 0, width, height);
        ctx.save();

        ctx.save();
        ctx.fillStyle = '#ffcb74';
        ctx.fillRect(0, 0, this.bounds.width, this.bounds.height);
        ctx.restore();

        if (this.mainScreen) {
            this.mainScreen._render(ctx);
        } else {
            ctx.save();
            ctx.translate(width/2, height/2);
            ctx.fillText('loading', 0, 0);

            ctx.restore();
        }

        ctx.restore();
    }

    update() {
        const { playerInventory } = this.gameRegistry;

        let curr = Date.now();
        let deltaTime = curr - this.lastTime;
        this.lastTime = curr;

        if (playerInventory) {
            playerInventory.tick();
        }

        // draw animation as often as possible
        this.render(deltaTime);

        // only tick if necessary
        this.tickTimer += deltaTime;
        if (this.tickTimer > TICK_TIME_MS) {
            this.tick();
            this.tickTimer = 0;
        }

        requestAnimationFrame(this.update.bind(this));
    }

}