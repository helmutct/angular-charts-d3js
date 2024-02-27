export class BudgetAwaiting {

    orderId: number;
    customerName: string;
    time: string;
    productId: number;
    productName: string;
    productImagePath: string;
    actionText: string;

    constructor(
        orderId: number,
        customerName: string,
        time: string,
        productId: number,
        productName: string,
        productImagePath: string,
        actionText: string
    ) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.time = time;
        this.productId = productId;
        this.productName = productName;
        this.productImagePath = productImagePath;
        this.actionText = actionText;
    }
}
