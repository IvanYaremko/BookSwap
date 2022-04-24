import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import Dropzone from "./Dropzone";

interface Props {
    loading: boolean
    uploadPhoto: (file: any) => void
}
/**
 * 
 */
export default observer(function UploadWidget({loading, uploadPhoto}: Props) {
    const [files, setFiles] = useState<any>([])

    function upload() {
        uploadPhoto(files[0])
    }

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header color="teal" content="Add photo" />
                <Dropzone setFiles={setFiles}/>
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header color="teal" content="Preview & Uplaod" />
                {files && files.length > 0 && (
                    <>
                        <Image src={files[0].preview} />
                        <Button loading={loading} onClick={upload} positive icon='check' />
                        <Button disabled={loading} onClick={() => setFiles([]) } icon='close'/>
                    </>
                )}
            </Grid.Column>
          
        </Grid>
    )
})