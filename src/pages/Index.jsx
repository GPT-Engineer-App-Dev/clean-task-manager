import React, { useState, useEffect } from "react";
import { Box, Button, Container, Heading, Input, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const toast = useToast();

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://backengine-zq2g.fly.dev/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await fetch("https://backengine-zq2g.fly.dev/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTodo, content: "" }),
      });
      if (response.ok) {
        fetchTodos();
        setNewTodo("");
      } else {
        throw new Error("Failed to create todo");
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast({
        title: "Error",
        description: "Failed to add the todo item.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4} align="stretch">
        <Heading>Todo App</Heading>
        <Stack direction="row">
          <Input placeholder="Add new todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addTodo} disabled={!newTodo}>
            Add
          </Button>
        </Stack>
        <Box>
          {todos.length ? (
            todos.map((todo, index) => (
              <Box key={index} p={3} shadow="md" borderWidth="1px" my={2}>
                <Text>{todo.title}</Text>
              </Box>
            ))
          ) : (
            <Text>No todos yet.</Text>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
