import { Card, Image, Grid, Title } from '@mantine/core'
import {
  Revenues,
  Services
} from '../components/_dashboard'
import {
  IconUsersGroup,
  IconUsers,
  IconHomeShield
} from '@tabler/icons-react';
import StatusCards from '../components/StatusCards'
import { UsersTable } from '../components/usersTable';
import tableData from '../assets/data/mockUsersTable.json'
import { Link } from 'react-router-dom';

function Dashboard() {


  return (
    <>
      <Title order={3} mx={5} italic fw={700} my={10}>
        Dashboard
      </Title>
      <Grid>
        <Grid.Col span={4}>
          <Link to="/login">
            <Card
              withBorder
              style={{
                transition: 'background-color 0.3s',
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

        <Link to="/Notes">
            <Card
              withBorder
              style={{
                transition: 'background-color 0.3s',
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

        <Link to="/Materials">
            <Card
              withBorder
              style={{
                transition: 'background-color 0.3s',
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
        <Grid.Col sm={4} xs={6} mt={20}>
          {/* <StudentPerformance
            data={studentPerformance}
          /> */}
        </Grid.Col>
        <Grid.Col sm={8} xs={6} mt={20}>
          <Card withBorder radius="lg">
            <Title order={3} fw={700} italic mb={10}>
              Horario
            </Title>
            {/* <CalendarModule /> */}
          </Card>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default Dashboard
