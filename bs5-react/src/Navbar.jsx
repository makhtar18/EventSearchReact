import React from "react";
import Nav from 'react-bootstrap/Nav';
import {Link, useResolvedPath, useLocation} from "react-router-dom";
const NavBar = ()=>{
    return (
    <Nav variant="pills" defaultActiveKey="link-1" className='justify-content-end mt-2' style={{ width: "100%" }}>
      <CustomLink to="/search">Search</CustomLink>
      <CustomLink to="/favorites">Favorites</CustomLink>
    </Nav>
    )
};

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to);
    const location = useLocation();
    var path = location.pathname;
    if(path == '/')
        path='/search';
    const isActive = (path==resolvedPath.pathname)?true:false;
    return(
        <Nav.Item>
            <Link to={to} className={isActive? "active nav-link":"nav-link"}> {children}</Link>
        </Nav.Item>
    )
}

export default NavBar;