export class BusinessData {
    constructor(data) {
        this.id = data.id || -1;
        this.name = data.name || 'business';
        this.cost = data.cost || 1;
        this.costMult = data.costMult || 1;
        this.time = data.time || 10;
        this.icon = data.icon || 'null.png';
    }
}