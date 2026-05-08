import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="header-left">
        <h1>Olá, Illana!</h1>
        <p>Acompanhe entradas, saídas e padrões de consumo de forma inteligente.</p>
      </div>

      <div className="header-right">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Buscar transação..." />
        </div>

        <div className="notification-wrapper">
          <button
            className="icon-button"
            aria-label="Notificações"
            aria-expanded={isNotificationOpen}
            onClick={() => setIsNotificationOpen((current) => !current)}
          >
            <Bell size={20} />
            <span className="notification-badge" />
          </button>

          {isNotificationOpen && (
            <div className="notification-popover" role="status">
              <strong>Notificações</strong>
              <p>Você não tem novas notificações.</p>
            </div>
          )}
        </div>

        <div className="user-profile">
          <div className="avatar">IB</div>
          <div className="user-info">
            <span className="user-name">Illana Beatriz</span>
            <span className="user-role">dev.illanabeatriz@finapp.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
