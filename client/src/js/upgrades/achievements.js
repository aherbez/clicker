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
    
        this.achievementLookup = new Map();
        this.achievementsLocked = new Set();
        this.achievementsUnlocked = new Set();

        // start this as false, only set to true once everything is loaded
        this.notifyPlayer = false;
    }

    initFromData(achievementJSON) {
        console.log(achievementJSON);

        achievementJSON.forEach(aData => {
            let achievement = new AchievementData(aData);
            this.achievementLookup.set(aData.id, achievement);
            this.achievementsLocked.add(aData.id);
        });

        console.log(`Loaded ${this.achievementLookup.size} achivements`);
    }

    achievementIsUnlocked(aID) {
        return (this.achievementsUnlocked.has(aID));
    }

    unlockAchievement(aID) {
        if (this.achievementsLocked.has(aID)) {
            this.achievementsUnlocked.add(aID);
            this.achievementsLocked.delete(aID);
            return true;
        }
        return false;
    }

    getLockedAchievements() {
    }

    _checkCriteria(statValue, targetValue, relationship) {
        switch (relationship) {
            case Rel.GE:
                return (statValue > targetValue);
            case Rel.LE:
                return (statValue < targetValue);
            case Rel.GE_EQ:
                return (statValue >= targetValue);
            case Rel.LE_EQ:
                return (statValue <= targetValue);
            default:
                return false;
        }
    }

    _allCriteriaMet(aID) {
        if (!this.achievementLookup.has(aID)) return false;

        const { playerStats } = this.registry;
        const achievementData = this.achievementLookup.get(aID);
        const { criteria } = achievementData;
        for (let i=0; i < criteria.length; i++ ) {
            let currentValue = playerStats.maybeGetStat(criteria[i][0]);
            if (!this._checkCriteria(currentValue, criteria[i][1], criteria[i][2])) {
                return false;
            }
        }
        return true;
    }


    checkAchievements() {
        this.achievementLookup.forEach(achievement => {
            let unlocked = this._allCriteriaMet(achievement.id);

            if (unlocked && this.achievementsLocked.has(achievement.id)) {
                this.unlockAchievement(achievement.id);
                if (this.notifyPlayer) {
                    console.log(`Unlocked ${achievement.name}`);
                
                    let msg = `Unlocked: ${achievement.name}`;
                    this.registry.toasts.showToast(msg);
                }
            }
        });
    }


}