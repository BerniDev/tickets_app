import MainPage from './pages/main.page';
import { TicketsListProvider } from './context/tickets-list.context';

function App():JSX.Element {

  return (
    <TicketsListProvider>
      <MainPage />
    </TicketsListProvider>
  );
}

export default App;