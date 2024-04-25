import axios from 'axios';
import { GolferFormType, GolferType, TeetimeFormType, TeetimeType, TokenType } from '../types';


const baseURL:string = 'https://fore-finder-flaskapi.onrender.com'
const golferEndpoint:string = '/golfers'
const tokenEndpoint:string = '/token'
const teetimeEndpoint:string = '/teetimes'


const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})

type APIResponse<T> = { //generic type T because data will be in all different kinds of responses
    data?:T,
    error?:string
}


async function register(newUserData:GolferFormType): Promise<APIResponse<GolferType>> { //when it returns it will either be data or error and if it is data it will be UserType
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(golferEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function login(username:string, password:string): Promise<APIResponse<TokenType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint)
        data = response.data
        console.log(data)
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function getMe(token:string): Promise<APIResponse<GolferType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(golferEndpoint + '/me')
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function editUser(token:string, editedUserData:Partial<GolferType>): Promise <APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(golferEndpoint + '/me', editedUserData);
        data=response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error =err.response?.data.error
        } else {
            error= "Something went wrong"
        }
    }
    return { data, error }
}

async function deleteUser(token:string): Promise <APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(golferEndpoint + '/me');
        data=response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error =err.response?.data.error
        } else {
            error= "Something went wrong"
        }
    }
    return { data, error }
}


async function getAllTeetimes(): Promise<APIResponse<TeetimeType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(teetimeEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getMyTeetimes(token:string): Promise<APIResponse<{'teetimes':TeetimeType[]}> > { 
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(teetimeEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function createTeetime(token:string, teetimeData:TeetimeFormType): Promise<APIResponse<TeetimeType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(teetimeEndpoint, teetimeData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function getTeetimeById(teetimeId:string|number): Promise<APIResponse<TeetimeType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(teetimeEndpoint + '/' + teetimeId)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error || `Tee Time with ID ${teetimeId} does not exist`
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function editTeetimeById(teetimeId:string|number, token:string, editedTeetimeData:TeetimeFormType): Promise<APIResponse<TeetimeType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(teetimeEndpoint + '/' + teetimeId, editedTeetimeData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `Tee Time with ID ${teetimeId} does not exist`
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function deleteTeetimeById(teetimeId:string|number, token:string): Promise<APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(teetimeEndpoint + '/' + teetimeId)
        data = response.data.success
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `Tee Time with ID ${teetimeId} does not exist`
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}




export {
    register,
    login,
    getMe,
    editUser,
    deleteUser,
    getAllTeetimes,
    getMyTeetimes,
    createTeetime,
    getTeetimeById,
    editTeetimeById,
    deleteTeetimeById,



}