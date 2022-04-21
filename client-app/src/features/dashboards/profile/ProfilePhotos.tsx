import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Photo } from "../../../app/models/Profile";
import { useStore } from "../../../app/stores/Store";
import UploadWidget from "./Upload/UploadWidget";

export default observer(function ProfilePhotos() {
    const { profileStore } = useStore()
    const { profile, isCurrentUser, uploadPhoto, isUploading, isMainLoading, setMain, deletePhoto } = profileStore
    const [photoMode, setPhotoMode] = useState(false)
    const [target, setTarget] = useState("")

    function handleUpload(file: any) {
        uploadPhoto(file).then(() => setPhotoMode(false))
    }

    function handleSetMain(e: SyntheticEvent<HTMLButtonElement>, photo: Photo) {
        setTarget(e.currentTarget.name)
        setMain(photo)
    }

    function handleDelete(e: SyntheticEvent<HTMLButtonElement>, photo: Photo) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo)
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated="left"
                        content="Profile photos"
                        icon='image' />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={photoMode ? 'Cancel' : 'Add photo'}
                            onClick={() => setPhotoMode(!photoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {photoMode
                        ? (
                            <UploadWidget uploadPhoto={handleUpload} loading={isUploading} />
                        )
                        : (
                            <Card.Group itemsPerRow={5} >
                                {profile?.photos?.map(photo => (
                                    <Card key={photo.id}>
                                        <Image src={photo.url} />
                                        {isCurrentUser && (
                                            <Button.Group fluid widths={2}> 
                                                <Button
                                                    basic
                                                    color="green"
                                                    content="Main"
                                                    name={"unique" + photo.id}
                                                    disabled={photo.isMain}
                                                    onClick={event => handleSetMain(event, photo)}
                                                    loading={target === "unique" + photo.id && isMainLoading}
                                                />
                                                <Button
                                                    basic
                                                    color="red"
                                                    icon="trash"
                                                    name={photo.id}
                                                    loading={target === photo.id && isMainLoading}
                                                    onClick={event => handleDelete(event, photo)}
                                                    disabled={photo.isMain}
                                                />
                                            </Button.Group>
                                        )}
                                    </Card>
                                ))}
                            </Card.Group>
                        )}
                </Grid.Column>
            </Grid>


        </Tab.Pane>
    )
})