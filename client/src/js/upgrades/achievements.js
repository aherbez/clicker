export class AchievementData {
    constructor(data) {
        this.id = data.id || -1;
        this.name = data.name || '';
        this.desc = data.desc || '';
        this.hidden = data.hidden || false;
        this.criteria = data.criteria || [];
    }
}

export const Rel = {
    GE: 1,  // greater than
    LE: 2,  // less than
    GE_EQ: 3,   // greater than or equal to
    LE_EQ: 4    // less than or equal to
}

export class AchievementTracker {
    constructor(gr) {
        this.registry = gr;
    
        this.achievementListLocked = new Set();
        this.achievementListUnlocked = new Set();
    }


}