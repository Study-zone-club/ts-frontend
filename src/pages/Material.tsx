import { useEffect, useState } from 'react';
import {
    TextInput,
    rem,
    Title,
    Group,
    Accordion,
    Divider,
    Text,
    ActionIcon,
    Card,
    ScrollArea
} from '@mantine/core';
import { IconSearch, IconTrashX } from '@tabler/icons-react';
import NewMateria from '../components/NewMateria';
import Newmaterian from '../components/Newmaterian';
import axios from 'axios';

type Props = {}
interface Subject {
    title: string;
}
interface Activity {
    id: number;
    title: string;
    calification: number;
    subject: {
        id: number;
        title: string;
        area: string;
        professor: string;
        lapse: number;
        power: any[]; // Assuming power is an array
        promedy: number;
    };
    user: {
        id: number;
        name: string;
        lastname: string;
        email: string;
    };
}
function Material({ }: Props) {
    const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const token = localStorage.getItem('token');
    const [subjectAverages, setSubjectAverages] = useState<{ [key: string]: number }>({});


    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(
                    'https://studyzone.examplegym.online/subjects',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        const fetchActivities = async () => {
            try {
                const response = await axios.get(
                    'https://studyzone.examplegym.online/activities',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchSubjects();
        fetchActivities();
    }, [token]);
    useEffect(() => {
        // Calcula el promedio para cada materia
        const calculateAverages = () => {
            const averages: { [key: string]: number } = {};

            subjects.forEach((subject) => {
                const subjectActivities = activities.filter(
                    (activity) => activity.subject.title === subject.title
                );

                if (subjectActivities.length > 0) {
                    const totalCalifications = subjectActivities.reduce(
                        (sum, activity) => sum + activity.calification,
                        0
                    );
                    const average = totalCalifications / subjectActivities.length;

                    averages[subject.title] = average;
                }
            });

            setSubjectAverages(averages);
        };

        calculateAverages();
    }, [subjects, activities]);

    return (
        <>
            <Title mt={15} order={3}>Tracking de notas</Title>
            <Card mt={15} withBorder padding="lg" radius="lg" shadow="xl">
                <Group position="apart">
                    <TextInput
                        placeholder="Buscar...."
                        rightSection={icon}
                        mt={-5}
                        w={510}
                        radius="lg"
                        size="lg"

                    />
                    <Group>
                        <NewMateria />
                        <Newmaterian />
                    </Group>
                </Group>

            </Card>

            <Card mt={15} withBorder radius="lg" shadow="xl">
                <ScrollArea h="65vh">
                    <Accordion radius="lg" variant="contained" mt={15}>
                        {subjects.map((subject, index) => (
                            <Accordion.Item key={index} value={subject.title}>
                                <Accordion.Control>
                                    <Group position="apart">
                                        <Title mt={15} order={3}>
                                            {subject.title}
                                        </Title>
                                    </Group>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    {activities
                                        .filter((activity) => activity.subject.title === subject.title)
                                        .map((activity) => (
                                            <div key={activity.id}>
                                                <Group position="apart">
                                                    <Text fw={700}>{activity.title}</Text>
                                                    <Group>
                                                        <Text
                                                            style={{
                                                                color: activity.calification > 18 ? 'green' : (activity.calification >= 10 && activity.calification <= 17) ? 'orange' : 'red',
                                                                fontWeight: 700
                                                            }}
                                                        >
                                                            {activity.calification}
                                                        </Text>

                                                        <ActionIcon
                                                            mt={5}
                                                            color="red"
                                                            variant="filled"
                                                        >
                                                            <IconTrashX size="1.125rem" />
                                                        </ActionIcon>
                                                    </Group>
                                                </Group>
                                                <Divider size="md" variant="dashed" my="sm" />
                                            </div>
                                        ))}
                                    <Group position="center">
                                        <Title order={3} c="black">
                                            Promedio:{" "}
                                            <Title
                                                style={{
                                                    fontWeight: 700,
                                                    color:
                                                        subjectAverages[subject.title] !== undefined
                                                            ? subjectAverages[subject.title] > 18
                                                                ? 'green'
                                                                : subjectAverages[subject.title] >= 10 &&
                                                                    subjectAverages[subject.title] <= 17
                                                                    ? 'orange'
                                                                    : 'red'
                                                            : '#228BE6', 
                                                }}
                                            >
                                                {subjectAverages[subject.title]?.toFixed(2) || "Sin actividades"}
                                            </Title>
                                        </Title>
                                    </Group>
                                </Accordion.Panel>

                            </Accordion.Item>
                        ))}
                    </Accordion>
                </ScrollArea>
            </Card>
        </>
    )
}

export default Material