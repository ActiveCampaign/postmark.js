export interface BounceMetric {
    Name: string
    Count: number
    Type?: string
}

export default interface DeliveryStatistics {
    InactiveMails: number
    Bounces: BounceMetric[]
}