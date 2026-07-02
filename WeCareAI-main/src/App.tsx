import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import OPDPage from './pages/OPDPage';
import DocumentsPage from './pages/DocumentsPage';
import QueuePage from './pages/QueuePage';
import EmergencyPage from './pages/EmergencyPage';
import TokenPage from './pages/TokenPage';
import AdminPage from './pages/AdminPage';
import SettingsPage from './pages/SettingsPage';
import ReportAnalyzerPage from './pages/ReportAnalyzerPage';

function PageRouter() {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'home':
      return <HomePage />;

    case 'chat':
      return <ChatPage />;

    case 'opd':
      return <OPDPage />;

    case 'documents':
      return <DocumentsPage />;

    case 'queue':
      return <QueuePage />;

    case 'emergency':
      return <EmergencyPage />;

    case 'token':
      return <TokenPage />;

    case 'admin':
      return <AdminPage />;

    case 'report':
      return <ReportAnalyzerPage />;

    case 'settings':
      return <SettingsPage />;

    default:
      return <HomePage />;
  }
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="lg:ml-72 min-h-screen">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8 max-w-6xl mx-auto">
          <PageRouter />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}