import  { useState, useEffect } from 'react';
import {
    Group,
    Button,
    Divider,
    Text,
    Card,
} from '@mantine/core';
import { IconReload, IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';

type Props = {}

function Smr({}: Props) {
    const [minutes, setMinutes] = useState(5);
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
        setMinutes(5); 
        setSeconds(0);
        setIsRunning(false);
    };
  return (
    <Group position='center'>
    <Card  w={650} radius="lg" shadow="xl" withBorder>
        <Group position="apart" mt="md" mb="xs">
        <Text h={370} ml={122} fz={150} weight={500}>
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
  )
}

export default Smr