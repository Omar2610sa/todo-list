import './App.css';
import TodoList from './components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { TodosContext } from './contexts/todosContext';


const intialTodos = [
  {
    id: uuidv4(),
    title: 'المهمه الاولى',
    body: 'تفاصيل المهمه الاولى',
    isChecked: false
  },
  {
    id: uuidv4(),
    title: 'المهمه الثانية',
    body: 'تفاصيل المهمه الثانية',
    isChecked: false
  },
  {
    id: uuidv4(),
    title: 'المهمه الثالثه',
    body: 'تفاصيل المهمه الثالثه',
    isChecked: false
  },
]


const theme = createTheme({
  typography: {
    fontFamily: [
      "Alexandria",
    ]
  },
  palette:{
    primary:{
      main: '#5c6bc0'
    }
  }
});

function App() {
  const [todos, setTodos] = useState(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"))
    return storageTodos ?? intialTodos
})


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
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>


      </div>
    </ThemeProvider>

  );
}

export default App;
