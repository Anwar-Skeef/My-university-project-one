export interface GetOffer {
    "status": boolean,
    "msg": string,
    "data": [
        {
            "offer_number": number,
            "email": string,
            "city": string,
            "neighborhood": string,
            "area": number,
            "rooms": number,
            "price": number,
            "details": string
        }
    ]
}