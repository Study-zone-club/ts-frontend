import { useState, useEffect } from 'react';
import {
    Group,
    Button,
    Divider,
    Text,
    Card,
    Tabs
} from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { IconReload, IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import Smr from '../components/Smr';
import Lgr from '../components/Lgr';

type Props = {}

function Pomodoro({ }: Props) {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning) {
            timer = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    setIsRunning(false);
                }
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [minutes, seconds, isRunning]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setMinutes(25); 
        setSeconds(0);
        setIsRunning(false);
    };
    return (
        <>

            <Card mt={15} h="95%" withBorder radius="lg" shadow="xl" style={{ backgroundColor: "#FCFCFC" }}>
                <Tabs mt={15} color="green" variant="outline" style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }} radius="lg" defaultValue="pomodoro">
                    <Tabs.List grow position="apart">
                        <Tabs.Tab value="pomodoro" fz="25px" icon={<IconPhoto size="1.8rem" />}>pomodoro</Tabs.Tab>
                        <Tabs.Tab value="Descanso corto" fz="25px" icon={<IconMessageCircle size="1.8rem" />}>Descanso corto</Tabs.Tab>
                        <Tabs.Tab value="Descanso largo" fz="25px" icon={<IconSettings size="1.8rem" />}>Descanso largo</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="pomodoro" pt="xs">

                        <Group position='center'>
                            <Card mt={100} w={650} radius="lg" shadow="xl" withBorder>
                                <Group position="apart" mt="md" mb="xs">
                                    <Text h={500} fz={250} weight={500}>
                                        {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
                                    </Text>
                                </Group>
                                <Divider my="sm" variant="dashed" />
                                <Group position="apart" mt="md">
                                    <Button
                                        fz="20px"
                                        variant="filled"
                                        color="blue"
                                        radius="md"
                                        leftIcon={<IconPlayerPlay />}
                                        onClick={startTimer}
                                        disabled={isRunning}
                                    >
                                        Iniciar
                                    </Button>
                                    <Button
                                        fz="20px"
                                        variant="filled"
                                        color="red"
                                        radius="md"
                                        leftIcon={<IconPlayerPause />}
                                        onClick={stopTimer}
                                        disabled={!isRunning}
                                    >
                                        Detener
                                    </Button>
                                    <Button
                                        fz="20px"
                                        variant="filled"
                                        radius="md"
                                        color="green"
                                        leftIcon={<IconReload />}
                                        onClick={resetTimer}
                                        disabled={isRunning}
                                    >
                                        Reiniciar
                                    </Button>
                                </Group>
                            </Card>
                        </Group>
                    </Tabs.Panel>

                    <Tabs.Panel value="Descanso corto" pt="xs">
                    <Smr/>
                    </Tabs.Panel>

                    <Tabs.Panel value="Descanso largo" pt="xs">
                       <Lgr/>
                    </Tabs.Panel>
                </Tabs>
            </Card>
        </>
    )
}

export default Pomodoro