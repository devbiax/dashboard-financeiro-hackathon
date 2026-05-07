import {
  LayoutDashboard,
  CalendarDays,
  ArrowLeftRight,
  Wallet
} from 'lucide-react'

function Sidebar() {
  return (
    <aside className="sidebar">

      <div>
        <h1>App Financeiro</h1>

        <nav className="menu">

          <a href="">
            <LayoutDashboard size={20} />
            Dashboard
          </a>

          <a href="">
            <CalendarDays size={20} />
            Schedule
          </a>

          <a href="">
            <ArrowLeftRight size={20} />
            Transactions
          </a>

          <a href="">
            <Wallet size={20} />
            Wallet
          </a>

        </nav>
      </div>

    </aside>
  )
}

export default Sidebar