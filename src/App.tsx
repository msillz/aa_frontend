import './css/App.css'
import DataExplorer from './pages/DataExplorer';
import '@mantine/core/styles.css';
import { HeaderSimple } from './components/mantine/HeaderSimple'
import { MantineProvider } from '@mantine/core';


function App() {

  return (
    <>
    <MantineProvider defaultColorScheme="dark">
      <HeaderSimple></HeaderSimple>
      <DataExplorer></DataExplorer>
    </MantineProvider>
    </>
  )
}

export default App


