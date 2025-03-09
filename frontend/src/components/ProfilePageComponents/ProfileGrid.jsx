import { AuthContext } from '@/context/AuthProvider';
import React, { useContext, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const ProfileGrid = () => {

    const { user, setUser, updateUser, getUser, loading, updateImage } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const inputRef = useRef();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const [image, setImage] = useState(null);
    const [file, setFile] = useState();

    const handleImageChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setImage(URL.createObjectURL(selectedFile));
        }
        const imageForm = new FormData();
        imageForm.append("profileImage", e.target.files[0]);
        await updateImage(imageForm);
        if (loading) {
            setImage(null);
        }
    }

    const handleUpdateData = async () => {
        const updateData = {
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            address: user.address
        };
        await updateUser(updateData);
        await getUser();
        setEditMode(false);
    }

    return (
        <div className='grid md:grid-cols-3 gap-4'>
            <div className='my-auto'>
                <div className='size-fit relative my-auto mx-auto'>
                    <Avatar className='size-48'>
                        <AvatarImage src={image ? image : user?.profileImage} />
                        <AvatarFallback><Loader2 className="animate-spin size-20" /></AvatarFallback>
                    </Avatar>
                    <FontAwesomeIcon size='xl' onClick={() => inputRef.current.click()} icon={faPenToSquare} className='absolute bottom-0 right-0' />
                </div>
                <Input type='file' ref={inputRef} onChange={handleImageChange} className='hidden' />
            </div>
            <div className='space-y-2 md:col-span-2'>
                {(user?.username || editMode) && <Input value={user?.username} name="username" onChange={handleChange} disabled={!editMode} />}
                {(user?.phone || editMode) && <Input value={user?.phone} name="phone" onChange={handleChange} disabled={!editMode} />}
                {(user?.email || editMode) && <Input value={user?.email} name="email" onChange={handleChange} disabled={!editMode} />}
                {(user?.address || editMode) && <Textarea value={user?.address} className='resize-none' name="address" onChange={handleChange} disabled={!editMode} />}
                {
                    !editMode ? (
                        <Button onClick={() => setEditMode(true)}>
                            Edit Details<FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                    ) : (
                        <div className='space-x-2'>
                            <Button onClick={handleUpdateData} disabled={loading}>
                                Save
                            </Button>
                            <Button variant='destructive' onClick={() => setEditMode(false)} disabled={loading}>
                                Cancle
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileGrid
