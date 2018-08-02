export interface BounceMetric {
    Name: string
    Count: number
    Type?: string
}

export default interface DeliveryStats {
    
    InactiveMails: number
    Bounces: BounceMetric
}