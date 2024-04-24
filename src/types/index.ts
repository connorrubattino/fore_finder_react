export type GolferType = {
    id:number,
    token:string,
    first_name:string,
    last_name:string,
    email:string,
    username:string,
    golfer_age:number,
    city:string,
    district:string,
    country:string,
    handicap?:number,
    right_handed?:boolean,
    alchohol?:boolean,
    legal_drugs?:boolean,
    smoker?:boolean,
    gambler?:boolean,
    music?:boolean,
    tees?:boolean,
    phone?:boolean
}

export type GolferFormType = {
    first_name:string,
    last_name:string,
    email:string,
    username:string,
    golfer_age:number,
    city:string,
    district:string,
    country:string,
}

export type TeetimeType = {
    id:number,
    course_name:string,
    price:number,
    teetime_date:string,
    teetime_time:string,
    space_remaining:number,
    golfer_id:number,
    course_id:number
}

export type TeetimeFormType = {
    course_name:string,
    price:number,
    teetime_date:string,
    teetime_time:string,
    space_remaining:number
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

export type TokenType = {
    token:string,
    tokenExpiration:string
}