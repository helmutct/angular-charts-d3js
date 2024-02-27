import { BudgetAwaiting } from './budget-awaiting.model';
import { PurchaseProgress } from './purchase-progress.model';
import { EditedProductAwaitingApproval } from './edited-product-awaiting-approval.model';

export class AllNotifications {

    budgetsAwaiting: BudgetAwaiting[];
    purchaseProgress: PurchaseProgress[];
    editedProductsAwaitingApproval: EditedProductAwaitingApproval[];
    productsApprovedLessThan1MonthAgo: EditedProductAwaitingApproval[];

    constructor(
        budgetsAwaiting: BudgetAwaiting[],
        purchaseProgress: PurchaseProgress[],
        editedProductsAwaitingApproval: EditedProductAwaitingApproval[],
        productsApprovedLessThan1MonthAgo: EditedProductAwaitingApproval[]
    ) {
        this.budgetsAwaiting = budgetsAwaiting;
        this.purchaseProgress = purchaseProgress;
        this.editedProductsAwaitingApproval = editedProductsAwaitingApproval;
        this.productsApprovedLessThan1MonthAgo = productsApprovedLessThan1MonthAgo;
    }
}
