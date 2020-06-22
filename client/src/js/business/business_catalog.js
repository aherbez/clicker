import { Entity } from '../common/entity';

/**
 * Renders the list of purchaseable businesses
 */
export class BusinessCatalog extends Entity {
    constructor(businessLookup) {
        super();

        console.log(`New business panel`);

        this.pos.x = 100;
        this.pos.y = 100;

        this.busList = businessLookup;

    }

    render(ctx) {
        ctx.fillRect(0,0, 100, 100);
    }
}