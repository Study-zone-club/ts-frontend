import { Card, Image, Grid, Title } from '@mantine/core'


import { Link } from 'react-router-dom';
import Tracking from '../components/_dashboard/Tracking';
import CalendarA from '../components/_dashboard/CalendarA';
function Dashboard() {


  return (
    <>
      <Title order={3} mx={5} italic fw={700} my={10}>
        Dashboard
      </Title>
      <Grid mt={15}>
        <Grid.Col span={4}>
          <Link to="/login">
            <Card
              radius="xl"
              withBorder
              style={{
                transition: 'background-color 0.3s',
                border: '2.5px solid #57CEB4',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5fff9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <Image
                src="/cronometro.png"
                maw={240}
                mx="auto"
                radius="md"
                alt="Norway"
              />
            </Card>

          </Link>
        </Grid.Col>
        <Grid.Col span={4}>

          <Link to="/notes">
            <Card

              radius="xl"
              withBorder
              style={{
                transition: 'background-color 0.3s',
                border: '2.5px solid #57CEB4',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5fff9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <Image
                src="/nota-adhesiva.png"
                maw={240}
                mx="auto"
                radius="md"
                alt="Norway"
              />
            </Card>
          </Link>

        </Grid.Col>
        <Grid.Col span={4}>

          <Link to="/Materials">
            <Card

              radius="xl"
              withBorder
              style={{
                transition: 'background-color 0.3s',
                border: '2.5px solid #57CEB4',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5fff9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <Image
                src="/portapapeles.png"
                maw={240}
                mx="auto"
                radius="md"
                alt="Norway"
              />
            </Card>
          </Link>
        </Grid.Col>
        <Grid.Col sm={8} xs={6} mt={20}>
<Tracking/>
        </Grid.Col>
        <Grid.Col sm={4} xs={6} mt={20}>

          <CalendarA />
        </Grid.Col>
      </Grid>
    </>
  )
}

export default Dashboard
