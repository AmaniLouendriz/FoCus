import { Outlet } from "react-router-dom";
import { AppHeader } from "../AppHeader/AppHeader";
import { AppFooter } from "../AppFooter/AppFooter";
import './AppShell.css';


export const AppShell = () => {
    return (

        <div className="heroWrapper">
            <div className="headerP">
                <AppHeader/>
            </div>
    
    
    
            <Outlet/>


            <AppFooter/>











        </div>
  


)
}