export class EditedProductAwaitingApproval {

    productId: number;
    productName: string;
    productImagePath: string;
    actionText: string;
    time: string;
    reasonDisapproval: string;

    constructor(
        productId: number,
        productName: string,
        productImagePath: string,
        actionText: string,
        time: string,
        reasonDisapproval: string
    ) {
        this.productId = productId;
        this.productName = productName;
        this.productImagePath = productImagePath;
        this.actionText = actionText;
        this.time = time;
        this.reasonDisapproval = reasonDisapproval;
    }
}
