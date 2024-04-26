export type GolferType = {
    golfer_id:number,
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
    alcohol?:boolean,
    legal_drugs?:boolean,
    smoker?:boolean,
    gambler?:boolean,
    music?:boolean,
    tees?:string,
    phone?:string
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
    password:string,
    confirm_password:string,
    handicap?:number,
    right_handed?:boolean,
    alcohol?:boolean,
    legal_drugs?:boolean,
    smoker?:boolean,
    gambler?:boolean,
    music?:boolean,
    tees?:string,
    phone?:string
}

export type TeetimeType = {
    teetime_id:number,
    course_name:string,
    price:number,
    teetime_date:string,
    teetime_time:string,
    space_remaining:number,
    golfer_id:number,
    course_id:number,
    golfer:GolferType,
    golfer_comments:CommentType
}

export type TeetimeFormType = {
    course_name:string,
    price:number,
    teetime_date:string,
    teetime_time:string,
    space_remaining:number,
    course_id:number
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

export type TokenType = {
    token:string,
    tokenExp:string
}

export type CommentFormType = {
    body:string
}

export type CommentType = {
    golfer_comment_id:number,
    body:string,
    golfer: GolferType
    golfer_id:number,
    teetime_id:number
}

export type CourseType = {
    course_id:number,
    course_name:string,
    address:string,
    city:string,
    district:string,
    country:string,
    par:string
}

export type CourseCardType = {
    course_id:number,
    course_name:string,
    address:string,
    city:string,
    district:string,
    country:string,
    par:string
}