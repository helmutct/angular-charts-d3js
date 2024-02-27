export class PurchaseProgress {

    orderId: number;
    actionText: string;
    customerName: string;
    percentageValue: string;
    chartStyle: string;
    time: string;
    productId: number;
    productName: string;
    productImagePath: string;

    constructor(
        orderId: number,
        actionText: string,
        customerName: string,
        percentageValue: string,
        chartStyle: string,
        time: string,
        productId: number,
        productName: string,
        productImagePath: string
    ) {
        this.orderId = orderId;
        this.actionText = actionText;
        this.customerName = customerName;
        this.percentageValue = percentageValue;
        this.chartStyle = chartStyle;
        this.time = time;
        this.productId = productId;
        this.productName = productName;
        this.productImagePath = productImagePath;
    }
}
