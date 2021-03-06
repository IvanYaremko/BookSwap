import { Field, FieldProps, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Comment, Form, Header, Icon, Loader, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
// https://date-fns.org/ docs
import { formatDistanceToNow } from 'date-fns'
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Message } from "../../../app/models/Message";

interface Props {
    swapId: string;
}
/**
 * 
 */
export default observer(function SwapChat({ swapId }: Props) {
    const { messageStore } = useStore()

    useEffect(() => {
        if (swapId) {
            messageStore.createHubConnection(swapId);
        }
        return () => {
            messageStore.removeMessages();
        }
    }, [messageStore, swapId]);


    return (
        <>
            <Segment textAlign="center" attached="top" color="teal" style={{ border: "none" }}>
                <Header>Message with member</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {messageStore.messages.map((message: Message) => (
                        <Comment key={message.id}>
                            {message.image ? (
                                <Comment.Avatar src={message.image} />) : (
                                <Icon name="user" />
                            )}

                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${message.userName}`}>
                                    {message.displayName}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow(message.createdAt)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{message.text}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>

                <Formik
                    onSubmit={(values, { resetForm }) =>
                        messageStore.addMessage(values).then(() => resetForm())}
                    initialValues={{ text: '' }}
                    validationSchema={Yup.object({
                        text: Yup.string().required()
                    })}>

                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form className='ui form'>
                            
                            <Field name='text'>
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        <Loader active={isSubmitting} />
                                        <textarea
                                            placeholder='Enter your comment (Enter to submit, SHIFT + enter for new line)'
                                            rows={2}
                                            {...props.field}
                                            onKeyPress={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}

                </Formik>


            </Segment>
        </>
    )
})