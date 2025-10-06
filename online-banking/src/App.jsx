import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

function Header({ onToggleSidebar, user, onLogout }) {
  return (
    <header className="ob-header" role="banner">
      <button className="ob-icon-button" aria-label="Toggle navigation" onClick={onToggleSidebar}>
        ☰
      </button>
      <h1 className="ob-app-title">MINI CAPSTONE</h1>
      <div className="ob-header-actions" aria-label="User actions">
        <button className="ob-button" aria-label="Notifications">🔔</button>
        {user ? (
          <div className="ob-user">
            <span className="ob-subtle" title={user.email}>{user.name}</span>
            <button className="ob-button ob-button--secondary" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <span className="ob-subtle">Guest</span>
        )}
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

function Login({ onLogin, error }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  function submit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      onLogin({ email, password })
      setLoading(false)
    }, 300)
  }
  return (
    <div className="ob-auth">
      <form className="ob-card ob-auth-form" onSubmit={submit} autoComplete="on">
        <div className="ob-card-header">
          <h2 className="ob-card-title">Sign in</h2>
        </div>
        {error && <div role="alert" className="ob-error">{error}</div>}
        <label className="ob-field">
          <span>Email</span>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="ob-field">
          <span>Password</span>
          <input type="password" name="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="ob-button" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        <p className="ob-subtle" style={{marginTop: '0.5rem'}}>Demo: test@bank.com / Passw0rd!</p>
      </form>
    </div>
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

function RecentTransactions({ transactions, startingBalance }) {
  const rows = useMemo(() => {
    let running = startingBalance
    return transactions.slice(0, 20).map((t) => {
      running = running + t.amount
      return { ...t, running }
    })
  }, [transactions, startingBalance])
  return (
    <section className="ob-card" aria-label="Recent transactions">
      <div className="ob-card-header">
        <h2 className="ob-card-title">Recent transactions</h2>
      </div>
      <div className="ob-table-wrap">
        <table className="ob-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Merchant</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Running balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.merchant}</td>
                <td>{t.amount < 0 ? 'Debit' : 'Credit'}</td>
                <td className={"ob-amount " + (t.amount < 0 ? 'ob-amount--neg' : 'ob-amount--pos')}>
                  {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
                </td>
                <td className="ob-amount">${t.running.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState('')
  const inactivityTimerRef = useRef(null)

  const [accounts, setAccounts] = useState([
    { id: 'chk', name: 'Checking', number: '••• 1234', balance: 3287.42 },
    { id: 'sav', name: 'Savings', number: '••• 9876', balance: 12045.13 },
  ])
  const [selectedAccountId, setSelectedAccountId] = useState('chk')
  const [transactions, setTransactions] = useState([
    { id: 't1', merchant: 'Grocery Mart', date: '2025-10-05', amount: -54.23 },
    { id: 't2', merchant: 'Salary', date: '2025-10-04', amount: 2300.0 },
    { id: 't3', merchant: 'Electric Co', date: '2025-10-03', amount: -89.12 },
  ])

  // Authentication demo: single valid user
  function handleLogin({ email, password }) {
    const valid = email === 'test@bank.com' && password === 'Passw0rd!'
    if (!valid) {
      setAuthError('Invalid email or password. Try test@bank.com / Passw0rd!')
      return
    }
    setUser({ name: 'Test User', email })
    setAuthError('')
    startInactivityTimer()
  }
  function handleLogout(reason) {
    setUser(null)
    stopInactivityTimer()
    if (reason) {
      alert(reason)
    }
  }

  function resetInactivity() {
    if (!user) return
    startInactivityTimer()
  }
  function startInactivityTimer() {
    stopInactivityTimer()
    inactivityTimerRef.current = setTimeout(() => {
      handleLogout('Session expired due to inactivity.')
    }, 5 * 60 * 1000) // 5 minutes
  }
  function stopInactivityTimer() {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
      inactivityTimerRef.current = null
    }
  }
  useEffect(() => {
    const events = ['click', 'keydown', 'mousemove', 'touchstart']
    events.forEach((e) => window.addEventListener(e, resetInactivity))
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetInactivity))
    }
  }, [user])

  function handleNavigate(key) {
    setCurrent(key)
    setSidebarOpen(false)
  }

  return (
    <div className="ob-app">
      <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} user={user} onLogout={() => handleLogout()} />
      <div className="ob-shell">
        <Sidebar collapsed={!sidebarOpen} current={current} onNavigate={handleNavigate} />
        <main className="ob-main" role="main">
          {!user ? (
            <Login onLogin={handleLogin} error={authError} />
          ) : (
            <>
              {current === 'overview' && (
                <div className="ob-grid">
                  {accounts.map((a) => (
                    <BalanceCard key={a.id} accountName={a.name} accountNo={a.number} balance={a.balance} />
                  ))}
                  <div className="ob-card">
                    <div className="ob-card-header">
                      <h2 className="ob-card-title">Account</h2>
                      <select value={selectedAccountId} onChange={(e) => setSelectedAccountId(e.target.value)}>
                        {accounts.map((a) => (
                          <option key={a.id} value={a.id}>{a.name} ({a.number})</option>
                        ))}
                      </select>
                    </div>
                    <RecentTransactions transactions={transactions} startingBalance={accounts.find(a => a.id === selectedAccountId)?.balance ?? 0} />
                  </div>
                  <QuickActions onPay={() => setCurrent('payments')} onTransfer={() => setCurrent('payments')} onAdd={() => {}} />
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
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
