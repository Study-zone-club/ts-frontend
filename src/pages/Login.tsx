import { Card, Title, Text, TextInput, PasswordInput, Button } from '@mantine/core'
import ConnectionAlert from '../components/ConnectionAlert'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setUser } from '../config/reducers/userSlice'
import { useHistory } from 'react-router-dom';

interface ILogin {
    email: string;
    password: string;
}

interface ILoginResponse {
    user: IUser;
    token: string;
    exp: string;
}

interface IUser {
    id: number;
    name: string;
    lastname: string;
    email: string;
    token: string | null;
    expiresAt: Date | string;
  }
function Login({ }: ILogin) {
    const remember = false
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [checkLastSession, setCheckLastSession] = useState<boolean>(false)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }, [])

    async function handleLogin(remember: boolean = false) {
        try {
            const { data } = await axios.post<ILoginResponse>(
                `https://studyzone.examplegym.online/auth/login`,
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            dispatch(setUser({
                id: data.user.id,
                name: data.user.name,
                lastname: data.user.lastname,
                email: email,
                token: data.token,
                expiresAt: data.exp,
            }))
            if (remember) {
                sessionStorage.setItem('lastSession', JSON.stringify({
                    name: data.user.name,
                    lastname: data.user.lastname,
                    token: data.token,
                    email: email,
                    password: password,
                    expires: data.exp,
                }))
            } else {
                sessionStorage.removeItem('lastSession')
            }
            history.push('/')
            setTimeout(() => {
                window.location.reload()
            }, 100)
            setErrorMessage('')
            return data
        } catch (error) {
            setErrorMessage('Correo o contraseña incorrectos')
        }
    }

    return (
        <>
            <div className='login'
                style={{
                    margin: -16,
                    background: 'url(/vidagymspa.webp)',
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    objectFit: 'cover',
                    backgroundPosition: 'center center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    aspectRatio: '1/1'
                }}
            >
                <Card
                    withBorder
                    shadow='md'
                    padding='xl'
                    style={{
                        minWidth: 400,
                        maxWidth: 500
                    }}
                >
                    <Title
                        align="center"
                        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, color: '#038f6c', fontWeight: 7800, fontSize: '45px' })}
                    >
                        STUDY-ZONE
                    </Title>
                    <TextInput
                        mt={40}
                        label='Correo'
                        placeholder='micorreo@gmail.com'
                        required
                        withAsterisk={false}
                        value={checkLastSession ? JSON.parse(sessionStorage.getItem('lastSession') || '{}').email : email}
                        onChange={
                            (e: any) => setEmail(e.currentTarget.value)
                        }
                    />
                    <PasswordInput
                        label='Contraseña'
                        placeholder='********'
                        required
                        withAsterisk={false}
                        value={checkLastSession ? JSON.parse(sessionStorage.getItem('lastSession') || '{}').password : password}
                        onChange={
                            (e: any) => setPassword(e.currentTarget.value)
                        }
                    />
                    <Button
                        mt={20}
                        w='100%'
                        color='teal'
                        onClick={
                            () => {
                                handleLogin(remember)
                            }
                        }
                    >
                        Entrar
                    </Button>
                    {
                        errorMessage !== '' && (
                            <Text c='red' mt={20} ta='center'>{errorMessage}</Text>
                        )
                    }
                    {
                        sessionStorage.getItem('lastSession') && (
                            <div onClick={
                                () => {
                                    {
                                        setCheckLastSession(true)
                                        setEmail(JSON.parse(sessionStorage.getItem('lastSession') || '{}').email)
                                        setPassword(JSON.parse(sessionStorage.getItem('lastSession') || '{}').password)
                                    }
                                }
                            }>
                            </div>
                        )
                    }
                </Card>
                <ConnectionAlert />
            </div>
        </>
    )
}

export default Login
