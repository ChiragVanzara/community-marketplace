import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import { faArrowLeft, faArrowRight, faArrowRightToBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { AuthContext } from '@/context/AuthProvider'
import axios from 'axios';

const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

console.log(upload_preset, cloud_name)

const SignUpPage = () => {

  const { signUp, error, setError, loading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    isSeller: "",
    profileImage: ''
  })
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      setImage(response.data.secure_url);
    } catch (error) {
      console.error("Image upload failed", error);
      setError("Image upload failed");
    }
    setIsUploading(false);
  };

  const handleOnChange = (e) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const isValidForm = (formData) => {
    const requiredFields = ['username', 'address', 'email', 'fullName', 'phone', 'isSeller', 'password'];
    return requiredFields.some(field => !formData[field] || formData[field] === '');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidForm(formData)) {
      setError("Required field is missing.");
    }
  
    formData.isSeller = formData.isSeller === "seller" ? true : false;
    formData.profileImage = image;
    signUp(formData);
  }

  // Screen Swipe Handling
  const [isBasicInfoActive, setIsBasicInfoActive] = useState(true);

  const showContactDetailForm = (e) => {
    e.preventDefault();
    setIsBasicInfoActive(false);
  };

  const showBasicDetailForm = (e) => {
    e.preventDefault();
    setIsBasicInfoActive(true);
  };

  return (
    <div className='h-screen'>
      <div className='flex justify-center items-center h-full'>
        <Card className='p-5 md:w-1/3 md:m-0 m-5'>
          {error && (
            <Alert className="border text-red-500 border-red-500">
              <AlertCircle className='h-4 w-4'></AlertCircle>
              <AlertTitle>Alert</AlertTitle>
              <AlertDescription className="text-red-500">{error}</AlertDescription>
            </Alert>
          )}
          <CardHeader>
            <CardTitle className='text-3xl text-center mb-3'>Sign Up</CardTitle>
            <CardDescription className='text-center'>Create Your new Account</CardDescription>
          </CardHeader>

          <CardContent>
            <form className='w-full form-container'>

              <div className={`w-full overflow-hidden relative`}>
                <div className={`basic-info h-fit w-full transition-transform duration-300 ${isBasicInfoActive ? 'translate-x-0' : '-translate-x-full'
                  }`} id='basic-info'>
                  <div className='mb-5 flex justify-center items-center'>
                    <Avatar className='size-20'>
                      <AvatarImage src={image}></AvatarImage>
                      <AvatarFallback><FontAwesomeIcon icon={faCircleUser} size='2xl' /></AvatarFallback>
                      {isUploading && <span>Uploading...</span>}
                    </Avatar>
                  </div>
                  <div className='mb-5'>
                    <Label htmlFor='picture'>Choose Profile Image</Label>
                    <Input id="picture" type="file" onChange={handleImageUpload} disabled={loading} />
                  </div>
                  <div className='mb-5'>
                    <Input placeholder='User Name' disabled={loading} name='username' type='text' onChange={handleOnChange} />
                  </div>
                  <div className='mb-5'>
                    <Input placeholder='Full Name' disabled={loading} name='fullName' type='text' onChange={handleOnChange} />
                  </div>

                  <div className='flex justify-center'>
                    <Button variant='outline' onClick={showContactDetailForm}>Almost There<FontAwesomeIcon icon={faArrowRight} /></Button>
                  </div>
                </div>

                <div className={`contact-info h-fit w-full absolute top-0 left-0 transition-transform duration-300 ${isBasicInfoActive ? 'translate-x-full' : 'translate-x-0'
                  }`} id='contact-info'>

                  <div className='mb-5'>
                    <Input placeholder='Email' disabled={loading} name='email' type='email' onChange={handleOnChange} />
                  </div>
                  <div className='mb-5'>
                    <Input placeholder='Phone No' disabled={loading} name='phone' type='text' onChange={handleOnChange} />
                  </div>
                  <div className='mb-5'>
                    <Input placeholder='Password' disabled={loading} name='password' type='password' onChange={handleOnChange} />
                  </div>
                  <div className='mb-5'>
                    <Textarea placeholder='Your address...' disabled={loading} name='address' onChange={handleOnChange} />
                  </div>
                  <div className='mb-5'>
                    <RadioGroup name='isSeller' onChange={handleOnChange}>
                      <div className='flex justify-around'>
                        <div className='flex items-center space-x-2'>
                          <Label htmlFor="seller">Seller</Label>
                          <RadioGroupItem value='seller' disabled={loading} id="seller" className='border-2 dark:border-white border-black' />
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Label htmlFor="buyer">Buyer</Label>
                          <RadioGroupItem value='buyer' disabled={loading} id="buyer" className='border-2 dark:border-white border-black' />
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className='flex justify-around items-center'>
                    <Button variant='outline' onClick={showBasicDetailForm} disabled={loading}><FontAwesomeIcon icon={faArrowLeft} />Go Back</Button>
                    <Button onClick={handleSubmit} disabled={loading}><FontAwesomeIcon icon={faArrowRightToBracket} />Sign Up</Button>
                  </div>
                </div>
              </div>
            </form>
            <Separator className='my-4' />
            <div className='text-center mb-2'>Sign up with</div>
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
              Already Have an Accont ?
              <Button variant='link'><Link to='/sign-in'>SignIn here.</Link></Button>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default SignUpPage