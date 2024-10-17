import { Box, Button, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoList {
  title: string;
  id: number;
  isCompleted: boolean;
}

function App() {
  const [toggle, setToggle] = useState(true);
  const [todo, setTodo] = useState<TodoList[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleTodo = () => {
    if (!inputValue) {
      return;
    }

    setTodo([
      ...todo,
      {
        id: new Date().valueOf(),
        isCompleted: false,
        title: inputValue,
      },
    ]);

    setInputValue("");
  };

  const handleDelete = (id: number) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const handleCrossTodo = (id: string) => {
    setTodo(
      todo.map((item) =>
        item.id === +id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        pt: "50px",
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#fff",
          boxShadow: 3,
          borderRadius: 2,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
            To-do List
          </Typography>
          <Switch
            {...label}
            checked={toggle}
            color="primary"
            onChange={handleToggle}
          />
        </Box>
        <Box
          component="form"
          sx={{
            display: toggle ? "flex" : "none",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            id="standard-basic"
            label="Add Todo"
            variant="standard"
            value={inputValue}
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(event.target.value);
            }}
          />
          <Button variant="contained" color="primary" onClick={handleTodo}>
            Add
          </Button>
        </Box>
        <Box component="div">
          {todo.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#1976D2",
                color: "white",
                padding: 1,
                borderRadius: 1,
                mb: 1,
                mt: 1,
              }}
            >
              <Box
                onClick={() => handleCrossTodo(item.id.toString())}
                sx={{
                  textDecoration: item.isCompleted ? "line-through" : "none",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <Typography sx={{ flexGrow: 1 }}>{item.title}</Typography>
              </Box>
              <DeleteIcon
                sx={{ cursor: "pointer", color: "white" }}
                onClick={() => handleDelete(item.id)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
