import React, { useState, useEffect } from 'react';
import {
    Card,
    Title,
    Group,
    Input,
    ActionIcon,
    ScrollArea
} from '@mantine/core';
import { IconPencil, IconChecks, IconPinFilled, IconCheckupList, IconTrash } from '@tabler/icons-react';
import axios from 'axios';

type Props = {};

type TodoItem = {
    id: number;
    title: string;
    description?: string | null;
    completed: {
        is_completed: boolean;
        completed_at: string | null;
        message: string | null;
    };

};

function ToDo({ }: Props) {
    const [currentDate] = useState(new Date());
    const [tasks, setTasks] = useState<TodoItem[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const token = localStorage.getItem('token');

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && newTask.trim() !== '') {
            try {
                const response = await axios.post(
                    'https://studyzone.examplegym.online/tasks',
                    {
                        title: newTask,
                        description: null,
                        completed: {
                            is_completed: false,
                            completed_at: null,
                            message: null,
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log('is_completed:', response.data.completed.is_completed);

                setTasks((prevTasks) => [...prevTasks, response.data]);

                setNewTask('');
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };
    const handleToggleCompletion = async (taskId: number) => {
        try {
            const updatedTasks = tasks.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          is_completed: true,
                      }
                    : task
            );
    
            setTasks(updatedTasks);
    
            const taskToUpdate = updatedTasks.find((task) => task.id === taskId);
    
            if (taskToUpdate) {
                await axios.put(
                    `https://studyzone.examplegym.online/tasks/${taskId}`,
                    { task: taskToUpdate },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
    
                fetchData();
            }
        } catch (error) {
            console.error('Error setting task completion to true:', error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('https://studyzone.examplegym.online/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [token]);
            
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://studyzone.examplegym.online/tasks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchData();
    }, [token]);
    const handleDeleteTask = async (taskId: number) => {
        try {
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);

            await axios.delete(`https://studyzone.examplegym.online/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    return (
        <>
            <Card
                shadow="xl"
                radius="xl"
                ml="30%"
                mt={55}
                w="45vw"
                padding="lg"
                withBorder
            >
                <Group position='center'>
                    <Title fz="1.9vw" order={2} italic>To do list</Title>
                </Group>

                <Group position='center'>
                    <Title fz="21w" c="grey" order={2}>Que debería hacer?</Title>
                </Group>

                <Group position='center'>
                    <Title fz="1vw" order={2}>Hoy {currentDate.toLocaleDateString()}</Title>
                </Group>

                <Group mt={15}>
                    <Input
                        icon={<IconPencil />}
                        w="100%"
                        radius="xl"
                        placeholder="Añade tu tarea"
                        value={newTask}
                        onChange={(event) => setNewTask(event.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Group>
            </Card>

            <ScrollArea h={495}>
                {tasks.map((task) => (
                    <Card key={task.id} ml="30%" w="45vw" mt={15} shadow="xl" padding="sm" radius="lg" withBorder>
                        <Group position='apart'>
                            <ActionIcon ml={2} >
                                {task.completed.is_completed ? <IconChecks color='green' /> : <IconPinFilled />}
                            </ActionIcon>

                            <Title
                                fz="1.4vw"
                                order={2}
                                style={{
                                    textDecoration: task.completed.is_completed ? "line-through" : "none",
                                    color: task.completed.is_completed ? "green" : "inherit",
                                }}
                            >
                                {task.title}
                            </Title>

                            <Group>
                                <ActionIcon onClick={() => handleToggleCompletion(task.id)}>
                                    <IconCheckupList size="1.6rem" />
                                </ActionIcon>

                                <ActionIcon
                                    onClick={() => task.completed.is_completed && handleDeleteTask(task.id)}
                                    disabled={!task.completed.is_completed}
                                >
                                    <IconTrash size="1.6rem" />
                                </ActionIcon>
                            </Group>
                        </Group>
                    </Card>
                ))}
            </ScrollArea>

        </>
    );
}

export default ToDo;
