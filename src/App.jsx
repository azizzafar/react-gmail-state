import { useState } from 'react';
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState('inbox');

  // Function to filter emails based on read status and current tab
  const getFilteredEmails = () => {
    let filteredEmails = [...emails];
    if (hideRead) {
      filteredEmails = filteredEmails.filter(email => !email.read);
    }
    if (currentTab === 'starred') {
      filteredEmails = filteredEmails.filter(email => email.starred);
    }
    return filteredEmails;
  };

  // Function to toggle the read status of an email
  const toggleRead = (emailId) => {
    const updatedEmails = emails.map(email =>
      email.id === emailId ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  };

  // Function to toggle the starred status of an email
  const toggleStar = (emailId) => {
    const updatedEmails = emails.map(email =>
      email.id === emailId ? { ...email, starred: !email.starred } : email
    );
    setEmails(updatedEmails);
  };

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(e) => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {getFilteredEmails().map(email => (
          <div key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
           <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStar(email)}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default App

