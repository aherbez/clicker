export class AchievementData {
    constructor(data) {
        this.id = data.id || -1;
        this.name = data.name || '';
        this.desc = data.desc || '';
        this.hidden = data.hidden || false;
        this.criteria = data.criteria || [];
        this.unlocked = false;
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
        achievementJSON.forEach(aData => {
            let achievement = new AchievementData(aData);
            this.achievementLookup.set(aData.id, achievement);
            this.achievementsLocked.add(aData.id);
        });
    }

    resetData() {
        this.achievementsUnlocked = new Set();
        this.achievementLookup.forEach(aData => {
            this.achievementsLocked.add(aData.id);
        })
    }

    getAchievementById(aID) {
        if (this.achievementLookup.has(aID)) {
            return this.achievementLookup.get(aID);
        }
        return null;
    }

    achievementIsUnlocked(aID) {
        return (this.achievementsUnlocked.has(aID));
    }

    playerHasUnlockedAll(idArray) {
        for (let i=0; i < idArray.length; i++) {
            if (!this.achievementIsUnlocked(idArray[i])) {
                return false;
            }
        }
        return true;
    }

    unlockAchievement(aID) {
        if (this.achievementsLocked.has(aID)) {
            this.achievementsUnlocked.add(aID);
            this.achievementsLocked.delete(aID);

            this.achievementLookup.get(aID).unlocked = true;
            return true;
        }
        return false;
    }

    getLockedAchievements() {
        let lockedIDs = Array.from(this.achievementsLocked);

        return lockedIDs.map(id => {
            return this.achievementLookup.get(id);
        });
    }

    getUnlockedAchievements() {
        let unlockedIDs = Array.from(this.achievementsUnlocked);
        return unlockedIDs.map(id => this.achievementLookup.get(id));  
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