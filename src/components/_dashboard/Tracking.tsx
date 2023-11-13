import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ScrollArea, Card, Group, Grid, Loader, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
type Props = {}
type Activity = {
    id: number;
    title: string;
    calification: number;
    subject: {
        id: number;
        title: string;
        promedy: number;
    };
    user: {
        id: number;
        name: string;
        lastname: string;
        email: string;
    };
};

type Subject = {
    title: string;
};

function Tracking({ }: Props) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const token = localStorage.getItem('token');

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios
            .get<Activity[]>('https://studyzone.examplegym.online/activities', { headers })
            .then((response) => {
                setActivities(response.data);

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener actividades:', error);
                setLoading(false);
            });

        axios
            .get<Subject[]>('https://studyzone.examplegym.online/subjects', { headers })
            .then((response) => {
                setSubjects(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener materias:', error);
                setLoading(false);
            });
    }, [token]);

    const subjectAverages: Record<string, number> = {};
    activities.forEach((activity) => {
        const { calification, subject } = activity;
        const subjectTitle = subject.title;

        if (!subjectAverages[subjectTitle]) {
            subjectAverages[subjectTitle] = 0;
        }

        subjectAverages[subjectTitle] += calification;
    });

    return (
        <>
            <Card mt={-25} withBorder radius="lg" padding="lg" shadow="xl">

                <Title order={3} fw={700} mb={10} italic>
                    Tracking de notas
                </Title>
                {loading ? (
                    <>
                        <Group mt={100} mb={125} position='center'>

                            <Loader color="teal" size={150} variant="bars" />
                        </Group>
                    </>
                ) : (
                    <ScrollArea h="48vh">
                        {subjects.map((subject) => (
                            <Card key={subject.title} h={70} withBorder mb={10} radius="md">
                                <Grid mt={-15}>
                                    <Grid.Col span={4}>
                                        <img src="/nota-adhesiva.png" alt="Nota Adhesiva" width={50} height={50} />
                                    </Grid.Col>
                                    <Grid.Col span={8}>
                                        <Grid mt={5}>
                                            <Grid.Col span={6}>
                                                <Title ml={-50} ta="center" order={4} fw={600} mb={5}>
                                                    {subject.title}
                                                </Title>
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <Title
                                                    mt={-7}
                                                    ta="end"
                                                    order={4}
                                                    fw={700}
                                                    mb={5}
                                                    color={
                                                        subjectAverages[subject.title]
                                                            ? subjectAverages[subject.title] / activities.filter(
                                                                (activity) => activity.subject.title === subject.title
                                                            ).length < 10
                                                                ? "red"
                                                                : subjectAverages[subject.title] / activities.filter(
                                                                    (activity) => activity.subject.title === subject.title
                                                                ).length <= 17
                                                                    ? "orange"
                                                                    : "green"
                                                            : "#228BE6"
                                                    }
                                                >
                                                    {subjectAverages[subject.title]
                                                        ? subjectAverages[subject.title] / activities.filter(
                                                            (activity) => activity.subject.title === subject.title
                                                        ).length
                                                        : "Sin actividades"}
                                                </Title>


                                            </Grid.Col>
                                        </Grid>
                                    </Grid.Col>
                                </Grid>
                            </Card>
                        ))}
                    </ScrollArea>
                )}
                <Link to="/material" style={{ textDecoration: 'none' }}>
                    <Button radius="md" size="md" fullWidth color="teal">
                        Ver mas
                    </Button>
                </Link>
            </Card>
        </>
    );
}

export default Tracking;
