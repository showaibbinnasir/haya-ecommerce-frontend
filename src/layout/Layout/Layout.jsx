import { Outlet } from "react-router-dom";
import NavigationBar from "../../component/NavigatiobBar/NavigationBar";

const Layout = () => {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;