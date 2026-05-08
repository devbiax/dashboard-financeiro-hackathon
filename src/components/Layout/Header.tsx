import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="header-left">
        <h1>Olá, Illana! 👋</h1>
        <p>Vamos juntos alcançar seus objetivos financeiros.</p>
      </div>

      <div className="header-right">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Buscar transação..." />
        </div>

        <button className="icon-button">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>

        <div className="user-profile">
          <div className="avatar">IL</div>
          <div className="user-info">
            <span className="user-name">Illana Beatriz</span>
            <span className="user-role">Diva Tech</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;