import { Entity } from '../common/entity';
import { BusinessPanel } from './business_panel';

/**
 * Renders the list of purchaseable businesses
 */
export class BusinessCatalog extends Entity {
    constructor(businessLookup) {
        super();

        this.busList = businessLookup;
        let i=0;
        this.busList.forEach((bd) => {
            this.addBusiness(bd, i);
            i++;
        })
    }

    addBusiness(bd, index) {
        let bPanel = new BusinessPanel(bd);
        bPanel.setPos(0, (index * (150 + 10)));
        this.children.push(bPanel);
    }

    render(ctx) {
        // ctx.fillRect(0,0, 100, 100);
    }
}