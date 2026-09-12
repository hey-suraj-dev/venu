import { useAuth } from '../context/AuthContext';

const stats = [
  { label: 'Total Posts', value: 128 },
  { label: 'Drafts', value: 24 },
  { label: 'Scheduled', value: 12 },
  { label: 'Published', value: 78 },
  { label: 'Failed', value: 14 },
];

const recentActivity = [
  { title: 'Post approved for publishing', time: '2 hours ago' },
  { title: 'Draft saved successfully', time: '5 hours ago' },
  { title: 'AI post generated', time: 'Yesterday' },
  { title: 'Scheduled post published', time: '2 days ago' },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Dashboard</h1>
        </div>
        <button className="secondary-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <div className="user-banner">
        <div>
          <h2>{user?.name || 'User'}</h2>
          <p>{user?.email}</p>
        </div>
      </div>

      <section className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <p>{stat.label}</p>
            <h3>{stat.value}</h3>
          </div>
        ))}
      </section>

      <section className="content-grid">
        <div className="panel-card">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            {recentActivity.map((item) => (
              <li key={item.title}>
                <span>{item.title}</span>
                <small>{item.time}</small>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="primary-btn">Generate AI Post</button>
            <button className="secondary-btn">Create Draft</button>
            <button className="secondary-btn">View Scheduled Posts</button>
          </div>
        </div>
      </section>
    </div>
  );
}
