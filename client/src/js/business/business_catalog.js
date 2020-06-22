import { Entity } from '../common/entity';
import { BusinessPanel } from './business_panel';

/**
 * Renders the list of purchaseable businesses
 */
export class BusinessCatalog extends Entity {
    constructor(gr) {
        super();

        this.registry = gr;
        // this.busList = businessLookup;
        let i=0;
        this.registry.businessLookup.forEach((bd) => {
            this.addBusiness(bd, i);
            i++;
        })
    }

    addBusiness(bd, index) {
        let bPanel = new BusinessPanel(bd, this.registry);
        bPanel.setPos(0, (index * (150 + 10)));
        this.children.push(bPanel);
    }

    render(ctx) {
    }
}