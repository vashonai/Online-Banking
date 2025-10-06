import { useState } from 'react'
import './App.css'

function Header({ onToggleSidebar }) {
  return (
    <header className="ob-header" role="banner">
      <button className="ob-icon-button" aria-label="Toggle navigation" onClick={onToggleSidebar}>
        ☰
      </button>
      <h1 className="ob-app-title">MyBank</h1>
      <div className="ob-header-actions" aria-label="User actions">
        <button className="ob-button" aria-label="Notifications">🔔</button>
        <button className="ob-avatar" aria-label="Account menu" title="Profile">VA</button>
      </div>
    </header>
  )
}

function Sidebar({ collapsed, current, onNavigate }) {
  const items = [
    { key: 'overview', label: 'Overview', icon: '🏠' },
    { key: 'accounts', label: 'Accounts', icon: '💳' },
    { key: 'payments', label: 'Payments', icon: '💸' },
    { key: 'cards', label: 'Cards', icon: '🪪' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
  ]
  return (
    <nav className={"ob-sidebar" + (collapsed ? " ob-sidebar--collapsed" : "")} aria-label="Primary">
      <ul className="ob-nav-list">
        {items.map((item) => (
          <li key={item.key}>
            <button
              className={"ob-nav-item" + (current === item.key ? " ob-nav-item--active" : "")}
              onClick={() => onNavigate(item.key)}
              aria-current={current === item.key ? 'page' : undefined}
            >
              <span aria-hidden="true" className="ob-nav-icon">{item.icon}</span>
              <span className="ob-nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function BalanceCard({ accountName, balance, accountNo }) {
  return (
    <section className="ob-card" aria-label={`Balance ${accountName}`}>
      <div className="ob-card-header">
        <h2 className="ob-card-title">{accountName}</h2>
        <span className="ob-subtle">{accountNo}</span>
      </div>
      <div className="ob-balance">${balance.toLocaleString()}</div>
    </section>
  )
}

function RecentTransactions({ transactions }) {
  return (
    <section className="ob-card" aria-label="Recent transactions">
      <div className="ob-card-header">
        <h2 className="ob-card-title">Recent transactions</h2>
      </div>
      <ul className="ob-tx-list">
        {transactions.map((t) => (
          <li key={t.id} className="ob-tx-item">
            <div className="ob-tx-primary">
              <span className="ob-tx-merchant">{t.merchant}</span>
              <span className="ob-subtle">{t.date}</span>
            </div>
            <div className={"ob-amount " + (t.amount < 0 ? 'ob-amount--neg' : 'ob-amount--pos')}>
              {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function QuickActions({ onPay, onTransfer, onAdd }) {
  return (
    <section className="ob-card" aria-label="Quick actions">
      <div className="ob-card-header">
        <h2 className="ob-card-title">Quick actions</h2>
      </div>
      <div className="ob-actions">
        <button className="ob-button" onClick={onPay}>Pay bill</button>
        <button className="ob-button" onClick={onTransfer}>Transfer</button>
        <button className="ob-button ob-button--secondary" onClick={onAdd}>Add account</button>
      </div>
    </section>
  )
}

function App() {
  const [current, setCurrent] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const accounts = [
    { id: 'chk', name: 'Checking', number: '••• 1234', balance: 3287.42 },
    { id: 'sav', name: 'Savings', number: '••• 9876', balance: 12045.13 },
  ]
  const transactions = [
    { id: 't1', merchant: 'Grocery Mart', date: 'Oct 5', amount: -54.23 },
    { id: 't2', merchant: 'Salary', date: 'Oct 4', amount: 2300.0 },
    { id: 't3', merchant: 'Electric Co', date: 'Oct 3', amount: -89.12 },
  ]

  function handleNavigate(key) {
    setCurrent(key)
    setSidebarOpen(false)
  }

  return (
    <div className="ob-app">
      <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="ob-shell">
        <Sidebar collapsed={!sidebarOpen} current={current} onNavigate={handleNavigate} />
        <main className="ob-main" role="main">
          {current === 'overview' && (
            <div className="ob-grid">
              {accounts.map((a) => (
                <BalanceCard key={a.id} accountName={a.name} accountNo={a.number} balance={a.balance} />
              ))}
              <RecentTransactions transactions={transactions} />
              <QuickActions onPay={() => {}} onTransfer={() => {}} onAdd={() => {}} />
            </div>
          )}
          {current !== 'overview' && (
            <section className="ob-card">
              <div className="ob-card-header">
                <h2 className="ob-card-title">{current[0].toUpperCase() + current.slice(1)}</h2>
              </div>
              <p className="ob-subtle">Content coming soon.</p>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
