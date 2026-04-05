import './App.css';
import TodoList from './components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { TodosContext } from './contexts/todosContext';
import MySnackBar from './components/MySnackBar'
import { ToastContext } from './contexts/ToastContext';


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
  palette: {
    primary: {
      main: '#5c6bc0'
    }
  }
});

function App() {
  const [todos, setTodos] = useState(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"))
    return storageTodos ?? intialTodos
  })
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true)
    setMessage(message)
    setTimeout(() => {
      setOpen(false)
    }, 4000)
  }

  return (
    <ThemeProvider theme={theme}>

      <ToastContext.Provider value={{ showHideToast }}>
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

          <MySnackBar open={open} message={message} />

        </div>
      </ToastContext.Provider>

    </ThemeProvider>

  );
}

export default App;
