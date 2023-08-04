import jwt_decode from 'jwt-decode';
import { PanierService } from './panier.service';

export class State {
    isLogged:boolean;
    isUser:boolean;
    isAdmin:boolean;
    tab:any;
    constructor(private ps:PanierService){
        this.isLogged=this.logged();
        this.isUser=this.user();
        this.isAdmin=this.admin();
    }
    logged(){
        const token=localStorage.getItem("token");
        if(token){
        return true;
        }
        return false;
    }
    user(){
        const token=localStorage.getItem("token");
        if(token){
            const tokenPayload = jwt_decode(token);
            const r=(tokenPayload as any).roles;
            if(r.length==1 && r[0]=="ROLE_USER"){
                return true;
            }
        }
        return false;
    }
    admin(){
        const token=localStorage.getItem("token");
        if(token){
            const tokenPayload = jwt_decode(token);
            const r=(tokenPayload as any).roles;
            if(r.length==2 && r.includes("ROLE_ADMIN")){
                return true;
            }
        }
        return false;
    }
}

