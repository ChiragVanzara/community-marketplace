import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { AuthContext } from '@/context/AuthProvider'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AlertCircle } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

const SignInPage = () => {

  const { signIn, loading, error, setError } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("UserName Required.");
      return;
    }
    if (!password) {
      setError("Password Required.");
      return;
    }
    signIn({ username, password });
  }

  return (
    <div className='h-screen'>
      <div className='flex justify-center items-center h-full'>
        <Card className='p-5 md:w-1/4'>
          {!!error && (
            <Alert variant={'destructive'} className='border text-red-500 border-red-500'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription><span className='text-red-500'>{error}</span></AlertDescription>
            </Alert>
          )}
          <CardHeader>
            <CardTitle className='text-3xl text-center mb-3'>Sign In</CardTitle>
            <CardDescription className='text-center'>Sign in using your UserName and Password.</CardDescription>
          </CardHeader>

          <CardContent>
            <form className='w-full'>
              <div className='mb-5'>
                <Input
                  placeholder='UserName'
                  type='text'
                  name='username'
                  disabled={loading}
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(null) }}
                  required
                />
              </div>
              <div className='mb-5'>
                <Input
                  placeholder='Password'
                  type='password'
                  name="password"
                  disabled={loading}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null) }}
                  required
                />
              </div>
              <div>
                <Button className='w-full'
                  onClick={handleSubmit}
                  disabled={loading}
                >Sign In</Button>
              </div>
            </form>
            <Separator className='my-4' />
            <div className='text-center mb-2'>Sign in with</div>
            <div className='flex justify-around items-center w-full'>
              <div>
                <Button variant='outline'><FontAwesomeIcon icon={faGoogle} />Google</Button>
              </div>
              <div>
                <Button variant='outline'><FontAwesomeIcon icon={faGithub} />GitHub</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <CardDescription>
              Don't Have An Accont ?
              <Button variant='link'><Link to='/sign-up'>Create One.</Link></Button>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default SignInPage
