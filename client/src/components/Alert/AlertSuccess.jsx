import Alert from '@mui/material/Alert';


const AlertSuccess = (props)=>{
    return (
        <>
            <Alert variant='filled'  severity="success" color='primary'>
                {props.text}
            </Alert>        
        </>
    )
}

export default AlertSuccess