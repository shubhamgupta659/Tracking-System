import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './navbarstyle.css'; // Assuming this is the correct path for your stylesheet
import { Button, Menu, Modal } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { goToLogin } from '../../api/apiutil';

const { SubMenu } = Menu;

function Navbar({ modules}:{modules: any}) {
  const isMounted = useRef(true);
  const location = useLocation();
  const selectedKeys = [getLocationKey(location.pathname)];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const openKeys = modules
    .filter((module:any) => (module.children || []).some((child :any) => child && child.key === location.pathname))
    .map((module:any) => module.key);

    useEffect(() => {
      isMounted.current = true;
    
      return () => {
        isMounted.current = false;
      };
    }, []);

  function getLocationKey(path: any) {
    if (path === '/createLicense' || path === '/viewLicense' || path === '/editLicense') {
      return '/license';
    } else if (path === '/createCompliance' || path === '/viewCompliance' || path === '/editCompliance') {
      return '/compliance';
    } else if (path === '/createCostutil' || path === '/viewCostutil' || path === '/editCostutil') {
      return '/costutil';
    }
    return path;
  }

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  function handleClick(mod : any, child?: any) {
    setHovered(false);

    if (child && child.link) {
      navigate(`${child.link}`);
    } else {
      if (mod.key === '/') {
        goToLogin();
      } else {
        navigate(`${mod.key}`);
      }
    }
  }

  return (
    <div
      data-testid={hovered ? 'nav-bar-open' : 'nav-bar-closed'}
      className={hovered ? 'nav-bar-main-container-open' : 'nav-bar-main-container-closed'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Menu
        selectedKeys={selectedKeys}
        mode='inline'
        style={{ height: '100%', borderRight: 0, fontSize: '22px', backgroundColor: '#F1F2F7' }}
        defaultOpenKeys={openKeys}
      >
        <Menu.ItemGroup className='top-container'>
          {modules
            .filter((obj:any) => obj.position === 'top')
            .map((mod:any) => (
              mod.children ? (
                <SubMenu title={mod.title} key={mod.key}>
                  {mod.children.length > 0 ?
                    mod.children.map((child:any) => (
                      <Menu.Item
                        data-testid={child.key}
                        key={child.key}
                        onClick={() => handleClick(mod, child)}
                      >
                        {child.title}
                      </Menu.Item>
                    ))
                    : null
                  }
                </SubMenu>
              ) : (
                <Menu.Item
                  data-testid={mod.title}
                  icon={<mod.icon />}
                  key={mod.key}
                  title={mod.title}
                  onClick={() => handleClick(mod)}
                >
                  {mod.title}
                </Menu.Item>
              )
            ))}
        </Menu.ItemGroup>
  
        <Menu.ItemGroup
          className={hovered ? 'bottom-container-open' : 'bottom-container-closed'}
        >
          {modules
            .filter((obj:any) => obj.position === 'bottom')
            .map((mod:any) => (
              mod.children ? (
                <SubMenu title={mod.title} key={mod.key}>
                  {mod.children.length > 0 ?
                    mod.children.map((child:any) => (
                      <Menu.Item
                        data-testid={child.key}
                        key={child.key}
                        onClick={() => handleClick(mod, child)}
                      >
                        {child.title}
                      </Menu.Item>
                    ))
                    : null
                  }
                </SubMenu>
              ) : (
                <Menu.Item
                  data-testid={mod.title}
                  icon={<mod.icon />}
                  key={mod.key}
                  title={mod.title}
                  onClick={() => handleClick(mod)}
                >
                  {mod.title}
                </Menu.Item>
              )
            ))}
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
  

}

export default Navbar;

