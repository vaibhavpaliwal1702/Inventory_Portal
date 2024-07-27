import localforage from "localforage";
export async function createAccount(data){
    await localforage.setItem(data.UserName,data).then(()=>{
        console.log("Data Stored Successfully");
    })
    .catch(()=>{
        console.log("Some Error Occured");
    });
    sessionStorage.setItem("id",data.UserName);
}
export async function getData(id){
   return localforage.getItem(id);
}
export async function getUserName(){
    let res = await sessionStorage.getItem("id");
    let fin = await localforage.getItem(res);
    return fin ?? null;
}

export async function verify(data){
    let chk1 = await localforage.getItem(data.UserName);
    if(!chk1){
        return false;
    }
    let {UserName,Password} = {...data};
    if(UserName === chk1.UserName && Password === chk1.Password){ 
        sessionStorage.setItem("id",UserName);
        return true;
    }
    return false;
}

export async function logout(){
    await sessionStorage.setItem('id', JSON.stringify(null));
}

export async function deleteUser(id){
    await sessionStorage.setItem('id', JSON.stringify(null));
    await localforage.removeItem(id);
}

export async function verifyUser(id){
    const SessId = sessionStorage.getItem('id');
    if(SessId === id){
        return true;
    }
    return false;
}