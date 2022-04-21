// DOCS https://react-dropzone.js.org/
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'

interface Props {
    setFiles: (files: any) => void
}

export default function Dropzone({ setFiles }: Props) {
    const styles = {
        border: "dashed 3px #000000",
        borderColor: '#000000',
        borderRadius: '5px',
        paddingTop: '30px',
        textAlign: 'center' as 'center',
        height: 200
    }

    const activeStyle = {
        borderColor: '#49a621'
    }

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? {...styles, ...activeStyle} : styles}>
            <input {...getInputProps()} />
            <Icon name='upload' size='huge' />
            <Header as="h3" content='Drag and drop image' />
        </div>
    )
} 