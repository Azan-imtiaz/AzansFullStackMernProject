import {commonrequest} from "../services/apiCall";
import {BASE_URL}  from "../services/helper";


export const registerFunction=async (data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/register`,data,header);

}

export const getFunction=async (search,gender,status,sort,page)=>{
    return await commonrequest("GET",`${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,"");
}

export const singleUserGetFunction=async (id)=>{
    return await commonrequest("GET",`${BASE_URL}/user/${id}`,"");
}


export const editFunc=async (id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/edit/${id}`,data,header);
}

export const deletefunc=async (id)=>{
    // console.log(id);
    return await commonrequest("delete",`${BASE_URL}/user/delete/${id}`,{});
}


export const statuschangefunc=async(id,data)=>{
 return await commonrequest("PUT",`${BASE_URL}/user/status/${id}`,{data})
}


export const exporttocsvfunc=async()=>{
    return await commonrequest("GET",`${BASE_URL}/user/status/userexport`,"")
 }