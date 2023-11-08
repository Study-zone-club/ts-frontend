import { Card, Image, Text, Badge, Group } from '@mantine/core';


type Props = {}

function Landing({ }: Props) {
    return (
        <>
            <Group mt={85} position="center">

                <Card padding="lg" radius="lg" shadow="xl" withBorder h="10%" w="20%">

                    <Card.Section  >

                        <Image
                            maw="100%"
                            mx="auto"
                            src="https://imagenes.expreso.ec/files/image_800_600/uploads/2023/01/04/63b5b377dc2bb.jpeg"
                            alt="Random image" />

                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text>
                            Briyith Portillo
                        </Text>
                        <Badge color="teal" size="lg">
                            developer
                        </Badge>
                    </Group>


                </Card>

                <Card padding="lg" radius="lg" shadow="xl" withBorder w="20%">

                    <Card.Section >
                        <Image
                            maw="100%"
                            mx="auto"
                            src="data:image/jpeg;base64,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"
                            alt="Random image" />

                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text>
                            Carlos Urdaneta
                        </Text>
                        <Badge color="teal" size="lg">
                            developer
                        </Badge>
                    </Group>


                </Card>

                <Card padding="lg" radius="lg" shadow="xl" withBorder w="20%">

                    <Card.Section >
                        <Image
                            maw="100%"
                            mx="auto"
                            src="https://laprensa-bucket.s3.us-west-2.amazonaws.com/wp-content/uploads/2016/04/01182010/ANGEL11.jpg"
                            alt="Random image" />


                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text>
                            Adreanyela Rincón
                        </Text>
                        <Badge color="teal" size="lg">
                            developer
                        </Badge>
                    </Group>


                </Card>

            </Group>

        </>
    )
}

export default Landing