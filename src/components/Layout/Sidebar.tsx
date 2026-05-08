import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Wallet, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
  <Wallet color="#9E4A69" size={28} />
  <div className="logo-text">
    <span className="brand-name">FinApp</span>
    <span className="brand-subtitle">Consumo inteligente</span>
  </div>
</div>

      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </li>
          <li>
            <Calendar size={20} />
            <span>Schedule</span>
          </li>
          <li>
            <Wallet size={20} />
            <span>Wallet</span>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <ul>
          <li>
            <Settings size={20} />
            <span>Settings</span>
          </li>
          <li className="logout">
            <LogOut size={20} />
            <span>Log out</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;