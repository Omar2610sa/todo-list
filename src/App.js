import './App.css';
import TodoList from './components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  typography: {
    fontFamily: [
      "Alexandria",
    ]
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>

      <div className="App" style={{
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#191b1f',
        direction: "rtl"
      }}>

        <TodoList />


      </div>
    </ThemeProvider>

  );
}

export default App;
