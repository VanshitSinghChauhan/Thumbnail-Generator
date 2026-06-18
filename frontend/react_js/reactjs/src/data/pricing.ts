import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "55 AI Thumbnail/mo",
            "Basic Template ",
            "Standard Revolution ",
            "No Watermark",
            "Email support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "100 AI Thumbnail/mo",
            "Premium Template ",
            "4K Resolution ",
            "A/B Testing",
            "Priority Support",
            "Custom Font ",
            "Branding Options"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Everything in Pro",
            "API Accessx",
            "Team Collaboration",
            "Custom Branding",
            "Dedicated Account Manager"
        ],
        mostPopular: false
    }
];