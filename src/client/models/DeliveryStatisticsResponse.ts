export interface BounceMetric {
    Name: string
    Count: number
    Type?: string
}

export default interface DeliveryStatisticsResponse {
    
    InactiveMails: number
    Bounces: BounceMetric
}